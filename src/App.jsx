import './App.css'
import React from 'react'
import { Card, Table, Button } from './components/UI'
import ListSelect from './components/UI/Input/ListSelect'
import GlobalAssumptionsForm from './components/forms/GlobalAssumptions'
import { InvestmentStrategyEditor } from './components/forms/InvestmentStrategies'
import { MortgageEditor } from './components/forms/Mortgages'
import { simulateMortgageFree, simulateMortgage, getPortfolioTotal, compoundInterest } from './lib/simcore'

function useAppData() {
	const [globalAssumptions, setGlobalAssumptions] = React.useState({
		openingSavings: 345000,
		propertyPrice: 450000,
		freeCashFlow: 3000,
		equivalentRent: 1050,
		expectedReturns: {
			cash: 0.03,
			stocks: 0.08,
			crypto: 0.12,
			gold: 0.04,
			bonds: 0.04,
			realEstate: 0.032,
		},
		inflationRate: 0.03,
		houseMaintenancePercentage: 0.01,
		simulationYears: 40,
	})

	const [investmentStrategies, setInvestmentStrategies] = React.useState([
		{
			id: 'cash-only',
			name: 'Cash Only',
			allocationWeights: {
				cash: 100,
				stocks: 0,
				crypto: 0,
				gold: 0,
				bonds: 0,
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
				stocks: 85,
				crypto: 7,
				gold: 5,
				bonds: 0,
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
				stocks: 85,
				crypto: 12,
				gold: 0,
				bonds: 0,
			},
			maxCash: 50000,
			minCash: 15000,
			rebalanceFrequency: 12,
		},
	]);

	const [mortgages, setMortgages] = React.useState([
		// Get some sample values here:
		// https://www.moneysupermarket.com/mortgages/rates-table/home-purchase?propertyValue=465700&depositAmount=120000&requiredTerm=15&repaymentMethod=Repayment&region=England&sortResultsBy=MonthlyCost&addFeesToBalance=false&noProductFees=false&decisionInPrincipleProducts=false&page=1&showGreen=true&showCurrentAccount=true&onlySharedOwnership=false&onlySharedEquity=false&onlyOffset=false&onlyFamilyAssist=false&onlyRetirementInterestOnly=false&affordabilityOutcomesSet=true&affordabilityOutcomes=VeryLikely&affordabilityOutcomes=Likely&affordabilityOutcomes=Unlikely&journeyType=HomePurchase&userSegment=Browse
		{
			name: '2 Fix 75% LTV (Nationwide)',
			interestRate: 0.0362,
			ltv: 0.75,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 1499,
		},
		{
			name: '5 Fix 75% LTV (Nationwide)',
			interestRate: 0.0378,
			ltv: 0.75,
			term: 15,
			fixedPeriod: 5,
			arrangementFee: 1499,
		},
		{
			name: '2 Fix 80% LTV (Santander)',
			interestRate: 0.0355,
			ltv: 0.8,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 899 + 80 + 35,
		},
		{
			name: '2 Fix 90% LTV (Santander)',
			interestRate: 0.0409,
			ltv: 0.9,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 999 + 225,
		},
		{
			name: '5 Fix 90% LTV (Santander)',
			interestRate: 0.0425,
			ltv: 0.9,
			term: 15,
			fixedPeriod: 5,
			arrangementFee: 999 + 225,
		},
		{
			name: '2 Fix 49% LTV (Santander)',
			interestRate: 0.0355,
			ltv: 0.45,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 899 + 80 + 35,
		},
		{
			name: '2 Fix 33% LTV (Santander)',
			interestRate: 0.0355,
			ltv: 0.3333333333333333,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 899 + 80 + 35,
		},
		{
			name: '2 Fix 85% LTV (Lloyds)',
			interestRate: 0.0383,
			ltv: 0.85,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 999 + 100,
		},
		{
			name: '5 Fix 85% LTV (Lloyds)',
			interestRate: 0.0398,
			ltv: 0.85,
			term: 15,
			fixedPeriod: 2,
			arrangementFee: 999 + 100,
		},
	].map((m, i) => ({
		...m,
		id: `mortgage-${i}`,
	})));

	return {
		globalAssumptions,
		setGlobalAssumptions,
		investmentStrategies,
		setInvestmentStrategies,
		mortgages,
		setMortgages,
	}
}

