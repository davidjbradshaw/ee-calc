import PropTypes from 'prop-types'
import React from 'react'

import { eeBlue } from './consts'

const buttonStyle = {
  backgroundColor: 'white',
  color: eeBlue,
  borderRadius: '5px',
  border: 'solid 1px #ccc',
  paddingTop: '7px',
  fontFamily: "'Orbitron', sans-serif",
  height: '40px',
  width: '40px',
  margin: '0 0 5px 5px',
  textAlign: 'centre',
  fontSize: '20px',
}

const Button = ({ value, onClick }) => (
  <button
    type="button"
    value={value}
    onClick={() => onClick(value)}
    style={buttonStyle}
  >
    {value}
  </button>
)

Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
