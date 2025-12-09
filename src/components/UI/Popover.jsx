/**
 * Renders a tooltip on mouseover
 */

import React from 'react'
import ReactDOM from 'react-dom'
import './Popover.scss'

/**
 * @typedef {Object} PopoverProps
 * Props to the <Popover> react component
 *
 * @property {React.ReactNode} content - The content within the popover
 * @property {boolean} shown - If true, the popover's content is visible
 * @property {React.ReactNode} children - The elements overwhich the tooltip is drawn
 * @property {React.RefObject} [refPopover] - Reference attached to outermost popover element
 * @property {('top' | 'bottom' | 'left' | 'right' | Array<'top'|'bottom'|'left'|'right'>)} [direction]
 *  Location (relative to the component the tooltip is over) to draw the tooltip at
 * Can be one of: top, bottom, left, right
 *
 * Can optionally pass in an array of permissible directions, and then specify a
 * `directionCriteria` in order to automatically pick a direction
 * @property {'start' | 'center'} [alignment]
 * Alignment of the popover content relative to children along the axis
 * implied by direction
 *
 * Defaults to center, such that the center of the popover content is in line
 * with the center of the children (or anchor)
 * Can also be set to 'start' (so on bottom/top directions, we align the
 * left most corners, and up left/right directions, we align the top most corners)
 * @property {'maximize-height' | 'maximize-width' | undefined} [directionCriteria]
 * If set, then an array of directions must be passed in for `direction`, and this parameter
 * controls how a direction is picked
 *
 * Permissible values: 'maximize-height', 'maximize-width'
 * @property {'move' | 'shrink' | 'none'} [clipY]
 * Behaviour to use when the popover content does not fit in y direction
 *
 * Allowed values:
 * move   - reposition the content up or down so it can fit on screen
 * shrink - Decrease height of popover content so it fits on screen without moving, useful
 *          if element is scrollable anyway
 * none   - allow the element to fall off edge of screen
 * @property {number} [screenMargin]
 * Margin (in pixels) around the edge of the screen to leave when performing clipping of the
 * popover content which would otherwise fall off the screen
 * @property {object} [anchor]
 * x,y position of the menu
 * If not set, will be placed on specified side of the children elements
 * @property {string} [margin]
 * Gap between the element (or anchor) and the content
 * @property {string} [tag]
 * Type of outermost tag to render, defaults to 'div'
 * @property {object} [contentWrapperStyles]
 * Additional styles to apply to the popover's content wrapper div
 * @property {boolean} [shown]
 * If true, the popover's content is visible
 */

/**
 * @type {React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<any>>}
 */