function App() {

	const {
		globalAssumptions,
		setGlobalAssumptions,
		investmentStrategies,
		setInvestmentStrategies,
		mortgages,
		setMortgages,
	} = useAppData();

	const [selectedInvestStrat, setSelectedInvestStrat] = React.useState(null);
	const [selectedMortgage, setSelectedMortgage] = React.useState(null);

	const [noMortgageInvestStrat, setNoMortgageInvestStrat] = React.useState(null);
	const [scenarios, setScenarios] = React.useState([]);

	const addScenario = React.useCallback(() => {
		const newId = `scenario-${Date.now()}`
		setScenarios(old => [...old, {
			id: newId,
			investmentStrategyId: investmentStrategies[0]?.id || null,
			mortgageId: mortgages[0]?.id || null,
		}])
	}, [investmentStrategies, mortgages])

	const removeScenario = React.useCallback((id) => {
		setScenarios(old => old.filter(s => s.id !== id))
	}, [])

	const updateScenario = React.useCallback((id, updates) => {
		setScenarios(old => old.map(s => s.id === id ? { ...s, ...updates } : s))
	}, [])

	const viewScenario = React.useCallback((scenario) => {
		setSelectedInvestStrat(scenario.investmentStrategyId)
		setSelectedMortgage(scenario.mortgageId)
	}, [])

	const noMortgageResults = React.useMemo(() => {
		if (!noMortgageInvestStrat) return null
		const strategy = investmentStrategies.find(s => s.id === noMortgageInvestStrat)
		if (!strategy) return null
		return simulateMortgageFree(globalAssumptions, strategy)
	}, [noMortgageInvestStrat, investmentStrategies, globalAssumptions])

	const scenarioResults = React.useMemo(() => {
		return scenarios.map(scenario => {
			const strategy = investmentStrategies.find(s => s.id === scenario.investmentStrategyId)
			const mortgage = mortgages.find(m => m.id === scenario.mortgageId)

			if (!strategy || !mortgage) return null

			return {
				id: scenario.id,
				strategy,
				mortgage,
				results: simulateMortgage(globalAssumptions, strategy, mortgage),
			}
		}).filter(Boolean)
	}, [scenarios, investmentStrategies, mortgages, globalAssumptions])

	return (
		<main>
			<Card className="max-w-[1400px] mx-auto">
				<GlobalAssumptionsForm value={globalAssumptions} setValue={setGlobalAssumptions} />
			</Card>
			<div className="grid grid-cols-2 gap-4 max-w-[1400px] mx-auto">
				<Card>
					<h2>Invetsment Strategies</h2>
					<InvestmentStrategyEditor
						value={investmentStrategies}
						setValue={setInvestmentStrategies}
						selectedId={selectedInvestStrat}
						setSelectedId={setSelectedInvestStrat}
						globalAssumptions={globalAssumptions}
					/>
				</Card>
				<Card>
					<h2>Mortgages</h2>
					<MortgageEditor
						value={mortgages}
						setValue={setMortgages}
						globalAssumptions={globalAssumptions}
						selectedId={selectedMortgage}
						setSelectedId={setSelectedMortgage}
					/>
				</Card>
			</div>
			<SimResults
				scenarios={scenarioResults}
				noMortgageResults={noMortgageResults}
				investmentStrategies={investmentStrategies}
				mortgages={mortgages}
				noMortgageInvestStrat={noMortgageInvestStrat}
				setNoMortgageInvestStrat={setNoMortgageInvestStrat}
				scenariosList={scenarios}
				updateScenario={updateScenario}
				viewScenario={viewScenario}
				removeScenario={removeScenario}
				addScenario={addScenario}
				globalAssumptions={globalAssumptions}
			/>
		</main>
	)
}

// const SIM_INDICIES = [
// 	// First year, every month
// 	new Array(12).fill(0).map((_, i) => i),
// 	// Next year, every quarter
// 	new Array(4).fill(0).map((_, i) => 3 * i + 12),
// 	// Next 1 years, every 6 months
// 	new Array(2).fill(0).map((_, i) => 6 * i + 12),
// 	// Next 36 years - every year
// 	new Array(36).fill(0).map((_, i) => 12 * i + 36),
// ].flat()

const SIM_INDICIES = new Array(41).fill(0).map((_, i) => i * 12)

