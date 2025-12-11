import { YEAR_CURVES, type YearCurveKind } from "./year-curves";

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

	/** Expected returns for different asset classes over the lifetime of the mortgage in percentage per year */
	expectedReturns: AssetClassNumbers;

	/** Expected annual percentage inflation rate */
	inflationRate: number;

	/** Expected annual percentage cost of maintenance for the property */
	houseMaintenancePercentage: number;

	/** Number of years to simulate */
	simulationYears: number;

	/** Age at which we retire */
	retirementAge: number;

	/** Age at which we start the simulation */
	startAge: number;

	/** Year at which we start the simulation */
	startYear: number;

	/** Assumed income per annum at start of simulation */
	income1Pa: number;
	income2Pa: number;

	/** Assumed expenses per annum at start of simulation - excluding housing */
	expensesPa: number;

	/** If not purchasing a property, how much rent would be paid per month? */
	equivalentRent: number;

	/** Type of year curve to use to adjust income/expenses over time */
	yearCurve: YearCurveKind;
}

export type AssetClass = keyof AssetClassNumbers;

export interface InvestmentStrategy {
	/** Unique identifier for the strategy */
	id: string;

	/** Name of the strategy */
	name: string;

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

export function getPortfolioTotal(portfolio: Record<any, number> | InvestmentPortfolio | PurchaseFees): number {
	return Object.values(portfolio).reduce((acc, value) => acc + value, 0);
}

/**
 * Calculate compound interest over time
 * @param principal - Starting amount
 * @param annualRate - Annual interest rate as a decimal (e.g., 0.05 for 5%)
 * @param months - Number of months to compound
 * @returns Final amount after compound interest
 */
export function compoundInterest(principal: number, annualRate: number, months: number): number {
	const monthlyRate = annualRate / 12;
	return principal * Math.pow(1 + monthlyRate, months);
}

export interface MortgageParams {
	/** Unique identifier for the mortgage */
	id: string;

	/** Name of the mortgage */
	name: string;

	/** Interest rate for the mortgage */
	interestRate: number;

	/** Initial loan to value for the mortgage */
	ltv: number;

	/** Term of the mortgage in years */
	term: number;

	/** Fixed period of the mortgage in years */
	fixedPeriod: number;

	/** Cost of arranging the mortgage */
	arrangementFee: number;

	/** Whether the mortgage is a repayment mortgage such that the principal is reduced over time */
	isRepayment: boolean;

