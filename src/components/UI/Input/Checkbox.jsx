import React, { useRef } from 'react'

const RawCheckbox = React.forwardRef(function RawCheckbox(
	{ className, size, style, ...rest },
	ref
) {
	return (
		<input
			ref={ref}
			type="checkbox"
			className={`${size === 'sm'
				? 'w-4 h-4 min-w-4 min-h-4 rounded-sm'
				: 'w-6 h-6 min-w-6 min-h-6 rounded-25xl'
				} flex m-auto border-2 border-light-300 checkbox-primary checkbox focus:ring-4 focus:ring-primary-300 flex-shrink ${className}`}
			style={{
				...(style || {}),
				backgroundSize: '85%',
			}}
			{...rest}
		/>
	)
})

/**
 * @param {Object} props
 * @param {boolean} props.value
 * @param {Function} props.setValue
 * @param {string} [props.className]
 * @param {string} [props.labelClassName]
 * @param {string} [props.label]
 * @param {boolean} [props.readOnly]
 * @param {boolean} [props.noBlur]
 * @param {'sm' | 'base'} [props.size]
 */
export default function InputCheckbox({
	value,
	setValue,
	className = '',
	labelClassName = '',
	label,
	readOnly,
	noBlur,
	...rest
}) {
	const refInput = useRef()

	const elm = (
		<RawCheckbox
			ref={refInput}
			className={className}
			checked={value || false}
			disabled={readOnly}
			onChange={() => {
				setValue(!value)
				if (!noBlur) {
					window.activeElement.blur()
				}
			}}
			{...rest}
		/>
	)

	if (label) {
		return (
			<label
				className={`flex flex-row gap-2 ${rest.disabled || readOnly ? '' : 'cursor-pointer'
					} ${labelClassName}`}
				tabIndex={0}
			>
				{elm}
				<span className="leading-8 flex-grow select-none">{label}</span>
			</label>
		)
	}

	return elm
}

InputCheckbox.RawCheckbox = RawCheckbox