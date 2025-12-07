import React from 'react'
import { LiveForm, InputNumber, InputPercent, InputText, Button } from '../UI'
import ListEditor from '../ListEditor'

export function InvestmentStrategyForm({ value, setValue }) {

	const totalAllocationWeight = Object.values(value.allocationWeights).reduce((acc, weight) => acc + weight, 0);

	return (
		<LiveForm
			value={value}
			setValue={setValue}
		>
			<LiveForm.Field name="name" label="Name" input={{ Tag: InputText }} />
			<div className="grid grid-cols-2 gap-2">
				<LiveForm.Field name="maxCash" label="Max Cash" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="minCash" label="Min Cash" input={{ Tag: InputNumber, prefix: '£' }} />
			</div>
			<LiveForm.Field name="rebalanceFrequency" label="Rebalance Frequency" input={{ Tag: InputNumber }} />

			<h3 className="text-lg font-bold mt-3">Allocation Weights (Total: {totalAllocationWeight})</h3>
			<LiveForm.SubObject name="allocationWeights">
				<div className="grid grid-cols-2 gap-2">

					<LiveForm.Field name="cash" label="Cash" input={{ Tag: InputNumber }} />
					<LiveForm.Field name="bonds" label="Bonds" input={{ Tag: InputNumber }} />
					<LiveForm.Field name="stocks" label="Stocks" input={{ Tag: InputNumber }} />
					<LiveForm.Field name="gold" label="Gold" input={{ Tag: InputNumber }} />
					<LiveForm.Field name="crypto" label="Crypto" input={{ Tag: InputNumber }} />
					<LiveForm.Field name="realEstate" label="Real Estate" input={{ Tag: InputNumber }} />
				</div>
			</LiveForm.SubObject>
		</LiveForm >
	)
}

export function InvestmentStrategyEditor({ value, setValue }) {
	return (
		<ListEditor
			value={value}
			setValue={setValue}
			FormRenderer={InvestmentStrategyForm}
		/>
	)
}