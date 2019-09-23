import { useReducer } from 'react'
import { includes } from 'ramda'

import { CLEAR, NUMBER, SYMBOL, EQUALS, DECIMAL } from './consts'

const hasDecimal = includes('.')

export const initialState = {
  register: 0,
  lastSymbol: null,
  display: '0', 
}

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
  switch (action.type) {
    case CLEAR:
      return initialState

    case NUMBER:
      return {
        ...state,
        display: state.display === '0'
          ? String(action.number)
          : `${state.display}${action.number}`
      }
    
    case DECIMAL:
      return {
        ...state,
        display: hasDecimal(state.display)
          ? state.display
          : `${state.display}.`
      }

    case SYMBOL:
      return {
        ...state,
        lastSymbol: action.symbol,
        register: sum(state),
        display: '0',
      }

      case EQUALS:
        const value = String(sum(state))
        return {
          ...state,
          lastSymbol: '=',
          register: value,
          display: value,
        }
    
    default:
      return state
  }
}

export default () => useReducer(calcReducer, initialState)
