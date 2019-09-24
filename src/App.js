import React from 'react'

import { CLEAR, NUMBER, SYMBOL, EQUALS, DECIMAL } from './consts'
import Display from './Display'
import Button from './Button'
import useCalcReducer from './calcReducer'
import logo from './logo.svg'
import './App.css'

const App = () => {
  const [state, dispatch] = useCalcReducer()
  const handleNumber = number => dispatch({ type: NUMBER, number })
  const handleSymbol = symbol => dispatch({ type: SYMBOL, symbol })
  const handleDecimal = () => dispatch({ type: DECIMAL })
  const handleEquals = () => dispatch({ type: EQUALS })
  const handleClear = () => dispatch({ type: CLEAR })

  return (
    <div className="App">
      <div className="calc">
        <Display>{state.display}</Display>
        <img src={logo} className="App-logo" alt="logo" />
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
        <Button value="=" onClick={handleEquals} />
        <Button value="-" onClick={handleSymbol} />
      </div>
    </div>
  )
}

export default App
