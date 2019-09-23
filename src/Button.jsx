import React from 'react'
import PropTypes from 'prop-types'

import { eeBlue } from './consts'

const buttonStyle={
  backgroundColor: 'white',
  color: eeBlue,
  borderRadius: '5px',
  border: 'solid 2px white',
  height: '40px',
  width: '40px',
  margin: '0 0 5px 5px',
  textAlign: 'centre',
  fontSize: '20px'
}

const Button = ({value, onClick}) => (
  <button type="button" value={value} onClick={() => onClick(value)} style={buttonStyle}>
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