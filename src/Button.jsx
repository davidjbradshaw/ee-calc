import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({value, onClick}) => (
  <button id={value} type="button" onClick={() => onClick(value)}>
    {value}
  </button>
)

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
