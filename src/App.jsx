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
  state.display === ZERO || state.fresh ? ALL_CLEAR : CLEAR;

const App = () => {
  const [state, dispatch] = useCalcReducer()

  const {
    handleButton,
    handleNumber,
    handleSymbol,
  } = useHandlers(dispatch)

  useKeyboard(dispatch);

  return (
    <div className="calc">
      <Display>{state.display}</Display>
      <Logo />
      <Button value={clearDisplay(state)} onClick={handleButton} />
      <Button value={MEMORY} onClick={handleButton} />
      <Button value={MEMORY_CLEAR} onClick={handleButton} />
      <Button value={MEMORY_RECALL} onClick={handleButton} />
      <Button value="/" onClick={handleSymbol} />
      <Button value={7} onClick={handleNumber} />
      <Button value={8} onClick={handleNumber} />
      <Button value={9} onClick={handleNumber} />
      <Button value="X" onClick={handleSymbol} />
      <Button value={4} onClick={handleNumber} />
      <Button value={5} onClick={handleNumber} />
      <Button value={6} onClick={handleNumber} />
      <Button value="+" onClick={handleSymbol} />
      <Button value={1} onClick={handleNumber} />
      <Button value={2} onClick={handleNumber} />
      <Button value={3} onClick={handleNumber} />
      <Button value="-" onClick={handleSymbol} />
      <Button value={PLUS_MINUS} onClick={handleButton} />
      <Button value={0} onClick={handleNumber} />
      <Button value={DECIMAL} onClick={handleButton} />
      <Button value="=" onClick={handleSymbol} />
    </div>
  );
}

export default App
