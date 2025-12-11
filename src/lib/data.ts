import type { GlobalAssumptions, InvestmentStrategy, MortgageParams } from "./simcore";

export const GLOBAL_ASSUMPTIONS : GlobalAssumptions = {
	startYear: 2026,
	startAge: 28,
	retirementAge: 55,
	openingSavings: 345000,
	propertyPrice: 450000,

	/** Assumed post tax income per annum at start of simulation */
	income1Pa: 33800,
	income2Pa: 28100,

	/** Assumed expenses per annum at start of simulation - excluding housing */
	expensesPa: 26000,

	/** If not purchasing a property, how much rent would be paid per month? */
	equivalentRent: 1050,

	/** Type of year curve to use to adjust income/expenses over time */
	yearCurve: 'jamie-flat-emily-4-maternity',

	expectedReturns: {
		// 2008 - 2022 ~0.75 for 14 years
		// 2022 - 2025 ~4.00 for 3 years
		// (0.75 * 14 + 4.00 * 3) / 17 = 1.3% per year
		// This is less than inflation assumption, which therefore seems reasonable
		cash: 0.013,

		// SNP is up 401% in 17 years (peak before 2008 crash to present day)
		// This is somewhat conservative, since from trough to peak is up 944%
		//
		// Compound growth rate is:
		// - Math.pow(4.01, 1/17) - 1 = 0.08512
		// - Math.pow(9.44, 1/17) - 1 = 0.14286
		// So somewhere between 8% and 14% per year is reasonable
		// Figures often quoted for longer historic averages are 9-10%
		//
		// But non-US stocks have done worse - and we would want to be globally diversified
		// to avoid US-specific risks and hence will pick up these worse returns
		//
		// Global ftse all world index has done closer to 488% since 2002 (17 years)
		// Math.pow(4.88, 1/17) - 1 = 0.071
		//
		// We also might expect stocks to do slightly worse over the next few decades than last few
		// as they are at such historic highs.
		// We wil therefore use the conservative estimate of 7%
		stocks: 0.07,

		// 2021 peak - 70.4k
		// 2025 peak - 123k
		// That's Math.pow(123/70.4, 1/4)-1 = 0.149
		//
		// Returns have been bigger in past, but I'm expecting diminshing returns over time
		// If you measured trough in 2024 of 17.5k to 2025 peak of 123 its 165% per year...
		// Conservatively, we'll assume the continued 15% per year if you do peak to peak
		// I'm hoping we can do better than that...
		crypto: 0.15,

		// Gold prices:
		// 1971 (when unlinked from fixed exchange rate): 35.78 USD per ounce
		// 2025: 4237 USD per ounce
		// That's Math.pow(4237/35.78, 1/54)-1 = 9.2% compound growth!
		//
		// However 1971 to 1980 went up massively as it detethered from fixed exchange rate
		// So lets instead try:
		// 1980 - 640 USD per ounce
		// 2025 - 4237 USD per ounce
		// That's Math.pow(4237/640, 1/45)-1 = 4.289% compound growth!
		//
		// For sake of checking,
		// 2008 - 865 usd per ounce
		// 2025 - 4237 usd per ounce
		// That's Math.pow(4237/865, 1/17)-1 = 9.79% compound growth!
		//
		// Moreover, if you do total world stock index divided by gold since 2008, its been fairly range
		// bound, not really moving!
		//
		// Long term we would expect stock to outperform gold as stock represents productive assets
		// But in this high inflation environment, I'm actually expecting gold will do fairly well...
		// So lets assume 6% for now...
		gold: 0.06,


		// Bonds have basically been flat since 2008 (face value hot up as interest rates fell, but then they lost all
		// that gain as interest rates rose again)
		// We assume its only slightly above the cash rate then, since its only the yield that matters, and we'd only expect
		// to get a little over safe cash rate in more risky bonds issued by companies rather than goverments
		bonds: 0.02,

		// Average UK house price in 2008: 168,973.40
		// Average UK house price in 2025: 271,809,00
		// That's 17 years
		// Compound growth rate is therefore:
		// Math.pow(271,809 / 168,973.40, 1/17) - 1 = 0.02836
		// Data taken from:
		// See https://www.cladco.co.uk/blog/post/history-of-uk-house-prices?srsltid=AfmBOoqcGtzlij069fWC65Rq_ndvBi2iHHOQC7jtJKut6qy-ZSy_5sCK
		realEstate: 0.02836,
	},
	// Office national statistics - UK consumer price index:
	// Dec 2008 - 87.1
	// Dec 2025 - 139.5
	// That's Math.pow(139.5/87.1, 1/17)-1 = 0.028
	// But due to hedonic adjustment in UK, inflation rate is a massive underestimate!
	// See shadow stats, its closer to hovering around 4.5% per year
	// https://www.shadowstats.com/alternate_data/inflation-charts
	// This would explain why everything is going up so much, why house prices are falling in real terms, etc
	// We use 0.035 as a midpoint between offical stats and shadow stats, and what inflation could easily rise to
	// over next few decades if its not kept under control (whcih it probably wont be as goverments are so indebted)
	inflationRate: 0.035,
	houseMaintenancePercentage: 0.01,
	simulationYears: 71,
}

