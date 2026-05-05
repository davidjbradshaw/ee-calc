import { NUMBER, SYMBOL } from './consts'

export default (dispatch) => ({
  button: (button) => dispatch({ type: button }),
  number: (number) => dispatch({ type: NUMBER, number }),
  symbol: (symbol) => dispatch({ type: SYMBOL, symbol }),
})
