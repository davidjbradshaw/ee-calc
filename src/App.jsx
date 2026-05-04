import React, { useCallback } from 'react'

import { CLEAR, NUMBER, SYMBOL, DECIMAL } from './consts'
import Display from './Display'
import Button from './Button'
import Logo from './Logo'
import useCalcReducer from './calcReducer'
import useKeyboard from './useKeyboard'
import './App.css'

const App = () => {
  const [state, dispatch] = useCalcReducer()

  const handleClear = useCallback(() => dispatch({ type: CLEAR }), [dispatch])
  const handleDecimal = useCallback(() => dispatch({ type: DECIMAL }), [dispatch])
  const handleNumber = useCallback(number => dispatch({ type: NUMBER, number }), [dispatch])
  const handleSymbol = useCallback(symbol => dispatch({ type: SYMBOL, symbol }), [dispatch])

  useKeyboard(dispatch);

  return (
    <div className="calc">
      <Display>{state.display}</Display>
      <Logo />
      <Button value="C" onClick={handleClear} />
      <Button value={7} onClick={handleNumber} />
      <Button value={8} onClick={handleNumber} />
      <Button value={9} onClick={handleNumber} />
      <Button value="/" onClick={handleSymbol} />
      <Button value={4} onClick={handleNumber} />
      <Button value={5} onClick={handleNumber} />
      <Button value={6} onClick={handleNumber} />
      <Button value="X" onClick={handleSymbol} />
      <Button value={1} onClick={handleNumber} />
      <Button value={2} onClick={handleNumber} />
      <Button value={3} onClick={handleNumber} />
      <Button value="+" onClick={handleSymbol} />
      <Button value={0} onClick={handleNumber} />
      <Button value="." onClick={handleDecimal} />
      <Button value="=" onClick={handleSymbol} />
      <Button value="-" onClick={handleSymbol} />
    </div>
  )
}

export default App
