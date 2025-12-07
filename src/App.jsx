import './App.css'
import React from 'react'
import { Field, InputNumber } from './components/UI'

function App() {
	const [ ga, setGa ] = React.useState({
		openingSavings: 0,
		propertyPrice: 0,
		freeCashFlow: 0,
		equivalentRent: 0,
		cashReturn: 0,
		expectedReturns: {
			cash: 0,
			stocks: 0,
			crypto: 0,
			gold: 0,
			bonds: 0,
			realEstate: 0,
		},
		inflationRate: 0,
		houseMaintenancePercentage: 0,
		simulationYears: 0,
	})

	return (
		<main>
			<h1 className="text-2xl font-bold">Mortgage Simulator</h1>


	<Card>
			<GlobalAssumptionsForm ga={ga} setGa={setGa} />
</Card>
		</main>
	)
}

function Card({ children }) {
	return (
		<div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-prose mx-auto">
			{children}
		</div>
	)
}

function GlobalAssumptionsForm({ ga, setGa }) {
  return (
		<div className="flex flex-row gap-4">
			<h2 className="text-lg font-bold">Global Assumptions</h2>
			<Field label="Opening Savings" input={{
				Tag: InputNumber,
				value: ga.openingSavings,
				setValue: (value) => setGa({ ...ga, openingSavings: value }),
			}} />
		</div>
	)
}


export default App