function SimResults({
	scenarios,
	noMortgageResults,
	investmentStrategies,
	mortgages,
	noMortgageInvestStrat,
	setNoMortgageInvestStrat,
	scenariosList,
	updateScenario,
	viewScenario,
	removeScenario,
	addScenario,
	globalAssumptions,
}) {
	return (
		<Card className="max-w-[1400px] mx-auto overflow-x-auto">
			<Table>
				<Table.Head>
					<Table.Row>
						<Table.Header rowSpan={2}>Year</Table.Header>
						<Table.Header rowSpan={2} thickLeft>Est<br />House<br />Worth</Table.Header>
						<Table.Header rowSpan={2} thickLeft>
							<div className="flex flex-col gap-1 p-1 max-w-[160px]">
								<div className="text-sm font-bold">No Mortgage</div>
								<ListSelect
									value={noMortgageInvestStrat}
									setValue={setNoMortgageInvestStrat}
									list={investmentStrategies.map(s => ({ value: s.id, label: s.name }))}
									placeholder="Select Strategy"
									size="sm"
								/>
							</div>
						</Table.Header>
						{scenarios.map((scenario, idx) => {
							const originalScenario = scenariosList.find(s => s.id === scenario.id)
							return (
								<React.Fragment key={scenario.id}>
									<Table.Header colSpan={4} thickLeft thickRight>
										<div className="flex flex-col gap-1 p-1">
											<div className="flex items-center gap-1">
												<div>

													<ListSelect
														value={scenario.strategy.id}
														setValue={(val) => updateScenario(scenario.id, { investmentStrategyId: val })}
														list={investmentStrategies.map(s => ({ value: s.id, label: s.name }))}
														placeholder="Strategy"
														size="sm"
														className="block flex-1"
													/>
													<ListSelect
														value={scenario.mortgage.id}
														setValue={(val) => updateScenario(scenario.id, { mortgageId: val })}
														list={mortgages.map(m => ({ value: m.id, label: m.name }))}
														placeholder="Mortgage"
														size="sm"
														className="block flex-1"
													/>
												</div>
												<div>

													<Button
														variant="secondary"
														size="small"
														onClick={() => {
															if (originalScenario) viewScenario(originalScenario)
														}}
													>
														View
													</Button>
													<Button
														variant="error"
														size="small"
														onClick={() => removeScenario(scenario.id)}
													>
														Del
													</Button>
												</div>
											</div>
										</div>
									</Table.Header>
								</React.Fragment>
							)
						})}
						<Table.Header rowSpan={2} thickLeft>
							<Button variant="secondary" size="small" onClick={addScenario}>
								+ Add
							</Button>
						</Table.Header>
					</Table.Row>
					<Table.Row>
						{scenarios.map(scenario => (
							<React.Fragment key={scenario.id}>
								<Table.Header thickLeft>Principle</Table.Header>
								<Table.Header>Equity</Table.Header>
								<Table.Header>Savings</Table.Header>
								<Table.Header>Net Worth</Table.Header>
							</React.Fragment>
						))}
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{SIM_INDICIES.map((index) => (
						<Table.Row key={index}>
							<Table.Cell>{Math.floor((index) / 12)}</Table.Cell>
							<Table.Cell.Pounds thickLeft>
								{compoundInterest(globalAssumptions.propertyPrice, globalAssumptions.expectedReturns.realEstate, index)}
							</Table.Cell.Pounds>
							{noMortgageResults ? (
								<Table.Cell.Portfolio portfolio={noMortgageResults[index].investments} thickLeft />
							) : (
									<Table.Cell thickLeft>-</Table.Cell>
							)}
							{scenarios.map((scenario, idx) => {
								const row = scenario.results[index]
								if (!row) return null
								const equity = row.home.worth - row.home.principal
								const netWorth = equity + getPortfolioTotal(row.investments)
								return (
									<React.Fragment key={scenario.id}>
										<Table.Cell.Pounds thickLeft>{row.home.principal}</Table.Cell.Pounds>
										<Table.Cell.Pounds>{equity}</Table.Cell.Pounds>
										<Table.Cell.Portfolio portfolio={row.investments} />
										<Table.Cell.Pounds thickRight>{netWorth}</Table.Cell.Pounds>
									</React.Fragment>
								)
							})}
							<Table.Cell thickLeft></Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Card>
	)
}






export default App
