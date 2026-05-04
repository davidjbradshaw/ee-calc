import React from 'react'

import Display from './Display'
import Button from './Button'
import Logo from './Logo'
import useCalcReducer from './useCalcReducer'
import useKeyboard from './useKeyboard'
import useHandlers from './useHandlers'
import './App.css'

const App = () => {
  const [state, dispatch] = useCalcReducer()

  const {
    handleClear,
    handleDecimal,
    handleNumber,
    handleSymbol,
  } = useHandlers(dispatch)

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
