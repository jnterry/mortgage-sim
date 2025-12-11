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

const RowContext = React.createContext({
	inflMult: 1,
});

function TableRow({ children, inflMult = 1 }) {
	return (
		<tr>
			<RowContext.Provider value={{ inflMult }}>
				{children}
			</RowContext.Provider>
		</tr>
	)
}

function TableCell({ children, className = '', thickLeft, thickRight, thickTop, thickBottom, ...props }) {
	const thickClasses = []
	if (thickLeft) thickClasses.push('border-l-2 border-l-black')
	if (thickRight) thickClasses.push('border-r-2 border-r-black')
	if (thickTop) thickClasses.push('border-t-2 border-t-black')
	if (thickBottom) thickClasses.push('border-b-2 border-b-black')

	return (
		<td className={`border border-gray-200 border-solid p-1 ${thickClasses.join(' ')} ${className}`} {...props}>
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

function TableCellPounds({ children, ...props }) {
	const { inflMult } = React.useContext(RowContext);
	// Reformat with commas
	const formattedValue = typeof children === 'number'
		? (children * inflMult).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).split('.')[0]
		: children
	return (
		<TableCell className="text-right" {...props}>
			{formattedValue}
		</TableCell>
	)
}

function formatPounds(value) {
	const str = Number(value).toFixed(2)
	const [whole, decimal] = str.split('.')
	return `£${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function TableCellPortfolio({ portfolio, ...props }) {
	const { inflMult } = React.useContext(RowContext);
	const total = getPortfolioTotal(portfolio) * inflMult;
	const formattedTotal = formatPounds(total)

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
			value: portfolio[ac.key] * inflMult,
			formatted: formatPounds(portfolio[ac.key] * inflMult),
			percentage: (((portfolio[ac.key] * inflMult) / total) * 100).toFixed(1)
		}))
		.sort((a, b) => b.value - a.value)

	return (
		<TableCell className="text-right" {...props}>
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
				<span className={`cursor-pointer underline decoration-dotted ${total < 0 ? 'text-red-500' : ''}`}>{formattedTotal}</span>
			</TriggeredPopover>
		</TableCell>
	)
}

function TableHeader({ children, thickLeft, thickRight, thickTop, thickBottom, className = '', ...props }) {
	const thickClasses = []
	if (thickLeft) thickClasses.push('border-l-2 border-l-black')
	if (thickRight) thickClasses.push('border-r-2 border-r-black')
	if (thickTop) thickClasses.push('border-t-2 border-t-black')
	if (thickBottom) thickClasses.push('border-b-2 border-b-black')

	return (
		<th className={`font-bold bg-gray-200 border border-gray-200 border-solid ${thickClasses.join(' ')} ${className}`} {...props}>
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