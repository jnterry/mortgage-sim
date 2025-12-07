import React from 'react'
import InputText from './Text'

function formatValue({ value, fixedDp }) {
  if (typeof value === 'number') {
    if (fixedDp) {
      return value.toFixed(fixedDp)
    } else {
      return value.toString()
    }
  } else if (typeof value === 'string') {
    return value
  } else {
    return ''
  }
}

/**
 * Thin wrapper around InputText that sets the type attrib to 'number', and automatically
 * converts between dom string values, and number values to be used by the form.
 */
export function InputNumber({
  value,
  setValue,

  /**
   * If set, will always display with fixed number of decimal places after blur
   * This is useful for inputs for things like currency
   */
  fixedDp,

  ...rest
}) {
  const [displayedValue, setDisplayedValue] = React.useState(() =>
    formatValue({ value, fixedDp })
  )

  function _setValue(value) {
    setDisplayedValue(value)
    if (value.match(/^\s*$/)) {
      setValue(null)
    } else {
      let parsed = parseFloat(value)
      if (isNaN(parsed)) {
        setValue(null)
      } else if (fixedDp) {
        let mult = Math.pow(10, fixedDp)
        setValue(Math.round(parsed * mult) / mult)
      } else {
        setValue(parsed)
      }
    }
  }

  const refFocus = React.useRef(false)
  React.useEffect(() => {
    if (refFocus.current) return
    setDisplayedValue(formatValue({ value, fixedDp }))
  }, [value, fixedDp])

  return (
    <InputText
      onFocus={() => {
        refFocus.current = true
      }}
      onBlur={() => {
        refFocus.current = false
        setDisplayedValue(null)
      }}
      onWheel={(e) => {
        // By default mouse wheel inside number input will step the value up and down
        // which makes it easy to change the value by accident when scrolling a form
        // As such we prevent this default behaviour by simply blurring the input
        // This is better than .preventDefault() which will prevent page scroll too
        e.currentTarget.blur()
      }}
      type="number"
      {...rest}
      value={displayedValue ?? formatValue({ value, fixedDp })}
      setValue={_setValue}
    />
  )
}

export { InputNumber as default }

export function InputPence({ value, setValue, ...rest }) {
  return (
    <InputNumber
      value={value ? Math.round(value) / 100 : value}
      setValue={(v) => setValue(v && Math.round(v * 100))}
      fixedDp={2}
      step="0.01"
      {...rest}
    />
  )
}

function formatBp(value) {
  if (typeof value === 'number') {
    return [
      `${Math.floor(value / 10000)}`,
      (value % 10000).toString().padStart(4, '0').replace(/0+$/, '') || '0',
    ].join('.')
  } else if (typeof value === 'string') {
    return formatBp({ value: parseBpStringToInt(value) })
  } else {
    return ''
  }
}

function parseBpStringToInt(value) {
  const [whole, decimal] = value.split('.')
  const paddedDecimal = (decimal || '').padEnd(4, '0').slice(0, 4)
  return parseInt(`${whole}${paddedDecimal}`)
}

/**
 * Number input whose value is an integer number of basis points (1/100th of a percent)
 * but displays as a percentage value.
 *
 * This is effectively a fixed-precision number with 4 decimal places, and uses string
 * manipulation to ensure values are exact to avoid floating point truncation
 */
export function InputBasisPoints({ value, setValue, ...rest }) {
  const [displayedValue, setDisplayedValue] = React.useState(() =>
    formatBp({ value })
  )

  function _setValue(value) {
    setDisplayedValue(value)
    setValue(parseBpStringToInt(value))
  }

  const refFocus = React.useRef(false)
  React.useEffect(() => {
    if (refFocus.current) return
    setDisplayedValue(formatBp(value))
  }, [value])

  return (
    <InputText
      onFocus={() => {
        refFocus.current = true
      }}
      onBlur={() => {
        refFocus.current = false
        setDisplayedValue(null)
      }}
      onWheel={(e) => {
        e.currentTarget.blur()
      }}
      type="number"
      {...rest}
      value={displayedValue ?? formatBp(value)}
      setValue={_setValue}
    />
  )
}