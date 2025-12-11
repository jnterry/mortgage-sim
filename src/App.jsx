import './App.css'
import React from 'react'
import { Card } from './components/UI'
import GlobalAssumptionsForm from './components/forms/GlobalAssumptions'
import { InvestmentStrategyEditor } from './components/forms/InvestmentStrategies'
import { MortgageEditor } from './components/forms/Mortgages'
import { AppContextProvider, useAppContext } from './AppContext'
import ScenarioTable from './components/ScenarioTable'

export default function App() {
	return (
		<AppContextProvider>
			<Content />
		</AppContextProvider>
	)
}

function Content() {
	const ctx = useAppContext()
	return (
		<main>
			<Card className="max-w-[1400px] mx-auto">
				<GlobalAssumptionsForm value={ctx.data.globalAssumptions} setValue={ctx.data.setGlobalAssumptions} />
			</Card>
			<div className="grid grid-cols-2 gap-4 max-w-[1400px] mx-auto">
				<Card>
					<h2>Invetsment Strategies</h2>
					<InvestmentStrategyEditor
						value={ctx.data.investmentStrategies}
						setValue={ctx.data.setInvestmentStrategies}
						selectedId={ctx.viewedStrategy.id}
						setSelectedId={ctx.viewedStrategy.set}
						globalAssumptions={ctx.data.globalAssumptions}
					/>
				</Card>
				<Card>
					<h2>Mortgages</h2>
					<MortgageEditor
						value={ctx.data.mortgages}
						setValue={ctx.data.setMortgages}
						globalAssumptions={ctx.data.globalAssumptions}
						selectedId={ctx.viewedMortgage.id}
						setSelectedId={ctx.viewedMortgage.set}
					/>
				</Card>
			</div>
			<Card className="max-w-[1400px] mx-auto overflow-x-auto">
				<ScenarioTable />
			</Card>
		</main>
	)
}