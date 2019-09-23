import React from 'react'
import PropTypes from 'prop-types'

import { eeBlue } from './consts'

const displayStyle={
  border: `solid 5px ${eeBlue}`,
  color: eeBlue,
  backgroundColor: 'white',
  borderRadius: '5px',
  fontSize: '20px',
  padding: `5px 10px 5px`,
  textAlign: 'right',
  overflow: 'hidden',
}

const Display = ({children}) => (
  <div style={displayStyle}>{ children }</div>
)

Display.prototypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}

export default Display