import { NUMBER, SYMBOL } from './consts'

export default (dispatch) => ({
  handleButton: (button) => dispatch({ type: button }),
  handleNumber: (number) => dispatch({ type: NUMBER, number }),
  handleSymbol: (symbol) => dispatch({ type: SYMBOL, symbol }),
})
