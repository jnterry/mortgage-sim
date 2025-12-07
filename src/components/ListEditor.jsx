import React from 'react'
import { Button } from './UI'

export default function ListEditor({ value, setValue, FormRenderer, formProps = {} }) {
	const [selectedId, setSelectedId] = React.useState(null);

	const selected = value.find((strategy) => strategy.id === selectedId);

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="border-r-solid border-gray-500 border-r-2 overflow-y-auto">
				{value.map((item) => (
					<div
						key={item.id}
						onClick={() => setSelectedId(item.id)}
						className={`cursor-pointer select-none p-2 ${selectedId === item.id ? 'bg-blue-500 text-white' : ''}`}
					>
						{item.name}
					</div>
				))}
			</div>
			{selected ? (
				<div>
					<div className="flex justify-end">
						<Button
							variant="secondary"
							size="small"
							onClick={() => {
								const newId = `${Math.random().toString(36).substring(2, 15)}`;
								setValue(old => [...old, { ...selected, name: `${selected.name} Copy`, id: newId }])
								setSelectedId(newId);
							}}
						>
							Clone
						</Button>
						<Button
							variant="error"
							onClick={() => {
								setValue(old => old.filter(s => s.id !== selected.id))
							}}>
							Del
						</Button>
						<Button
							variant="secondary"
							onClick={() => setSelectedId(null)}
						>
							Close
						</Button>
					</div>
					<FormRenderer
						value={selected}
						setValue={v => setValue(value.map(s => s.id === selected.id ? v : s))}
						{...formProps}
					/>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-full">
					<p className="text-gray-500">Select an item to edit</p>
				</div>
			)}
		</div>
	)
}