export const Popover = React.forwardRef(
	/**
	 * @param {PopoverProps} props
	 */
	function Popover(
		{
			content,
			shown,
			children,
			refPopover,
			direction = 'right',
			alignment = 'center',
			directionCriteria = null,
			clipY = 'move',
			screenMargin = 5,
			anchor = null,
			margin = '0px',
			tag = 'div',
			contentWrapperStyles,
			matchTriggerSize = false,
			/**
			 * Catch all for other attributes
			 * These get passed through to the trigger element
			 */
			...otherProps
		},
		ref
	) {
		const _elm_trigger_internal = React.useRef(null)
		const elm_trigger = ref || _elm_trigger_internal
		const _elm_popover_internal = React.useRef(null)
		const elm_popover = refPopover || _elm_popover_internal

		// compute the desired position based upon direction and anchor
		const [pos, renderedDirection] = React.useMemo(() => {
			if (anchor) {
				return [anchor, direction]
			}

			let c = elm_trigger.current

			if (!c) {
				return [{ x: 50, y: 50 }, direction]
			}

			const r = c.getBoundingClientRect()

			// position and size of the trigger element
			let x = r.left
			let y = r.top
			let h = r.height
			let w = r.width

			let renderedDirection = direction
			if (directionCriteria) {
				let bestScore = 0
				switch (directionCriteria) {
					case 'maximize-height': {
						let score = 0
						for (let d of direction) {
							if (d === 'left' || d === 'right') {
								score = screenBounds.y
							} else if (d === 'top') {
								// from top of screen (0) to top y pos of the trigger
								score = y
							} else {
								// from bottom of screen to bottom of the trigger
								score = window.innerHeight - (y + h)
							}
							if (score > bestScore) {
								bestScore = score
								renderedDirection = d
							}
						}
						break
					}
					case 'maximize-width': {
						let score = 0
						for (let d of direction) {
							if (d === 'top' || d === 'bottom') {
								score = screenBounds.x
							} else if (d === 'left') {
								// from left of screen (0) to left x pos of the trigger
								score = x
							} else {
								// from right of screen to right x pos of the trigger
								score = window.innerWidth - (x + w)
							}
							if (score > bestScore) {
								bestScore = score
								renderedDirection = d
							}
						}
						break
					}
					default:
						console.warn(
							`Invalid popover directionCriteria: ` + directionCriteria
						)
						renderedDirection = direction[0]
						break
				}
			}

			const offset = { x: 0, y: 0 }
			if (alignment === 'center') {
				offset.x = w / 2
				offset.y = h / 2
			}
			switch (renderedDirection) {
				default:
					// this shouldn't happen... if it does, fall trough to another c case
					console.warn(`Invalid popover direction ${direction}, using default`)
				case 'right':
					return [{ x: x + w, y: y + offset.y }, 'right']
				case 'left':
					return [{ x: x, y: y + offset.y }, 'left']
				case 'top':
					return [{ x: x + offset.x, y: y }, 'top']
				case 'bottom':
					return [{ x: x + offset.x, y: y + h }, 'bottom']
			}
		}, [anchor, elm_trigger.current, direction, shown, alignment])

		// compute the final position by shifiting it to ensure that the content
		// does not fall off the edge of the page
		const [clippedPos, extraStyles] = React.useMemo(() => {
			if (!elm_popover.current || typeof window === undefined) {
				return [null, {}]
			}

			let result = { ...pos }

			let size = {
				x: elm_popover.current.clientWidth,
				y: elm_popover.current.clientHeight,
			}
			let bounds = { x: window.innerWidth, y: window.innerHeight }

			// compute the max offset in each direction from pos that the element occupies
			let offsets = {}
			let contentAnchor = { x: 0, y: 0 }
			if (alignment === 'center') {
				contentAnchor = { x: size.x / 2, y: size.y / 2 }
			}
			switch (renderedDirection) {
				case 'top':
					offsets = {
						top: size.y,
						bottom: 0,
						left: contentAnchor.x - size.x / 2,
						right: contentAnchor.x + size.x / 2,
					}
					break
				case 'bottom':
					offsets = {
						top: 0,
						bottom: size.y,
						left: contentAnchor.x - size.x / 2,
						right: contentAnchor.x + size.x / 2,
					}
					break
				case 'left':
					offsets = {
						top: contentAnchor.y - size.y / 2,
						bottom: contentAnchor.y + size.y / 2,
						left: size.x,
						right: 0,
					}
					break
				case 'right':
					offsets = {
						top: contentAnchor.y - size.y / 2,
						bottom: contentAnchor.y + size.y / 2,
						left: 0,
						right: size.x,
					}
					break
				default:
					break
			}

			let extraStyles = {}

			if (pos.x + offsets.right > bounds.x) {
				result.x = bounds.x - offsets.right
			} else if (pos.x - offsets.left < 0) {
				result.x = offsets.left
			}

			switch (clipY) {
				case 'move':
					if (pos.y + offsets.bottom > bounds.y) {
						result.y = bounds.y - offsets.bottom
					} else if (pos.y - offsets.top < 0) {
						result.y = offsets.top
					}
					break
				case 'shrink': {
					let topH = offsets.top
					let bottomH = offsets.bottom
					let shrinkRequired = false

					if (pos.y + offsets.bottom > bounds.y) {
						shrinkRequired = true
						bottomH = bounds.y - pos.y - screenMargin
					}

					if (pos.y - offsets.top < 0) {
						shrinkRequired = true
						topH = pos.y - screenMargin
					}

					if (shrinkRequired) {
						let h = topH + bottomH
						extraStyles.height = `${h}px`
						extraStyles.minHeight = `${h}px`
					}
					break
				}
				case 'maximize-width': {
					let score = 0
					for (let d of direction) {
						if (d === 'top' || d === 'bottom') {
							score = screenBounds.x
						} else if (d === 'left') {
							// from left of screen (0) to left x pos of the trigger
							score = x
						} else {
							// from right of screen to right of the trigger
							score = window.innerWidth - (x + w)
						}
						if (score > bestScore) {
							bestScore = score
							renderedDirection = d
						}
					}
					break
				}
				default:
					// do nothing...
					break
			}

			return [result, extraStyles]
		}, [pos, renderedDirection, elm_popover, elm_popover.current])

		const posFinal = clippedPos || pos

		let _children = React.cloneElement(React.Children.only(children), {
			// if user doesn't specify a pointerup listener, just stop propagation
			// as pointerup on window is used to close a <DropDown> menu
			onPointerUp: (e) => {
				e.stopPropagation()
			},
			...otherProps,
			ref: elm_trigger,
		})

		const _content = React.useMemo(() => {
			if (!content) {
				return null
			}

			let props = {
				style: { ...(content.props.style || {}), ...extraStyles },
			}

			// Attach trigger size variables to the content element - this is useful to
			// allow the popover content to match the width/height of its trigger
			// (we used to add these as seperate props rather than css variables... dont
			// be tempted to revert to that! Its impossible to detect cases where we
			// pass in a react component as the content that spreads the 'rest' of its
			// props  into the native dom element - which will cause react to complain
			// we're adding unknown attributes to native dom elements! (detecting native
			// dom elements is fine with just typeof content === 'string' (eg: 'div')) -
			// the {...rest} case its whats hard to detect)
			let triggerSize = { x: 0, y: 0 }
			if (elm_trigger.current) {
				const r = elm_trigger.current.getBoundingClientRect()
				triggerSize = { x: r.width, y: r.height }
			}
			props.style['--trigger-size-x'] = Math.round(triggerSize.x) + 'px'
			props.style['--trigger-size-y'] = Math.round(triggerSize.y) + 'px'

			return React.cloneElement(content, props)
		}, [content, elm_trigger])

		// Put the popover content in a portal such that it gets rendered as a direct child of <body>
		// rather than at the current location
		//
		// This is vital for:
		// 1. Fixed positioning working inside of complex elements (like a react-window)
		// 2. Styles of popover content are not affected by ancestor components
		// 3. z-index cannot be defeated by parent's stacking context
		//
		// Note that document.body doesn't work in SSR -> hence we have to useClientOnly
		// to ensure we only render this on the client
		let popoutContent =
			typeof window !== 'undefined' &&
			_content &&
			ReactDOM.createPortal(
				<div
					pb-popover={`${renderedDirection} ${shown ? 'visible' : ''} ${matchTriggerSize ? 'match-trigger-size' : ''
						} alignment-${alignment}`}
					style={{
						'--margin': margin,
						'--tx': `${posFinal.x}px`,
						'--ty': `${posFinal.y}px`,
						...extraStyles,
						...contentWrapperStyles,
					}}
					ref={elm_popover}
				>
					{_content}
				</div>,
				document.body
			)

		// NOTE! It is very important that we do not introduce extra wrappers/dom nodes, since
		// children of this component are the trigger for the popover, and wrapper elements will
		// break their styling when using complex hierachical css selectors
		return (
			<>
				{_children}
				{popoutContent}
			</>
		)
	}
)

