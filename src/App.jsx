import React from 'react'

import Display from './Display'
import Button from './Button'
import Logo from './Logo'
import {
  ALL_CLEAR,
  CLEAR,
  DECIMAL,
  MEMORY,
  MEMORY_CLEAR,
  MEMORY_RECALL,
  PLUS_MINUS,
  ZERO
} from './consts'
import useCalcReducer from './useCalcReducer'
import useKeyboard from './useKeyboard'
import useHandlers from './useHandlers'
import './App.css'

const clearDisplay = (state) =>
  state.display === ZERO || state.fresh ? ALL_CLEAR : CLEAR

const App = () => {
  const [state, dispatch] = useCalcReducer()
  const { button, number, symbol } = useHandlers(dispatch)
  useKeyboard(dispatch)

  return (
    <div className="calc">
      <Display>{state.display}</Display>
      <Logo />
      <Button value={clearDisplay(state)} onClick={button} />
      <Button value={MEMORY} onClick={button} />
      <Button value={MEMORY_CLEAR} onClick={button} />
      <Button value={MEMORY_RECALL} onClick={button} />
      <Button value="/" onClick={symbol} />
      <Button value={7} onClick={number} />
      <Button value={8} onClick={number} />
      <Button value={9} onClick={number} />
      <Button value="X" onClick={symbol} />
      <Button value={4} onClick={number} />
      <Button value={5} onClick={number} />
      <Button value={6} onClick={number} />
      <Button value="+" onClick={symbol} />
      <Button value={1} onClick={number} />
      <Button value={2} onClick={number} />
      <Button value={3} onClick={number} />
      <Button value="-" onClick={symbol} />
      <Button value={PLUS_MINUS} onClick={button} />
      <Button value={0} onClick={number} />
      <Button value={DECIMAL} onClick={button} />
      <Button value="=" onClick={symbol} />
    </div>
  )
}

export default App
