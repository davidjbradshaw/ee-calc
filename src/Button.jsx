import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

const Button = ({value, onClick}) => (
  <button type="button" value={value} onClick={() => onClick(value)}>
    {value}
  </button>
)

Button.prototypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button