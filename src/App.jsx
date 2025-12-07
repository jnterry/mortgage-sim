import './App.css'
import React from 'react'
import { InputNumber, InputPercent, LiveForm } from './components/UI'

function App() {
	const [ga, setGa] = React.useState({
		openingSavings: 325000,
		propertyPrice: 450000,
		freeCashFlow: 3100,
		equivalentRent: 1050,
		expectedReturns: {
			cash: 0.04,
			stocks: 0.07,
			crypto: 0.12,
			gold: 0.04,
			bonds: 0.04,
			realEstate: 0.02,
		},
		inflationRate: 0.03,
		houseMaintenancePercentage: 0.015,
		simulationYears: 40,
	})

	return (
		<main>
			<Card className="max-w-[1400px] mx-auto">
				<GlobalAssumptionsForm ga={ga} setGa={setGa} />
			</Card>
		</main>
	)
}

function Card({ children, className = '' }) {
	return (
		<div className={`p-4 bg-white rounded-lg shadow-xl border border-gray-200 border-2 ${className}`}>
			{children}
		</div>
	)
}

function GlobalAssumptionsForm({ ga, setGa }) {
	return (
		<div className="">
			<h2 className="text-lg font-bold">Global Assumptions</h2>
			<LiveForm
				value={ga}
				setValue={setGa}
				className="grid grid-cols-7 gap-x-8 gap-y-1"
				style={{
					gridTemplateColumns: 'auto repeat(6, 1fr)',
				}}
			>

				<h3 className="text-lg font-bold">Scenario</h3>

				<LiveForm.Field name="openingSavings" label="Opening Savings" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="propertyPrice" label="Property Price" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="houseMaintenancePercentage" label="House Maintenance" input={{ Tag: InputPercent }} />
				<LiveForm.Field name="freeCashFlow" label="Free Cash Flow" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="inflationRate" label="Inflation Rate" input={{ Tag: InputPercent }} />
				<LiveForm.Field name="equivalentRent" label="Equivalent Rent" input={{ Tag: InputNumber, prefix: '£' }} />

				<h3 className="text-lg font-bold">Investment Returns</h3>
				<LiveForm.SubObject name="expectedReturns">
					<LiveForm.Field name="cash" label="Cash" input={{ Tag: InputPercent }} />
					<LiveForm.Field name="stocks" label="Stocks" input={{ Tag: InputPercent }} />
					<LiveForm.Field name="crypto" label="Crypto" input={{ Tag: InputPercent }} />
					<LiveForm.Field name="gold" label="Gold" input={{ Tag: InputPercent }} />
					<LiveForm.Field name="bonds" label="Bonds" input={{ Tag: InputPercent }} />
					<LiveForm.Field name="realEstate" label="Real Estate" input={{ Tag: InputPercent }} />
				</LiveForm.SubObject>
			</LiveForm >
		</div>
	)
}


export default App