const TOOLTIP_VARIANTS = {
	default:
		'bg-white text-gray-800 border border border-solid rounded-27xl p-1 shadow-xl',
	red: 'bg-red-200 text-red-700 border border border-solid rounded-27xl p-1 shadow-xl',
}

export const TriggeredPopover = React.forwardRef(
	/**
	 * @param {object} props
	 * @param {React.ReactNode} props.children
	 * @param {boolean} [props.shown]
	 * @param {React.RefObject} [props.refPopover]
	 * @param {React.ReactNode} props.content
	 * @param {string} [props.direction]
	 * @param {boolean} [props.disabled] -  If set, wont open on click on children
	 */
	function TriggeredPopover(
		{ children, shown, refPopover, content, disabled, ...props },
		ref
	) {
		const [internalShown, setShown] = React.useState(false)

		const _refPopoverInternal = React.useRef(null)
		const _refPopover = refPopover || _refPopoverInternal

		const onBlur = React.useCallback(
			function onBlur(e) {
				let cur = e.relatedTarget
				while (cur && cur !== document.body) {
					if (cur === _refPopover.current) {
						return
					}
					cur = cur.parentElement
				}
				setShown(false)
			},
			[_refPopover]
		)

		React.useEffect(() => {
			if (!internalShown) return

			// Close the popover on escape
			function handleKeyDown(e) {
				if (e.key === 'Escape') {
					setShown(false)
				}
			}

			// Allow scrolling within the popover content, but scrolling other elements
			// should close the popover
			function handleMouseWheel(e) {
				let cur = e.target
				while (cur && cur !== document.body) {
					if (cur === _refPopover.current) {
						return
					}
					cur = cur.parentElement
				}
				setShown(false)
			}

			window.addEventListener('keydown', handleKeyDown)
			window.addEventListener('wheel', handleMouseWheel)
			window.addEventListener('focusout', onBlur)

			return () => {
				window.removeEventListener('keydown', handleKeyDown)
				window.removeEventListener('wheel', handleMouseWheel)
				window.removeEventListener('focusout', onBlur)
			}
		}, [internalShown])

		const randid = React.useId()

		return (
			<Popover
				{...props}
				shown={shown || internalShown}
				ref={ref}
				refPopover={_refPopover}
				content={React.cloneElement(content, {
					tabIndex: 0,
					onBlur,
				})}
			>
				{React.cloneElement(children, {
					tabIndex: 0,
					onFocus: () => {
						if (disabled) return
						setShown((old) => true)
					},
					onBlur,
				})}
			</Popover>
		)
	}
)

