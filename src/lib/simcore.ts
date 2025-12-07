export interface AssetClassNumbers {
	cash: number;
	stocks: number;
	crypto: number;
	gold: number;
	bonds: number;
	realEstate: number;
}


export interface GlobalAssumptions {
	/** Total savings at start of simulation, including those used for deposit, plus investments */
	openingSavings: number;

	/** Price of property to be purchased */
	propertyPrice: number;

	/**
	 * Cash flow available per month after general expenses (groceries, utilities, etc)
	 * Will be divided between mortgage payments and savings to simulate how much can be saved/invested.
	 */
	freeCashFlow: number;

	/** If not purchasing a property, how much rent would be paid per month? */
	equivalentRent: number;

	/** Expected annual percentage return on savings */
	cashReturn: number;

	/** Expected returns for different asset classes over the lifetime of the mortgage in percentage per year */
	expectedReturns: AssetClassNumbers;

	/** Expected annual percentage inflation rate */
	inflationRate: number;

	/** Expected annual percentage cost of maintenance for the property */
	houseMaintenancePercentage: number;

	/** Number of years to simulate */
	simulationYears: number;
}

export type AssetClass = keyof AssetClassNumbers;

export interface InvestmentStrategy {
	/** Target allocations for different asset classes as a percentage of the total portfolio */
	allocationWeights: AssetClassNumbers;

	/** Minimum cash buffer to hold, eg, emergency fund. Will put 100% of portfolio in cash if below this amount. */
	maxCash: number;

	/** Maximum cash buffer to hold. Will reallocate cash to other asset classes in their chosen proportions if above this amount */
	minCash: number;

	/** How often to rebalance the portfolio to the target allocations in months */
	rebalanceFrequency: number;
}

export type InvestmentPortfolio = AssetClassNumbers;

export const EMPTY_PORTFOLIO: InvestmentPortfolio = {
	cash: 0,
	stocks: 0,
	crypto: 0,
	gold: 0,
	bonds: 0,
	realEstate: 0,
}

export function getPortfolioTotal(portfolio: InvestmentPortfolio): number {
	return Object.values(portfolio).reduce((acc, value) => acc + value, 0);
}

export interface MortgageParams {
	/** Interest rate for the mortgage */
	interestRate: number;

	/** Deposit amount for the mortgage */
	deposit: number;

	/** Term of the mortgage in years */
	term: number;
}

export function computeMortgageRepayment(principal: number, params: MortgageParams): number {
	let r = params.interestRate / 12;
  let n = params.term * 12;

	return principal * (r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
}

export interface HomeStats {
	/** How much is the property worth? */
	worth: number;

	/** Outstanding loan principal */
	principal: number;
}

export interface SimulationResultRow {
	home: HomeStats;

	investments: InvestmentPortfolio;
}

function allocateValueByWeights(value: number, weights: AssetClassNumbers): AssetClassNumbers {
	let next : AssetClassNumbers = { ...EMPTY_PORTFOLIO };
	let totalWeight = getPortfolioTotal(weights);
	for(let assetClass of Object.keys(weights) as AssetClass[]) {
		let weight = weights[assetClass];
		next[assetClass] = value * (weight / totalWeight);
	}
	return next;
}

export function stepPortfolio(args: {
	portfolio: InvestmentPortfolio,
	strategy: InvestmentStrategy,
	expectedReturns: AssetClassNumbers,
	extraDeposit: number,
	rebalance: boolean,
}): InvestmentPortfolio {

	let next : InvestmentPortfolio = { ...args.portfolio };

	// Simululate rebalance
	if(args.rebalance) {
		let total = getPortfolioTotal(args.portfolio)
		next = {
			...EMPTY_PORTFOLIO,
			cash: Math.min(args.strategy.minCash, total),
		};

    let remaining = total - next.cash;

		let totalWeight = getPortfolioTotal(args.strategy.allocationWeights);

		// Allocate remaining to other asset classes in the strategy's proportions
		let extraCash = remaining * (args.strategy.allocationWeights.cash / totalWeight);
		if(next.cash + extraCash > args.strategy.maxCash) {
			next.cash = args.strategy.maxCash;
		} else {
			next.cash += extraCash;
		}

		remaining = total - next.cash;
		let split = allocateValueByWeights(remaining, {
			...args.strategy.allocationWeights,
			cash: 0,
		});
		for(let assetClass of Object.keys(split) as AssetClass[]) {
			next[assetClass] += split[assetClass];
		}
	}

	// Simulate additional deposits
	let additionWeights = { ...args.strategy.allocationWeights };
	if(next.cash >= args.strategy.maxCash) {
		additionWeights.cash = 0;
	}
	let additions = allocateValueByWeights(args.extraDeposit, additionWeights);
	for(let assetClass of Object.keys(additions) as AssetClass[]) {
		next[assetClass] += additions[assetClass];
	}

	// Tick interest on all asset classes
	for(let assetClass of Object.keys(next) as AssetClass[]) {
		next[assetClass] *= (1 + args.expectedReturns[assetClass] / 12);
	}

	return next;
}


export function simulateMortgageFree(ga: GlobalAssumptions, strategy: InvestmentStrategy): SimulationResultRow[] {
	let lastPortfolio: InvestmentPortfolio = {
		...EMPTY_PORTFOLIO,
		cash: ga.openingSavings,
	};

	let results: SimulationResultRow[] = [];
	results.push({
		home: { principal: 0, worth: 0 },
		investments: lastPortfolio,
	});

	for(let step = 1; step < ga.simulationYears*12; ++step) {
		let nextPortfolio = stepPortfolio({
			portfolio: lastPortfolio,
			strategy: strategy,
			expectedReturns: ga.expectedReturns,
			extraDeposit: ga.freeCashFlow - ga.equivalentRent,
			rebalance: step % strategy.rebalanceFrequency === 0,
		});

		results.push({
			home: { principal: 0, worth: 0 },
			investments: nextPortfolio,
		})

		lastPortfolio = nextPortfolio;
	}

	return results;
}

export function simulateMortgage(ga: GlobalAssumptions, strategy: InvestmentStrategy, mortgage: MortgageParams): SimulationResultRow[] {
	let results: SimulationResultRow[] = [];

	let lastPortfolio: InvestmentPortfolio = {
		...EMPTY_PORTFOLIO,
		cash: ga.openingSavings - mortgage.deposit,
	};

	let lastHome: HomeStats = {
		principal: ga.propertyPrice - mortgage.deposit,
		worth: ga.propertyPrice,
	}

	results.push({
		home: lastHome,
		investments: lastPortfolio,
	})

	let mortgageRepayment = computeMortgageRepayment(lastHome.principal, mortgage);

	for(let step = 0; step < ga.simulationYears*12; ++step) {
		let nextHome = {
			principal: lastHome.principal * (1 + mortgage.interestRate / 12),
			worth: lastHome.worth * (1 + ga.expectedReturns.realEstate / 12),
		}

		let repayment = Math.min(nextHome.principal, mortgageRepayment);
		nextHome.principal -= repayment;

		let savingsFlow = ga.freeCashFlow - repayment - nextHome.worth * ga.houseMaintenancePercentage / 12;

		let nextPortfolio = stepPortfolio({
			portfolio: lastPortfolio,
			strategy: strategy,
			expectedReturns: ga.expectedReturns,
			extraDeposit: savingsFlow,
			rebalance: step % strategy.rebalanceFrequency === 0,
		});


		results.push({
			home: nextHome,
			investments: nextPortfolio,
		})

		lastPortfolio = nextPortfolio;
		lastHome = nextHome;
	}

	return results;
}