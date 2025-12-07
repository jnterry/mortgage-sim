import React from 'react';
import Field from './Field';

const Context = React.createContext();

export default function LiveForm({
	value,
	setValue,
	...rest
}) {

	const ctx = {
		value,
		setValue,
	}

	return (
		<Context.Provider value={ctx}>
			<form {...rest} onSubmit={() => { }}>
			</form>
		</Context.Provider>
	)
}

function LiveField({ name, input, ...rest }) {
	const ctx = React.useContext(Context);

	const { Tag, ...inputProps } = input

	return (
		<Field {...rest}>
			<Tag
				{...inputProps}
				value={ctx.value[name]}
				setValue={(arg) => ctx.setValue(old => ({ ...old, [name]: typeof arg === 'function' ? arg(old[name]) : arg }))}
			/>
		</Field>
	)
}
LiveForm.Field = LiveField;

function SubObject({ name, children }) {
	const parentCtx = React.useContext(Context);

	const ctx = React.useMemo(() => {
		return {
			value: parentCtx.value?.[name] || null,
			setValue: (arg) => parentCtx.setValue(old => ({ ...old, [name]: typeof arg === 'function' ? arg(old[name] || {}) : arg })),
		}
	}, [name, parentCtx.value, parentCtx.setValue])


	return (
		<Context.Provider value={ctx}>
			{children}
		</Context.Provider>
	)
}
LiveForm.SubObject = SubObject;