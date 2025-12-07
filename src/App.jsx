import './App.css'
import React from 'react'
import { Card } from './components/UI'
import GlobalAssumptionsForm from './components/forms/GlobalAssumptions'
import { InvestmentStrategyEditor } from './components/forms/InvestmentStrategies'
import { MortgageEditor } from './components/forms/Mortgages'

function useAppData() {
	const [globalAssumptions, setGlobalAssumptions] = React.useState({
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
		houseMaintenancePercentage: 0.01,
		simulationYears: 40,
	})

	const [investmentStrategies, setInvestmentStrategies] = React.useState([
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

	return (
		<main>
			<Card className="max-w-[1400px] mx-auto">
				<GlobalAssumptionsForm value={globalAssumptions} setValue={setGlobalAssumptions} />
			</Card>
			<div className="grid grid-cols-2 gap-4 max-w-[1400px] mx-auto">
				<Card>
					<h2>Invetsment Strategies</h2>
					<InvestmentStrategyEditor value={investmentStrategies} setValue={setInvestmentStrategies} />
				</Card>
				<Card>
					<h2>Mortgages</h2>
					<MortgageEditor value={mortgages} setValue={setMortgages} globalAssumptions={globalAssumptions} />
				</Card>
			</div>
		</main>
	)
}






export default App
