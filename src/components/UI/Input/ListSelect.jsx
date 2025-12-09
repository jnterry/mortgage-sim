import React from 'react'
import InputText from './Text'
import { TriggeredPopover } from '../Popover'

// Simple helper functions
function toProperCase(str) {
	if (!str) return ''
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getBgColour(color) {
	// Simple color mapping - can be enhanced if needed
	return color
}

function getTextColour(color) {
	// Simple color mapping - can be enhanced if needed
	return color
}

function triggerBlurWithFormSubmission(ref) {
	if (ref?.current) {
		ref.current.blur()
	}
}

/**
 * Dropdown for selecting from arbitrary list of values
 *
 * @param {object} props
 * @param {string} [props.name] - The name of the input
 * @param {string} [props.id] - The id of the input
 * @param {string} props.value - The value of the input
 * @param {function} props.setValue - The function to set the value of the input
 * @param {string} [props.placeholder] - The placeholder of the input
 * @param {string} [props.error] - The error of the input
 * @param {array} props.list - The list of values to select from with label/value fields
 * @param {boolean} [props.hidden] - Whether the input is hidden
 * @param {string} [props.className] - The class name of the input
 * @param {boolean} [props.readOnly] - Whether the input is read only
 * @param {string} [props.size] - The size of the input
 */
export default function ListSelect({
	name,
	id,
	value,
	setValue,
	placeholder,
	error,
	list,
	hidden,
	className,
	listClassName,
	readOnly,
	size,
	direction = 'bottom',
}) {
	const activeItem = React.useMemo(
		() => list.filter((item) => item.value === value)[0],
		[list, value]
	)

	const refTrigger = React.useRef(null)

	return (
		<TriggeredPopover
			direction={direction}
			content={
				<div
					tabIndex="0"
					className={`w-full overflow-auto menu p-2 bg-white border shadow rounded-box max-h-[165px] z-50`}
				>
					<ul className={listClassName}>
						<ListSelectMenuContent
							list={list}
							setValue={setValue}
							refTrigger={refTrigger}
						/>
					</ul>
				</div>
			}
			disabled={readOnly}
			matchTriggerSize
		>
			<div className="relative">
				<InputText
					ref={refTrigger}
					style={{
						backgroundColor: activeItem?.bg
							? getBgColour(activeItem.bg)
							: undefined,
						color: activeItem?.text
							? getTextColour(activeItem.text)
							: undefined,
					}}
					className={`w-full min-w-[100%] cursor-pointer ${readOnly && 'focus:ring-0 focus:border-light-200'
						} ${className || ''}`}
					readOnly
					value={value ? activeItem?.label || toProperCase(value) : ''}
					error={error}
					placeholder={readOnly ? '' : placeholder}
					size={size}
					autoComplete="off"
					data-lpignore="true"
				/>
				{readOnly ? null : (
					<div
						className={`pointer-events-none absolute top-0 bottom-0 right-1 ${size === 'sm' ? 'mt-[6px]' : 'mt-[10px]'
							} mr-3.5 z-10`}
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
				)}
			</div>
		</TriggeredPopover>
	)
}

export function InlineListSelect({
	list,
	value,
	setValue,
	readOnly,
	placeholder,
	direction,
}) {
	const activeItem = React.useMemo(
		() => list.filter((item) => item.value === value)[0],
		[list, value]
	)

	return (
		<TriggeredPopover
			direction={direction || 'bottom'}
			content={
				<div className="w-full overflow-scroll scrollbar-none dropdown-content menu bg-white border shadow rounded-box max-h-[165px] w-[120px]">
					<ul>
						<ListSelectMenuContent list={list} setValue={setValue} />
					</ul>
				</div>
			}
		>
			<div
				className="cursor-pointer text-primary-500 underline w-full flex flex-row items-center justify-between gap-1"
				tabIndex={0}
			>
				{value
					? activeItem?.label || toProperCase(value)
					: readOnly
						? ''
						: placeholder}
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		</TriggeredPopover>
	)
}

ListSelect.MenuContent = ListSelectMenuContent

/**
 * Renders the list of items for the ListSelect component (ie - content of the dropdown)
 * @param {object} props
 * @param {array} props.list - items to render, objects of the form { value, label }
 * @param {function} props.setValue - function to set the value of the input
 * @param {React.RefObject} [props.refTrigger] - optional ref that is the trigger element and gets blurred when an item is selected to trigger form submission
 * @returns
 */
export function ListSelectMenuContent({ list, setValue, refTrigger }) {
	let toShow = list.filter((t) => !t.hidden)

	return (
		<>
			{toShow.map((type) => (
				<li
					style={{
						color: type.text ? getTextColour(type.text) : undefined,
						backgroundColor: type.bg ? getBgColour(type.bg) : undefined,
					}}
					className={
						type.disabled
							? 'cursor-not-allowed text-light-500'
							: 'cursor-pointer hover:bg-light-100'
					}
					onClick={(e) => {
						if (type.disabled) return
						setValue(type.value)
						// When this is inside a TableFormRow the blur event needs to propogate up to the parent
						// This doesnt work correctly by default sinc the content is rendered inside a popover which
						// uses a portal to render outside the standard DOM hierarchy
						// We therefore artifically focus the trigger element (inside the form) and blur it instead
						let target = refTrigger?.current || document.activeElement
						if (document.activeElement !== refTrigger?.current) {
							target.focus()
						}
						triggerBlurWithFormSubmission({ current: target })
					}}
					key={type.value}
				>
					<p>{type?.label || toProperCase(type.value)}</p>
				</li>
			))}
			{toShow.length === 0 ? (
				<li className="text-light-600 text-center cursor-not-allowed p-3">
					No options available
				</li>
			) : null}
		</>
	)
}
