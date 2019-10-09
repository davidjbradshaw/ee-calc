import PropTypes from 'prop-types'
import React from 'react'

const displayStyle = {
  color: '#777',
  backgroundColor: '#dbe7ba',
  border: 'solid 1px #ccc',
  borderRadius: '3px',
  fontSize: '24px',
  fontFamily: "'Orbitron', sans-serif",
  padding: `8px 10px 3px`,
  margin: '5px',
  textAlign: 'right',
  overflow: 'hidden',
}

const Display = ({ children }) => <div style={displayStyle}>{children}</div>

Display.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Display
