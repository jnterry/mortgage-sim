import React from 'react'
import { LiveForm, InputNumber, InputPercent, InputText, Field, Button, Checkbox } from '../UI'
import ListEditor from '../ListEditor'
import { computeMortgageRepayment, computePurchaseFees } from '../../lib/simcore'

// Estimate of max amount banks would be willing to lend us
const MAX_BORROWING = 78200 * 4.5;

// Savings flow under which to warn as feels dodgy to me...
const MIN_SAVINGS_FLOW = 500;

// Remaining savings under which to warn as feels dodgy to me...
const MIN_REMAINING_SAVINGS = 30000;

export function MortgageForm({ value, setValue, globalAssumptions }) {
	const deposit = Math.round(globalAssumptions.propertyPrice * (1 - value.ltv));
	const principal = globalAssumptions.propertyPrice - deposit;
	const repayment = computeMortgageRepayment(principal, value);
	const savingsFlow = (globalAssumptions.incomePa - globalAssumptions.expensesPa) / 12 - repayment - globalAssumptions.propertyPrice * globalAssumptions.houseMaintenancePercentage / 12;
	const expectedPurchaseFees = Object.values(computePurchaseFees(globalAssumptions.propertyPrice, true)).reduce((acc, fee) => acc + fee, 0) + (value.arrangementFee || 0);
	const remainingSavings = globalAssumptions.openingSavings - deposit - expectedPurchaseFees;

	return (
		<LiveForm
			value={value}
			setValue={setValue}
		>
			<LiveForm.Field name="name" label="Name" input={{ Tag: InputText }} />

			<div className="grid grid-cols-2 gap-2">

				<LiveForm.Field name="interestRate" label="Interest Rate" input={{ Tag: InputPercent }} />
				<div />
				<LiveForm.Field name="term" label="Default Term" input={{ Tag: InputNumber }} />
				<LiveForm.Field name="fixedPeriod" label="Fixed Period" input={{ Tag: InputNumber }} />

				<LiveForm.Field name="arrangementFee" label="Arrangement Fee" input={{ Tag: InputNumber, prefix: '£' }} />
				<Field label="Expected Fees">
					<span>£{expectedPurchaseFees}</span>
				</Field>

				<LiveForm.Field name="ltv" label="Loan to Value" input={{ Tag: InputPercent }} />

				<LiveForm.Field name="isRepayment" label="Is Repayment?" input={{ Tag: Checkbox }} />

				<Field label="Deposit">
					<span>£{deposit}</span>
				</Field>

				<Field label="Amount Borrowed">
					<span className={principal > MAX_BORROWING ? 'text-red-500' : ''}>£{principal}</span>
				</Field>

				<Field label="Remaining Savings">
					<span className={remainingSavings < MIN_REMAINING_SAVINGS ? 'text-red-500' : ''}>£{remainingSavings}</span>
				</Field>

				<Field label="Monthly Repayment">
					<span>£{Math.round(repayment)}</span>
				</Field>
				<Field label="Savings Flow">
					<span className={savingsFlow < MIN_SAVINGS_FLOW ? 'text-red-500' : ''}>£{Math.round(savingsFlow)}</span>
				</Field>

			</div>
		</LiveForm >
	)
}

export function MortgageEditor({ value, setValue, globalAssumptions, selectedId, setSelectedId }) {
	return (
		<ListEditor
			value={value}
			setValue={setValue}
			FormRenderer={MortgageForm}
			formProps={{ globalAssumptions }}
			selectedId={selectedId}
			setSelectedId={setSelectedId}
		/>
	)
}