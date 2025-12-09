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
Table.Header = TableHeader;

export default Table;