import React from 'react'
import PropTypes from 'prop-types'

import "./Buttons.css"

const Buttons = ({ children, onClick }) =>
  children.map((button) => (
    <button key={button} type="button" onClick={() => onClick(button)}>
      {button}
    </button>
  ))

Buttons.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Buttons
