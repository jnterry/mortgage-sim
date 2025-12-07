import { LiveForm, InputNumber, InputPercent } from '../UI'

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

				<h3 className="text-lg font-bold">Scenario</h3>

				<LiveForm.Field name="openingSavings" label="Opening Savings" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="propertyPrice" label="Property Price" input={{ Tag: InputNumber, prefix: '£' }} />
				<div>
					<LiveForm.Field name="houseMaintenancePercentage" label="House Upkeep" input={{ Tag: InputPercent }} />
					<div className="text-sm text-gray-500 text-right">
						£{Math.round(value.propertyPrice * value.houseMaintenancePercentage / 12)} / month
					</div>
				</div>
				<LiveForm.Field name="freeCashFlow" label="Free Cash Flow" input={{ Tag: InputNumber, prefix: '£' }} />
				<LiveForm.Field name="inflationRate" label="Inflation Rate" input={{ Tag: InputPercent }} />
				<div>
					<LiveForm.Field name="equivalentRent" label="Equivalent Rent" input={{ Tag: InputNumber, prefix: '£' }} />
					<div className="text-sm text-gray-500 text-right">
						Savings: £{Math.round(value.freeCashFlow - value.equivalentRent)} / month
					</div>
				</div>

				<h3 className="text-lg font-bold">Investment<br />Returns</h3>
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