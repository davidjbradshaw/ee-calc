import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = memo(({value, onClick}) => (
  <button type="button" value={value} onClick={() => onClick(value)}>
    {value}
  </button>
))

Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button