// We need to forward ref and attach to the 'children' (which is the anchor element
// around which dropmenu is rendered) so that we can place both a DropDown and Tooltip
// around the same trigger, and regardless of dom hierahcy order, both Popover's
// will get a ref to the actual trigger children

export const Tooltip = React.forwardRef(
	/**
	 * Renders a tooltip with a delay and optional content
	 *
	 * @param {Object} props - Component props
	 * @param {React.ReactNode | string} [props.content] - The content within the tooltip. Can be a string, or a react component
	 * @param {boolean} [props.shown] - If true, forces the tooltip to be shown
	 * @param {boolean} [props.hover] - Whether the tooltip is shown on hover
	 * @param {boolean} [props.track] - Whether the tooltip follows mouse while opened
	 * @param {string} [props.direction] - Direction of the tooltip
	 * @param {string} [props.margin] - Margin of the tooltip
	 * @param {string} [props.variant] - Variant of the tooltip
	 * @param {Object} [props.rest] - Additional props to pass to the tooltip
	 * @param {number} [props.delay] - Delay (in ms) which the user must hover over the tooltip for before it is shown
	 * @param {React.ReactNode} [props.children] - The trigger overwhich the tooltip is drawn
	 */
	function Tooltip(
		{
			content,
			shown,

			/**
			 * Delay (in ms) which the user must hover over the tooltip for before it
			 * is shown
			 * Defaults to 0, set to true to use a default delay, or set to ms number
			 */
			delay = 0,

			/**
			 * The elements overwhich the tooltip is drawn
			 */
			children,

			/**
			 * Location (relative to the component the tooltip is over) to draw the tooltip at
			 */
			direction = 'right',

			/**
			 * Whether the tooltip is affected by hovering over it
			 * Setting to false can be useful if tooltip visiblity is controlled by an external
			 * factor, such as clicking a button to show it
			 */
			hover = true,

			/**
			 * If true, then the position of the tooltip tracks the mouse, rather than being fixed relative
			 * to the component
			 */
			track = false,

			/**
			 * Gap between the element and the tooltip
			 */
			margin = track ? '20px' : '10px',

			variant = 'default',
		},
		ref
	) {
		// setup state variables
		const [active, setActive] = React.useState(false)
		const [toggled, setToggled] = React.useState(false)
		const timeout = React.useRef(null)
		const [pos, setPos] = React.useState(null)

		const onPointerEnter = React.useMemo(() => {
			if (!hover) {
				return null
			}

			return (e) => {
				if (e.pointerType !== 'mouse') {
					return
				}
				timeout.current = setTimeout(
					() => setActive(true),
					delay === true ? 500 : delay
				)
			}
		}, [hover, track])

		const onPointerLeave = React.useMemo(() => {
			if (!hover) {
				return null
			}

			return (e) => {
				if (e.pointerType !== 'mouse') {
					return
				}
				if (timeout.current) {
					clearInterval(timeout.current)
					timeout.current = null
				}
				setActive(false)
			}
		})

		const onPointerMove = React.useMemo(() => {
			if (track) {
				return (e) => {
					if (e.pointerType !== 'mouse') {
						return
					}
					setPos({ x: e.clientX, y: e.clientY })
				}
			} else {
				return null
			}
		})

		const triggerId = React.useId()
		let tooltip = null
		if (content) {
			tooltip = (
				<div
					pb-tooltip={`${direction}`}
					data-pb-tooltip-content={triggerId}
					className={TOOLTIP_VARIANTS[variant] || TOOLTIP_VARIANTS['default']}
				>
					{content}
				</div>
			)
		}

		const [handleDocKeyUp, handleDocPointerDown] = React.useMemo(() => {
			function handleDocKeyUp(e) {
				if (e.key === 'Escape') {
					setToggled(false)
					document.activeElement.blur()
					document.removeEventListener('keyup', handleDocKeyUp)
					document.removeEventListener('pointerdown', handleDocPointerDown)
				}
			}

			function handleDocPointerDown(e) {
				let cur = e.target
				while (cur && cur !== document.body) {
					if (
						// Clicking on the trigger element should not close the tooltip
						cur.dataset['pbTooltipTrigger'] === triggerId ||
						// Clicking on the tooltip's content should not close the tooltip
						// This can be used to put an interactive element (eg, button)
						// inside the tooltip which is useable!
						cur.dataset['pbTooltipContent'] === triggerId
					) {
						return
					}
					cur = cur.parentElement
				}
				setToggled(false)
				document.activeElement.blur()
				document.removeEventListener('keyup', handleDocKeyUp)
				document.removeEventListener('pointerdown', handleDocPointerDown)
			}
			return [handleDocKeyUp, handleDocPointerDown]
		}, [setToggled, triggerId])

		const _children = React.cloneElement(children, {
			tabIndex: 0,
			'data-pb-tooltip-trigger': triggerId,
			// If the child element is not designed to be clickable (eg, a button with tooltip),
			// then make the tooltop visible on focus (when it is clicked) and then hide it
			// again on blur (user clicks elsewhere).
			// This ensures info style icons can be clicked on touchscreens to show their
			// content - where there is no mouse to be hovered
			onFocus: (e) => {
				if (!children.props.onClick) {
					document.addEventListener('keyup', handleDocKeyUp)
					document.addEventListener('pointerdown', handleDocPointerDown)
					setToggled(true)
				}
				if (children.props.onFocus) {
					children.props.onFocus(e)
				}
			},
			// Our doc key up / pointer down handlers work to close the tooltip anyway...
			// Having this causes issues with buttons inside the tooltip as blur
			// occurs on pointer down before the button click event is fired,
			// so disabled for now...
			/*onBlur: (e) => {
				document.removeEventListener('keyup', handleDocKeyUp)
				document.removeEventListener('pointerdown', handleDocPointerDown)
				setToggled(false)
				if (children.props.onBlur) {
					children.props.onBlur(e)
				}
			},*/
		})

		return (
			<Popover
				anchor={pos}
				direction={direction}
				shown={active || toggled || shown}
				margin={margin}
				content={tooltip}
				ref={ref}
				onPointerEnter={onPointerEnter}
				onPointerLeave={onPointerLeave}
				onPointerMove={onPointerMove}
			>
				{_children}
			</Popover>
		)
	}
)

export { Tooltip as default }