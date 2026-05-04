import React from 'react'
import PropTypes from 'prop-types'
import './display.css'

const Display = ({children}) => (
  <div className="display">{ children }</div>
)

Display.prototypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}

export default Display