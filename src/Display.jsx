import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { isScreenFull } from './calcHelpers'
import { SCREEN_MAX } from './consts'

import './Display.css'

export function formatDisplayValue(value) {
  if (value === 'NaN') return 'Error'
  if (!isScreenFull(value)) return value

  const numericValue = Number(value)
  const maxLength = SCREEN_MAX + 1

  if (!Number.isFinite(numericValue)) return value

  let precision = SCREEN_MAX -4
  let formattedValue = numericValue.toExponential(precision)

  while (formattedValue.length > maxLength && precision > 0) {
    precision -= 1
    formattedValue = numericValue.toExponential(precision)  
  }

  return formattedValue
}

const Display = memo(({for: buttons, children}) => (
  <output for={buttons.join(' ')}>
    {formatDisplayValue(children)}
  </output>
))

Display.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Display
