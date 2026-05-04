import React from 'react'
import PropTypes from 'prop-types'

import { eeBlue } from './consts'

const displayStyle={
  border: `solid 5px ${eeBlue}`,
  color: 'black',
  backgroundColor: '#B7C98A',
  borderRadius: '10px',
  fontFamily: '"DSEG7 Classic", monospace',
  fontSize: '22px',
  fontWeight: '500',
  letterSpacing: '1px',
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