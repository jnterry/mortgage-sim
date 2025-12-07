/**
 * Renders a Button with common classNames pre-set based on variant and size prop
 */

import React from 'react'

const VAR_CLASS = {
	primary:
		'bg-primary-500 border-none normal-case text-white hover:bg-primary-500 font-lato font-500 disabled:text-white disabled:bg-light-400',
	secondary:
		'min-h-0 h-9 px-3 flex items-center bg-primary-100 border-none normal-case text-sm font-lato font-700 text-primary-600 rounded-24xl hover:bg-primary-100',
	white:
		'bg-white border border-light-200 border-solid focus:bg-primary-100 text-primary-500 disabled:grayscale disabled:bg-white disabled:text-light-200 hover:bg-primary-100 hover:border-primary-500 hover:ring-transparent normal-case gap-2',
	error: 'bg-error-50 border border-error-50 border-solid focus:bg-error-50 text-error-600 disabled:error-600 disabled:bg-error-50 hover:bg-error-50 hover:border-error-50 normal-case',

	// disables adding any extra classes, instead relying on className prop
	custom: '',

	// disables adding any extra classes, and also disables the common 'btn' related classes
	text: '',
}

const SIZE_CLASS = {
	small: 'min-h-0 h-8 px-3 text-sm',
	normal: 'min-h-0 h-9 px-5',
	large: 'min-h-0 h-10 px-5',
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof VAR_CLASS
	size?: keyof typeof SIZE_CLASS
	className?: string
	disabled?: boolean
	children: React.ReactNode
	type?: 'button' | 'submit' | 'reset'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	/**
	 * Renders a button with common styling for app
	 */
	function Button(
		{
			variant = 'primary',
			size = 'normal',
			className = '',
			disabled = false,
			children,
			type = 'button',
			...rest
		}: ButtonProps,
		ref
	) {
		const _class = `cursor-pointer ${variant !== 'text' ? `button button-${variant} flex items-center rounded-24xl` : ''
			} ${VAR_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`

		return (
			<button
				ref={ref}
				disabled={disabled}
				className={_class}
				type={type}
				{...rest}
			>
				{children}
			</button>
		)
	}
)

export { Button as default }