import React from 'react'

import Display from './Display'
import Buttons from './Buttons'
import Logo from './Logo'
import {
  ALL_CLEAR,
  BUTTONS,
  CLEAR,
  ZERO,
} from './consts'
import useCalcReducer from './useCalcReducer'
import useKeyboard from './useKeyboard'

import './App.css'

const clearDisplay = (state) =>
  state.display === ZERO || state.fresh ? ALL_CLEAR : CLEAR

const handleButtonClick = (dispatch) => (button) =>
  dispatch({ type: button, button })

const App = () => {
  const [state, dispatch] = useCalcReducer()
  const onClick = handleButtonClick(dispatch)
  const clearButton = clearDisplay(state)
  const { display } = state
  const buttons = [clearButton, ...BUTTONS]

  useKeyboard(onClick, clearButton)

  return (
    <div className="calc">
      <Display for={buttons}>{display}</Display>
      <Logo />
      <Buttons onClick={onClick}>{buttons}</Buttons>
    </div>
  )
}

export default App
