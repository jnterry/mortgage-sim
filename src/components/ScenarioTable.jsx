import React from 'react'
import { Table, Button, ListSelect } from './UI'
import { getPortfolioTotal } from '../lib/simcore'
import { useAppContext } from '../AppContext'

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

export default function ScenarioTable() {
	const ctx = useAppContext();

	const investStratList = ctx.data.investmentStrategies.map(s => ({ value: s.id, label: s.name }));
	const mortgageList = ctx.data.mortgages.map(m => ({ value: m.id, label: m.name }));

	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Header rowSpan={2} thickRight>Year</Table.Header>
					<Table.Header rowSpan={2} thickLeft thickRight>
						<label className="cursor-pointer">
							Infl
							<br />
							<input type="checkbox" checked={ctx.displayReal.value} onChange={() => ctx.displayReal.set(old => !old)} />
						</label>
					</Table.Header>
					<Table.Header rowSpan={2} thickLeft className="min-w-[100px]">Est<br />House<br />Worth</Table.Header>
					<Table.Header rowSpan={2} thickLeft>
						<div className="flex flex-col gap-1 p-1 max-w-[160px]">
							<div className="text-sm font-bold">No Mortgage</div>
							<ListSelect
								value={ctx.baselineStrategy.id}
								setValue={ctx.baselineStrategy.set}
								list={investStratList}
								placeholder="Select Strategy"
								size="sm"
							/>
						</div>
					</Table.Header>
					{ctx.scenarios.items.map((scenario) => {
						return (
							<React.Fragment key={scenario.id}>
								<Table.Header colSpan={4} thickLeft thickRight>
									<div className="flex flex-col gap-1 p-1">
										<div className="flex items-center gap-1">
											<div>

												<ListSelect
													value={scenario.strategy.id}
													setValue={(val) => ctx.scenarios.update(scenario.id, { investmentStrategyId: val })}
													list={investStratList}
													placeholder="Strategy"
													size="sm"
													className="block flex-1"
												/>
												<ListSelect
													value={scenario.mortgage.id}
													setValue={(val) => ctx.scenarios.update(scenario.id, { mortgageId: val })}
													list={mortgageList}
													placeholder="Mortgage"
													size="sm"
													className="block flex-1"
												/>
											</div>
											<div>

												<Button
													variant="secondary"
													size="small"
													onClick={() => ctx.scenarios.view(scenario)}
												>
													View
												</Button>
												<Button
													variant="error"
													size="small"
													onClick={() => ctx.scenarios.remove(scenario.id)}
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
						<Button variant="secondary" size="small" onClick={ctx.scenarios.add}>
							+ Add
						</Button>
					</Table.Header>
				</Table.Row>
				<Table.Row>
					{ctx.scenarios.items.map(scenario => (
						<React.Fragment key={scenario.id}>
							<Table.Header thickLeft className='min-w-[100px]'>Principle</Table.Header>
							<Table.Header className='min-w-[100px]'>Equity</Table.Header>
							<Table.Header className='min-w-[100px]'>Savings</Table.Header>
							<Table.Header className='min-w-[100px]'>Net Worth</Table.Header>
						</React.Fragment>
					))}
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{SIM_INDICIES.map((index) => {
					const inflMult = ctx.displayReal.value ? ctx.computed.inflationMultiples[index] : 1;
					return (
						<Table.Row key={index} inflMult={inflMult}>
							<Table.Cell thickRight>{Math.floor((index) / 12) + 28}</Table.Cell>
							<Table.Cell.Num thickLeft thickRight>{ctx.computed.inflationMultiples[index].toFixed(2)}</Table.Cell.Num>
							<Table.Cell.Pounds thickLeft>
								{ctx.computed.houseWorth[index]}
							</Table.Cell.Pounds>
							{ctx.computed.baseline ? (
								<Table.Cell.Portfolio portfolio={ctx.computed.baseline[index].investments} thickLeft />
							) : (
								<Table.Cell thickLeft>-</Table.Cell>
							)}
							{ctx.scenarios.items.map((scenario, idx) => {
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
					)
				}
				)}
			</Table.Body>
		</Table>
	)
}