	/** Whether the mortgage is an offset mortgage such that cash savings can be used to decrease interest payments */
	isOffset: boolean;
}

export function computeMortgageRepayment(principal: number, params: MortgageParams): number {
	if(params.isRepayment) {
		let r = params.interestRate / 12;
		let n = params.term * 12;

		return principal * (r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
	} else {
		return principal * (params.interestRate / 12);
	}
}

export interface HomeStats {
	/** How much is the property worth? */
	worth: number;

	/** Outstanding loan principal */
	principal: number;
}

export interface SimulationResultRow {
	/** How much is the property worth? */
	home: HomeStats;

	/** How much is the portfolio worth? */
	investments: InvestmentPortfolio;

	/** How much is being added to savings per month? */
	savingsFlow: number
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
	inflationMultiple: number,
}): InvestmentPortfolio {

	let next : InvestmentPortfolio = { ...args.portfolio };

	// Simululate rebalance
	if(args.rebalance) {
		let total = getPortfolioTotal(args.portfolio)
		next = {
			...EMPTY_PORTFOLIO,
			cash: Math.min(args.strategy.minCash * args.inflationMultiple, total),
		};

    let remaining = total - next.cash;

		let totalWeight = getPortfolioTotal(args.strategy.allocationWeights);

		// Allocate remaining to other asset classes in the strategy's proportions
		let extraCash = remaining * (args.strategy.allocationWeights.cash / totalWeight);
		if(next.cash + extraCash > args.strategy.maxCash * args.inflationMultiple) {
			next.cash = args.strategy.maxCash * args.inflationMultiple;
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
	if(next.cash >= args.strategy.maxCash * args.inflationMultiple) {
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

function computeTaxBands(taxableAmount: number, bands: { upper: number, rate: number }[]): number {
	let tax = 0;

	let lastUpper = 0

	for(let band of bands) {
		if(taxableAmount <= lastUpper) {
			break;
		}
		let upper = Math.min(taxableAmount, band.upper);
		let inBand = upper - lastUpper;
		tax += inBand * band.rate;
		lastUpper = band.upper;
	}

	return tax;
}

interface PurchaseFees {
	stampDuty: number;
	solicitor: number;
	searches: number;
	landRegistry: number;
	survey: number;
	moving: number;
}

export function computePurchaseFees(propertyPrice: number, isFtb: boolean): PurchaseFees {

	// First time buyers pay 0% stamp duty on the first £300,000 of the property price, and 5% on the rest
	// If purchase price is over 500k, this exemption is not available.
	const stampDutyBands = isFtb && propertyPrice < 500000? [
		{ upper: 300000, rate: 0.00 },
		{ upper: Infinity, rate: 0.05 },
	] : [
		{ upper: 125000, rate: 0.00 },
		{ upper: 250000, rate: 0.02 },
		{ upper: 925000, rate: 0.05 },
		{ upper: 1500000, rate: 0.10 },
		{ upper: Infinity, rate: 0.12 },
	]

	return {
		stampDuty: computeTaxBands(propertyPrice, stampDutyBands),
		solicitor: 1000,
		searches: 300,
		landRegistry: 150,
		survey: 1000,
		moving: 1000,
	}
}

type PnlRow = { income: number, income1: number, income2: number, expenses: number };

export function computeIncomeAndExpenses(ga: GlobalAssumptions): PnlRow[] {
	const CURVE = YEAR_CURVES.find(c => c.key === ga.yearCurve)?.values || YEAR_CURVES[0].values;

	const result: PnlRow[] = [];

	for(let i = 0; i <= ga.simulationYears*12; ++i) {
		const year = Math.floor(i/12);
		const income1 = compoundInterest(ga.income1Pa / 12, ga.inflationRate, year*12) * CURVE[year].income1;
		const income2 = compoundInterest(ga.income2Pa / 12, ga.inflationRate, year*12) * CURVE[year].income2;
		const income = income1 + income2;
		const expenses = compoundInterest(ga.expensesPa / 12, ga.inflationRate, year*12) * CURVE[year].expenses;
		result.push({
			income,
			income1,
			income2,
			expenses,
		});
	}

	return result;
}

export function simulateMortgageFree(ga: GlobalAssumptions, strategy: InvestmentStrategy): SimulationResultRow[] {
	const pnl = computeIncomeAndExpenses(ga);

	let lastPortfolio: InvestmentPortfolio = {
		...EMPTY_PORTFOLIO,
		cash: ga.openingSavings,
	};

	let results: SimulationResultRow[] = [];
	results.push({
		home: { principal: 0, worth: ga.propertyPrice },
		investments: lastPortfolio,
		savingsFlow: pnl[0].income - pnl[0].expenses - ga.equivalentRent
	});

	for(let step = 1; step <= ga.simulationYears*12; ++step) {
		const extraDeposit = pnl[step].income - pnl[step].expenses - compoundInterest(
			ga.equivalentRent,
			// Rent typically tracks inflation. I'm not sure this will hold in a high inflation environment,
			// so as a simplified estimate/assumption, we take the average of real estate returns and inflation
			(ga.expectedReturns.realEstate + ga.inflationRate)/2,
			//ga.inflationRate,
			step
	  );
		let nextPortfolio = stepPortfolio({
			portfolio: lastPortfolio,
			strategy: strategy,
			expectedReturns: ga.expectedReturns,
			extraDeposit,
			rebalance: strategy.rebalanceFrequency > 0 && step % strategy.rebalanceFrequency === 0,
			inflationMultiple: compoundInterest(1, ga.inflationRate, step),
		});

		results.push({
			home: { principal: 0, worth: ga.propertyPrice * Math.pow(1 + ga.expectedReturns.realEstate / 12, step + 1) },
			investments: nextPortfolio,
			savingsFlow: extraDeposit,
		});

		lastPortfolio = nextPortfolio;
	}

	return results;
}

export function simulateMortgage(ga: GlobalAssumptions, strategy: InvestmentStrategy, mortgage: MortgageParams): SimulationResultRow[] {
	let results: SimulationResultRow[] = [];

	const deposit = ga.propertyPrice * (1 - mortgage.ltv);
	const purchaseFees = computePurchaseFees(ga.propertyPrice, false);

	let lastPortfolio: InvestmentPortfolio = {
		...EMPTY_PORTFOLIO,
		cash: ga.openingSavings - deposit - getPortfolioTotal(purchaseFees),
	};

	const initialBorrowed = ga.propertyPrice - deposit;
	let lastHome: HomeStats = {
		principal: initialBorrowed,
		worth: ga.propertyPrice,
	}

	let mortgageRepayment = computeMortgageRepayment(lastHome.principal, mortgage);
	const pnl = computeIncomeAndExpenses(ga);

	results.push({
		home: lastHome,
		investments: lastPortfolio,
		savingsFlow: pnl[0].income - pnl[0].expenses - mortgageRepayment - lastHome.worth * ga.houseMaintenancePercentage / 12,
	})

	for(let step = 1; step <= ga.simulationYears*12; ++step) {
		let extraDelta = 0
		if(step % 12 === 1 && step !== 1) {
			// Then its the start of a new year
			let year = Math.floor(step/12);
			if(year % mortgage.fixedPeriod === 0) {
				// Then its the start of a new fixed period
				// This is a gross simplication, since we cant guess future intrest rates, we just assume
				// there is a remortgage fee and then we get onto the same terms as before
				extraDelta = -mortgage.arrangementFee
			}
		}

		let nextHome = {
			principal: lastHome.principal,
			worth: lastHome.worth * (1 + ga.expectedReturns.realEstate / 12),
		}

		let repayment: number;
		if(mortgage.isOffset) {
			// Calculate effective balance (principal minus offset cash) before adding interest
			let effectiveBalance = Math.max(0, lastHome.principal - lastPortfolio.cash);
			let chargeableBalance = effectiveBalance;

			// Add interest only on the chargeable balance
			nextHome.principal += chargeableBalance * (mortgage.interestRate / 12);
		} else {
			nextHome.principal *= (1 + mortgage.interestRate / 12);
		}
		repayment = Math.min(nextHome.principal, mortgageRepayment);
		nextHome.principal -= repayment;

		let forceRebalance = false;
		if(step === 12 * mortgage.term && !mortgage.isRepayment) {
			// Then its the end of a interest only mortgage so we need to payoff the the remaining balance
			extraDelta = -lastHome.principal;
			nextHome.principal = 0;
			forceRebalance = true;
		}

		let savingsFlow = pnl[step].income - pnl[step].expenses - repayment - (nextHome.worth * ga.houseMaintenancePercentage / 12) + extraDelta;

		let nextPortfolio = stepPortfolio({
			portfolio: lastPortfolio,
			strategy: strategy,
			expectedReturns: ga.expectedReturns,
			extraDeposit: savingsFlow,
			rebalance: (strategy.rebalanceFrequency > 0 && step % strategy.rebalanceFrequency === 0) || forceRebalance,
			inflationMultiple: compoundInterest(1, ga.inflationRate, step),
		});


		results.push({
			home: nextHome,
			investments: nextPortfolio,
			savingsFlow: savingsFlow,
		})

		lastPortfolio = nextPortfolio;
		lastHome = nextHome;
	}

	return results;
}

export function computeInflationMultiples(inflationRate: number, months: number): number[] {
	let value = 1

	let result: number[] = [1];

	for(let i = 0; i < months; ++i) {
		value *= (1 - inflationRate / 12);
		result.push(value);
	}

	return result;
}