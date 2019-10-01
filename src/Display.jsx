import PropTypes from 'prop-types'
import React from 'react'

import { eeBlue } from './consts'

const displayStyle = {
  border: `solid 5px ${eeBlue}`,
  color: eeBlue,
  backgroundColor: 'white',
  borderRadius: '5px',
  fontSize: '24px',
  fontFamily: "'Orbitron', sans-serif",
  padding: `5px 10px 5px`,
  textAlign: 'right',
  overflow: 'hidden',
}

const Display = ({ children }) => <div style={displayStyle}>{children}</div>

Display.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Display
