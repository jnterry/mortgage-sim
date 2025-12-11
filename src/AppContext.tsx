import React from 'react'
import * as DATA from './lib/data'
import { compoundInterest, computeIncomeAndExpenses, computeInflationMultiples, simulateMortgage, simulateMortgageFree, type GlobalAssumptions, type InvestmentStrategy, type MortgageParams, type SimulationResultRow } from './lib/simcore'

interface AppData {
	globalAssumptions: GlobalAssumptions
	setGlobalAssumptions: (globalAssumptions: GlobalAssumptions) => void
	investmentStrategies: InvestmentStrategy[]
	setInvestmentStrategies: (investmentStrategies: InvestmentStrategy[]) => void
	mortgages: MortgageParams[]
	setMortgages: (mortgages: MortgageParams[]) => void
}

export function useAppData(): AppData {
	const [globalAssumptions, setGlobalAssumptions] = React.useState(DATA.GLOBAL_ASSUMPTIONS)
	const [investmentStrategies, setInvestmentStrategies] = React.useState(DATA.INVESTMENT_STRATEGIES)
	const [mortgages, setMortgages] = React.useState(DATA.MORTGAGES)

	return {
		globalAssumptions,
		setGlobalAssumptions,
		investmentStrategies,
		setInvestmentStrategies,
		mortgages,
		setMortgages,
	}
}

interface ScenarioParams {
	id: string
	mortgageId: string
	investmentStrategyId: string

	/**
	 * Override the default mortgage term - this doesn't affect the mortgage rates etc so is safe to
	 * override per scenario
	 */
	termOverride: number | null
}

export function useAppState(data: AppData) {

	// Should numbers be displayed in real or nominal terms?
	const [displayReal, setDisplayReal] = React.useState(true);

	const [viewedStrategyId, setViewedStrategyId] = React.useState<string | null>(null);
	const [viewedMortgageId, setViewedMortgageId] = React.useState<string | null>(null);

	// The baseline mortgage free investment strategy which is used as a point of comparison to
	// if we just rented rather than buying a property.
	const [baselineStrategyId, setBaselineStrategyId] = React.useState<string>('balanced');

	const [scenarios, setScenarios] = React.useState<ScenarioParams[]>([]);

	return React.useMemo(() => ({
		displayReal,
		setDisplayReal,

		viewedStrategy: {
			id: viewedStrategyId,
			set: setViewedStrategyId,
		},
		viewedMortgage: {
			id: viewedMortgageId,
			set: setViewedMortgageId,
		},
		baselineStrategy: {
			id: baselineStrategyId,
			set: setBaselineStrategyId,
		},
		scenarios: {
			items: scenarios,
			add: () => {
				const newId = `scenario-${Date.now()}`
				setScenarios(old => [...old, {
					id: newId,
					investmentStrategyId: baselineStrategyId || data.investmentStrategies[0]?.id!,
					mortgageId: data.mortgages[0]?.id!,
					termOverride: null,
				}])
			},
			remove: (id: string) => {
				setScenarios(old => old.filter(s => s.id !== id))
			},
			update: (id: string, updates: Partial<ScenarioParams>) => {
				setScenarios(old => old.map(s => s.id === id ? { ...s, ...updates } : s))
			},
			view: (scenario: ScenarioResults) => {
				setViewedStrategyId(scenario.strategy.id)
				setViewedMortgageId(scenario.mortgage.id)
			},
		},
	}), [data.investmentStrategies, data.mortgages, viewedStrategyId, viewedMortgageId, baselineStrategyId, scenarios, displayReal, setDisplayReal])
}

export interface ScenarioResults {
	id: string
	strategy: InvestmentStrategy
	mortgage: MortgageParams
	termOverride: number | null
	results: SimulationResultRow[]
}

export interface AppContextType {
	data: AppData
	computed: {
		inflationMultiples: number[]
		baseline: SimulationResultRow[] | null
		houseWorth: number[]
		pnl: { income: number, expenses: number }[]
	}
	viewedStrategy: {
		id: string | null
		set: (id: string | null) => void
	}
	viewedMortgage: {
		id: string | null
		set: (id: string | null) => void
	}
	baselineStrategy: {
		id: string
		set: (id: string) => void
	}
	scenarios: {
		items: ScenarioResults[]
		add: () => void
		remove: (id: string) => void
		update: (id: string, updates: Partial<ScenarioParams>) => void
		view: (scenario: ScenarioResults) => void
	}

	displayReal: {
		value: boolean
		set: (displayReal: boolean) => void
	}
}

const AppContext = React.createContext<AppContextType | null>(null)

export function AppContextProvider({ children }: { children: React.ReactNode }) {


	const data = useAppData()
	const state = useAppState(data)
	console.log('scenarios', state.scenarios.items)

	const inflationMultiples = React.useMemo(() => {
		return computeInflationMultiples(data.globalAssumptions.inflationRate, data.globalAssumptions.simulationYears * 12)
	}, [data.globalAssumptions.inflationRate, data.globalAssumptions.simulationYears])

	const baselineResults = React.useMemo(() => {
		if (!state.baselineStrategy.id) return null
		const strategy = data.investmentStrategies.find(s => s.id === state.baselineStrategy.id)
		if (!strategy) return null
		return simulateMortgageFree(data.globalAssumptions, strategy)
	}, [data.globalAssumptions, data.investmentStrategies, state.baselineStrategy.id])

	const scenarioResults = React.useMemo(() => {
		return state.scenarios.items.map(scenario => {
			const strategy = data.investmentStrategies.find(s => s.id === scenario.investmentStrategyId)
			const mortgage = data.mortgages.find(m => m.id === scenario.mortgageId)

			if (!strategy || !mortgage) return null

			return {
				id: scenario.id,
				strategy,
				mortgage,
				termOverride: scenario.termOverride,
				results: simulateMortgage(data.globalAssumptions, strategy, {
					...mortgage,
					term: scenario.termOverride || mortgage.term,
				}),
			}
		}).filter(Boolean)
	}, [state.scenarios, data.investmentStrategies, data.mortgages, data.globalAssumptions])

	const houseWorth = React.useMemo(() => {
		return new Array(1 + data.globalAssumptions.simulationYears * 12).fill(0).map((_, index) => {
			return compoundInterest(data.globalAssumptions.propertyPrice, data.globalAssumptions.expectedReturns.realEstate, index)
		})

	}, [data.globalAssumptions.propertyPrice, data.globalAssumptions.expectedReturns.realEstate, data.globalAssumptions.simulationYears])

	const pnl = React.useMemo(() => {
		return computeIncomeAndExpenses(data.globalAssumptions)
	}, [data.globalAssumptions])


	const ctx = React.useMemo(() => {
		return {
			data,
			displayReal: {
				value: state.displayReal,
				set: state.setDisplayReal,
			},
			computed: {
				inflationMultiples,
				baseline: baselineResults,
				houseWorth,
				pnl,
			},
			scenarios: {
				...state.scenarios,
				items: scenarioResults as ScenarioResults[],
			},
			viewedStrategy: state.viewedStrategy,
			viewedMortgage: state.viewedMortgage,
			baselineStrategy: state.baselineStrategy,
		}
	}, [data, inflationMultiples, baselineResults, scenarioResults, state, houseWorth])

	return (
		<AppContext.Provider value={ctx}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return React.useContext(AppContext)
}
