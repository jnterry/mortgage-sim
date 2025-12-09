import React from 'react'
import { TriggeredPopover } from './Popover'
import { getPortfolioTotal } from '../../lib/simcore'

export function Table({ children }) {
	return (
		<table className="table-auto">
			{children}
		</table>
	)
}

function TableHead({ children }) {
	return (
		<thead>
			{children}
		</thead>
	)
}

function TableBody({ children }) {
	return (
		<tbody>
			{children}
		</tbody>
	)
}

function TableRow({ children }) {
	return (
		<tr>
			{children}
		</tr>
	)
}

function TableCell({ children, className = '' }) {
	return (
		<td className={`border border-gray-200 border-solid p-1 ${className}`}>
			{children}
		</td>
	)
}

function TableCellNumber({ children }) {
	return (
		<TableCell className="text-right">
			{children}
		</TableCell>
	)
}

function TableCellPounds({ children }) {
	// Reformat with commas
	return (
		<TableCell className="text-right">
			{children.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).split('.')[0]}
		</TableCell>
	)
}

function TableCellPortfolio({ portfolio }) {
	const total = getPortfolioTotal(portfolio)
	const formattedTotal = total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).split('.')[0]

	const assetClasses = [
		{ key: 'cash', label: 'Cash' },
		{ key: 'stocks', label: 'Stocks' },
		{ key: 'crypto', label: 'Crypto' },
		{ key: 'gold', label: 'Gold' },
		{ key: 'bonds', label: 'Bonds' },
		{ key: 'realEstate', label: 'Real Estate' },
	]

	const breakdown = assetClasses
		.filter(ac => portfolio[ac.key] > 0)
		.map(ac => ({
			...ac,
			value: portfolio[ac.key],
			formatted: portfolio[ac.key].toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).split('.')[0],
			percentage: ((portfolio[ac.key] / total) * 100).toFixed(1)
		}))
		.sort((a, b) => b.value - a.value)

	return (
		<TableCell className="text-right">
			<TriggeredPopover
				content={
					<div className="p-2 bg-white border border-gray-300 rounded shadow-lg min-w-[200px]">
						<div className="font-bold mb-2">Portfolio Breakdown</div>
						<div className="space-y-1 text-sm">
							{breakdown.map(ac => (
								<div key={ac.key} className="flex justify-between">
									<span>{ac.label}:</span>
									<span className="ml-4">{ac.formatted} ({ac.percentage}%)</span>
								</div>
							))}
						</div>
					</div>
				}
			>
				<span className="cursor-pointer underline decoration-dotted">{formattedTotal}</span>
			</TriggeredPopover>
		</TableCell>
	)
}

function TableHeader({ children }) {
	return (
		<th className="font-bold bg-gray-200">
			{children}
		</th>
	)
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Cell.Num = TableCellNumber;
Table.Cell.Pounds = TableCellPounds;
Table.Cell.Portfolio = TableCellPortfolio;
Table.Header = TableHeader;

export default Table;