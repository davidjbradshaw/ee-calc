import { useReducer } from 'react'
import { includes } from 'ramda'

import { CLEAR, NUMBER, SYMBOL, DECIMAL } from './consts'

const hasDecimal = includes('.')

export const initialState = {
  display: "0",
  lastSymbol: null,
  new: true,
  register: 0,
};

function sum({register, display, lastSymbol}) {
  const floatDisplay = Number(display)

  switch (lastSymbol) {
    case '/':
      return register / floatDisplay

    case 'X':
      return register * floatDisplay

    case '+':
      return register + floatDisplay

    case '-':
      return register - floatDisplay

    default:
      return floatDisplay
  }
}

export function calcReducer(state = initialState, action) {
  if (action.type === CLEAR) return initialState

  const type = state.display.length < 15 ? action.type : 'FULL'

  switch (type) {
    case NUMBER:
      return {
        ...state,
        new: false,
        display: state.new || state.display === '0'
          ? String(action.number)
          : `${state.display}${action.number}`
      }
    
    case DECIMAL:
      return {
        ...state,
        new: false,
        display: state.new
          ? '0.'
          : hasDecimal(state.display)
          ? state.display
          : `${state.display}.`
      }

    case SYMBOL: {
      const value = sum(state)
      return {
        ...state,
        lastSymbol: action.symbol,
        new: true,
        register: value,
        display: String(value),
      }
    }
    
    default:
      return state
  }
}

export default () => useReducer(calcReducer, initialState)
