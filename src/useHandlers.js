import { NUMBER, SYMBOL } from './consts'

export default (dispatch) => ({
  handleButton: (value) => dispatch({ type: value }),
  handleNumber: (number) => dispatch({ type: NUMBER, number }),
  handleSymbol: (symbol) => dispatch({ type: SYMBOL, symbol }),
})
