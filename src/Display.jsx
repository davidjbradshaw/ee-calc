import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { hasDecimal, isScreenFull } from './calcHelpers'
import { SCREEN_MAX } from './consts'

import './Display.css'

export function formatDisplayValue(value) {
  if (value === 'NaN') return 'Error'
  if (!isScreenFull(value)) return value;

  const maxLength = hasDecimal(value)
    ? SCREEN_MAX + 1
    : SCREEN_MAX


  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return value
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
  children: PropTypes.string.isRequired,
}

export default Display
