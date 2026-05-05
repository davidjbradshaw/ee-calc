import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { isScreenFull } from './calcHelpers'
import { SCREEN_MAX } from './consts'

import './Display.css'

export function formatDisplayValue(value) {
  if (value === 'NaN') return 'Error'
  if (!isScreenFull(value)) return value;

  const numericValue = Number(value)

  if (!Number.isFinite(numericValue))  return value

  const maxLength = SCREEN_MAX + 2
  let precision = SCREEN_MAX -4
  let formattedValue = numericValue
    .toExponential(precision)
    .replace('e', ' e')

  while (formattedValue.length > maxLength && precision > 0) {
    console.log('formattedValue', formattedValue, 'precision', precision)
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
