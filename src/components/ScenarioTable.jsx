import React from 'react'
import { Table, Button, ListSelect } from './UI'
import { getPortfolioTotal } from '../lib/simcore'
import { useAppContext } from '../AppContext'

export default function ScenarioTable() {
	const ctx = useAppContext();
	const SIM_INDICIES = new Array(ctx.data.globalAssumptions.simulationYears).fill(0).map((_, i) => i * 12)

	const investStratList = ctx.data.investmentStrategies.map(s => ({ value: s.id, label: s.name }));
	const mortgageList = ctx.data.mortgages.map(m => ({ value: m.id, label: m.name }));

	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Header rowSpan={2} thickRight>Age</Table.Header>
					<Table.Header rowSpan={2} thickLeft>
						<label className="cursor-pointer">
							Infl
							<br />
							<input type="checkbox" checked={ctx.displayReal.value} onChange={() => ctx.displayReal.set(old => !old)} />
						</label>
					</Table.Header>
					<Table.Header rowSpan={2} thickRight className="min-w-[100px]">Est<br />House<br />Worth</Table.Header>
					<Table.Header rowSpan={2} thickLeft className="min-w-[80px]">Income</Table.Header>
					<Table.Header rowSpan={2} className="min-w-[80px]">Expenses</Table.Header>
					<Table.Header rowSpan={2} className="min-w-[80px]" thickRight>Net</Table.Header>
					<Table.Header colSpan={2} thickLeft thickRight>
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
								<Table.Header colSpan={5} thickLeft thickRight>
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
					<Table.Header thickLeft>Save Flow</Table.Header>
					<Table.Header thickRight>Net<br />Worth</Table.Header>
					{ctx.scenarios.items.map(scenario => (
						<React.Fragment key={scenario.id}>
							<Table.Header thickLeft className='min-w-[100px]'>Principle</Table.Header>
							<Table.Header className='min-w-[100px]'>Equity</Table.Header>
							<Table.Header className='min-w-[100px]'>Save<br />Flow</Table.Header>
							<Table.Header className='min-w-[100px]'>Savings</Table.Header>
							<Table.Header className='min-w-[100px]'>Net<br />Worth</Table.Header>
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
							<Table.Cell.Num thickLeft>{ctx.computed.inflationMultiples[index].toFixed(2)}</Table.Cell.Num>
							<Table.Cell.Pounds thickRight>
								{ctx.computed.houseWorth[index]}
							</Table.Cell.Pounds>
							<Table.Cell.Pounds thickLeft>{ctx.computed.pnl[index].income}</Table.Cell.Pounds>
							<Table.Cell.Pounds >{ctx.computed.pnl[index].expenses}</Table.Cell.Pounds>
							<Table.Cell.Pounds thickRight>{ctx.computed.pnl[index].income - ctx.computed.pnl[index].expenses}</Table.Cell.Pounds>
							{ctx.computed.baseline ? (
								<>
									<Table.Cell.Pounds thickLeft>{ctx.computed.baseline[index].savingsFlow}</Table.Cell.Pounds>
									<Table.Cell.Portfolio portfolio={ctx.computed.baseline[index].investments} thickRight />
								</>
							) : (
									<>
										<Table.Cell thickLeft>-</Table.Cell>
										<Table.Cell thickLeft>-</Table.Cell>
									</>
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
										<Table.Cell.Pounds>{row.savingsFlow}</Table.Cell.Pounds>
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





