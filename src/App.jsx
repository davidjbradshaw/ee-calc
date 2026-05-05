import React from 'react'

import Display from './Display'
import Button from './Button'
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
  const buttons = [clearButton, ...BUTTONS]

  useKeyboard(onClick, clearButton)

  return (
    <div className="calc">
      <Display for={buttons}>{state.display}</Display>
      <Logo />
      {
        buttons.map(
          (button) => (
            <Button
              key={button}
              value={button}
              onClick={onClick}
            />
          )
        )
      }
    </div>
  )
}

export default App
