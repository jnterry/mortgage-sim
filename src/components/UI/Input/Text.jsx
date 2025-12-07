import React from 'react'

const InputText = React.forwardRef(
	/**
	 * Renders a native <input> tag, defaulting to type="text"
	 *
	 * Applies custom classes for consistent styling, if error props is passed
	 * and truthy, will attach additional classes to render with red outline
	 * Note that the error message is NOT actually rendered - that is the
	 * responsiblity of the <Field> which wraps this input
	 *
	 * @param {Object} props - Component props
	 * @param {Function} props.setValue - Function to set the value of the input
	 * @param {string} [props.value] - Value of the input
	 * @param {string} [props.type] - Type of the input passed through to the <input> tag
	 * @param {boolean} [props.error] - Whether the input has an error
	 * @param {string} [props.className] - Extra classes to apply to the input
	 * @param {string} [props.containerClassName] - Extra classes to apply to the container
	 * @param {string} [props.size] - Size of the input
	 * @param {boolean} [props.readOnly] - Whether the input is read only
	 * @param {string} [props.placeholder] - Placeholder text for the input
	 * @param {boolean} [props.darkPlaceholder] - Whether the placeholder should be dark rather than light, to match standard text color
	 * @param {Object} [props.rest] - Additional props to pass to the <input> tag
	 */
	function InputText(
		{
			setValue,
			type = 'text',
			error,
			className = '',
			containerClassName = '',
			value,
			style = {},
			readOnly,
			size = 'base',
			darkPlaceholder = false,
			prefix,
			suffix,
			...rest
		},
		ref
	) {
		// basic styling applied to all inputs
		// (do we need to pass in a 'variant' prop and vary this?)
		let classes = ''
		if (darkPlaceholder) {
			classes += 'placeholder:text-black'
		} else {
			classes += 'placeholder:text-light-500'
		}
		classes +=
			' placeholder:text-sm text-base text-light-900 focus:outline-none block w-full disabled:text-black'

		// Add in extra classes for error indication, or if user is passing in a className prop
		if (error) {
			classes += ` border-error-500 border-[1.5px]`
			if (!darkPlaceholder) {
				classes += ' placeholder:text-light-700'
			}
		}
		if (readOnly) {
			classes += ' cursor-default'
		}
		classes += ' ' + className

		const sizeClasses = {
			base: 'h-[32px] py-[4px] ',
			sm: 'h-[24px] py-[2px]',
		}[size]
		classes += ' ' + sizeClasses

		return (
			<div className={`relative flex flex-row items-center gap-0 border-gray-300 hover:not-focus-within:border-gray-500 focus-within:border-gray-900 border-2 rounded-lg focus-within:border-primary-600 g ${containerClassName}`}>
				{error && <div className="text-error-500 px-2">⚠</div>}
				{prefix && <div className="pl-2">{prefix}</div>}
				<input
					ref={ref}
					style={style}
					className={classes}
					type={type}
					onChange={(e) => setValue(e.target.value)}
					value={
						// When type = number, we want to allow 0 as a value! Otherwise, falsey values
						// are changed to empty string - so we don't get errors about switching from
						// uncontrolled to controlled component
						type === 'number' && value === 0 ? value : value || ''
					}
					readOnly={readOnly}
					{...rest}
				/>
				{suffix && <div className="pr-2">{suffix}</div>}
			</div>
		)
	}
)

export default InputText