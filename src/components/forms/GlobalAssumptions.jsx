import { LiveForm, InputNumber, InputPercent, ListSelect, Field } from '../UI'
import { YEAR_CURVES } from '../../lib/year-curves'

export default function GlobalAssumptionsForm({ value, setValue }) {
	return (
		<div className="">
			<h2 className="text-lg font-bold">Global Assumptions</h2>
			<LiveForm
				value={value}
				setValue={setValue}
				className="grid grid-cols-7 gap-x-8 gap-y-1"
				style={{
					gridTemplateColumns: 'auto repeat(6, 1fr)',
				}}
			>
				<h3 className="text-lg font-bold">Property</h3>

				<LiveForm.Field name="openingSavings" label="Opening Savings" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="propertyPrice" label="Property Price" input={{ Tag: InputNumber, prefix: '£' }} />
				<div>
					<LiveForm.Field name="houseMaintenancePercentage" label="House Upkeep" input={{ Tag: InputPercent }} />
					<div className="text-sm text-gray-500 text-right">
						£{Math.round(value.propertyPrice * value.houseMaintenancePercentage / 12)} / month
					</div>
				</div>
				<LiveForm.Field name="inflationRate" label="Inflation Rate" input={{ Tag: InputPercent }} />
				<div>
					<LiveForm.Field name="equivalentRent" label="Equivalent Rent" input={{ Tag: InputNumber, prefix: '£' }} />
				</div>

				<h3 className="text-lg font-bold" style={{ gridColumn: '1' }}>Self</h3>
				<LiveForm.Field name="startAge" label="Start Age" input={{ Tag: InputNumber }} />
				<LiveForm.Field name="income1Pa" label="Income1 / Year" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="income2Pa" label="Income2 / Year" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="expensesPa" label="Expenses / Year" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="yearCurve" label="Year Curve" input={{ Tag: ListSelect, list: YEAR_CURVES.map(c => ({ label: c.name, value: c.key })) }} />
				<Field label="Disposable Income">
					£{Math.round((value.income1Pa + value.income2Pa - value.expensesPa) / 12)} / month
				</Field>

				<h3 className="text-lg font-bold" style={{ gridColumn: '1' }}>Investment<br />Returns</h3>
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