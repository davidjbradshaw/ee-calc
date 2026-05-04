import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { hasDecimal, isScreenFull } from './useCalcReducer'
import { SCREEN_MAX } from './consts'

import './Display.css'

export function formatDisplayValue(value) {
  const rawValue = String(value)
  const maxLength = hasDecimal(rawValue) ? SCREEN_MAX + 1 : SCREEN_MAX

  if (!isScreenFull(rawValue)) {
    return rawValue
  }

  const numericValue = Number(rawValue)

  if (!Number.isFinite(numericValue)) {
    return rawValue
  }

  let precision = Math.max(0, maxLength - 4)
  let formattedValue = numericValue
    .toExponential(precision)
    .replace('e', ' e')

  while (formattedValue.length > maxLength && precision > 0) {
    precision -= 1
    formattedValue = numericValue
      .toExponential(precision)
      .replace('e', ' e')
  }

  return formattedValue
}

const Display = memo(({children}) => (
  <div className="display">{ formatDisplayValue(children) }</div>
))

Display.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}

export default Display