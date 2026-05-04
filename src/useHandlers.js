import { useCallback } from 'react'
import { CLEAR, NUMBER, SYMBOL, DECIMAL } from './consts'

const useHandlers = (dispatch) => {
  const handleClear = useCallback(() => dispatch({ type: CLEAR }), [dispatch])
  
  const handleDecimal = useCallback(() => dispatch({ type: DECIMAL }), [dispatch])

  const handleNumber = useCallback(number => dispatch({ type: NUMBER, number }), [dispatch])

  const handleSymbol = useCallback(symbol => dispatch({ type: SYMBOL, symbol }), [dispatch])

  return {
    handleClear,
    handleDecimal,
    handleNumber,
    handleSymbol
  }
}

export default useHandlers