export const INVESTMENT_STRATEGIES: InvestmentStrategy[] = [
	{
		id: 'cash-only',
		name: 'Cash Only',
		allocationWeights: {
			cash: 100,
			stocks: 0,
			crypto: 0,
			gold: 0,
			bonds: 0,
			realEstate: 0,
		},
		maxCash: 9999999999,
		minCash: 0,
		rebalanceFrequency: 0,
	},
	{
		id: 'conservative',
		name: 'Conservative',
		allocationWeights: {
			cash: 5,
			stocks: 65,
			crypto: 5,
			gold: 5,
			bonds: 20,
			realEstate: 0,
		},
		maxCash: 100000,
		minCash: 50000,
		rebalanceFrequency: 12,
	},
	{
		id: 'balanced',
		name: 'Balanced',
		allocationWeights: {
			cash: 3,
			stocks: 80,
			crypto: 7,
			gold: 8,
			bonds: 3,
			realEstate: 0,
		},
		maxCash: 75000,
		minCash: 30000,
		rebalanceFrequency: 12,
	},
	{
		id: 'aggressive',
		name: 'Aggressive',
		allocationWeights: {
			cash: 3,
			stocks: 75,
			crypto: 15,
			gold: 7,
			bonds: 0,
			realEstate: 0,
		},
		maxCash: 50000,
		minCash: 30000,
		rebalanceFrequency: 12,
	},
	{
		id: 'kamakaze',
		name: 'Kamakaze',
		allocationWeights: {
			cash: 1,
			stocks: 50,
			crypto: 30,
			gold: 19,
			bonds: 0,
			realEstate: 0,
		},
		maxCash: 50000,
		minCash: 30000,
		rebalanceFrequency: 12,
	}
]

// Get some sample values here:
// https://www.moneysupermarket.com/mortgages/rates-table/home-purchase?propertyValue=465700&depositAmount=120000&requiredTerm=15&repaymentMethod=Repayment&region=England&sortResultsBy=MonthlyCost&addFeesToBalance=false&noProductFees=false&decisionInPrincipleProducts=false&page=1&showGreen=true&showCurrentAccount=true&onlySharedOwnership=false&onlySharedEquity=false&onlyOffset=false&onlyFamilyAssist=false&onlyRetirementInterestOnly=false&affordabilityOutcomesSet=true&affordabilityOutcomes=VeryLikely&affordabilityOutcomes=Likely&affordabilityOutcomes=Unlikely&journeyType=HomePurchase&userSegment=Browse
export const MORTGAGES : MortgageParams[] = [
	{
		name: '2 Fix 75% LTV (Nationwide)',
		interestRate: 0.0362,
		ltv: 0.75,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 1499,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '5 Fix 75% LTV (Nationwide)',
		interestRate: 0.0378,
		ltv: 0.75,
		term: 30,
		fixedPeriod: 5,
		arrangementFee: 1499,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '2 Fix 60% LTV (Santander)',
		interestRate: 0.0355,
		ltv: 0.6,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 899 + 80 + 35,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '2 Fix 90% LTV (Santander)',
		interestRate: 0.0409,
		ltv: 0.9,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 999 + 225,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '5 Fix 90% LTV (Santander)',
		interestRate: 0.0425,
		ltv: 0.9,
		term: 30,
		fixedPeriod: 5,
		arrangementFee: 999 + 225,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '2 Fix 49% LTV (Santander)',
		interestRate: 0.0355,
		ltv: 0.45,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 899 + 80 + 35,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '2 Fix 33% LTV (Santander)',
		interestRate: 0.0355,
		ltv: 0.3333333333333333,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 899 + 80 + 35,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '2 Fix 80% LTV (Lloyds)',
		interestRate: 0.0373,
		ltv: 0.8,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 999,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '2 Fix 85% LTV (Lloyds)',
		interestRate: 0.0383,
		ltv: 0.85,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 999 + 100,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '5 Fix 85% LTV (Lloyds)',
		interestRate: 0.0398,
		ltv: 0.85,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 999 + 100,
		isRepayment: true,
		isOffset: false,
	},
	{
		name: '10Fix 75% LTV Interest Only (Halifax)',
		interestRate: 0.0479,
		ltv: 0.75,
		term: 30,
		fixedPeriod: 10,
		arrangementFee: 999,
		isRepayment: false,
		isOffset: false,
	},
	{
		name: '2 Fix 60% LTV Interest Only (Halifax)',
		interestRate: 0.0357,
		ltv: 0.6,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 999,
		isRepayment: false,
		isOffset: false,
	},
	{
		name: '2 Fix 75% LTV Interest Only (Yorkshire BS)',
		interestRate: 0.0375,
		ltv: 0.75,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 995,
		isRepayment: false,
		isOffset: false,
	},
	{
		name: '2Fix 80% LTV Offset (Yorkshire BS)',
		interestRate: 0.0425,
		ltv: 0.8,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 995,
		isRepayment: true,
		isOffset: true,
	},
	{
		name: '2Fix 60% LTV Offset (Yorkshire BS)',
		interestRate: 0.0409,
		ltv: 0.6,
		term: 30,
		fixedPeriod: 2,
		arrangementFee: 995,
		isRepayment: true,
		isOffset: true,
	},
].map((m, i) => ({
	...m,
	id: `mortgage-${i}`,
}));

