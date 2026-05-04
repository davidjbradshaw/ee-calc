import { useCallback } from 'react'
import { CLEAR, NUMBER, SYMBOL, DECIMAL } from './consts'

export default (dispatch) => ({
  handleClear: useCallback(
    () => dispatch({ type: CLEAR }),
    [dispatch],
  ),
    
  handleDecimal: useCallback(
    () => dispatch({ type: DECIMAL }),
    [dispatch],
  ),
  
  handleNumber: useCallback(
    (number) => dispatch({ type: NUMBER, number }),
    [dispatch],
  ),

  handleSymbol: useCallback(
    (symbol) => dispatch({ type: SYMBOL, symbol }),
    [dispatch],
  ),
})
