import { useReducer } from 'react'
import { includes } from 'ramda'

import { CLEAR, NUMBER, SYMBOL, DECIMAL, SCREEN_MAX, ZERO } from './consts'

export const hasDecimal = includes('.')
export const isScreenFull = (display) =>
  display.length > (hasDecimal(display)
    ? SCREEN_MAX + 1
    : SCREEN_MAX
  )

const wouldExceedScreen = (display) =>
  isScreenFull(`${display}${ZERO}`)

export const initialState = {
  display: ZERO,
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
  switch (action.type) {
    case CLEAR:
      return initialState
    
    case NUMBER:
      return {
        ...state,
        new: false,
        display:
          state.new || state.display === ZERO
            ? String(action.number)
            : wouldExceedScreen(state.display)
              ? state.display
              : `${state.display}${action.number}`,
      };
    
    case DECIMAL:
      return {
        ...state,
        new: false,
        display:
          hasDecimal(state.display) || wouldExceedScreen(state.display)
            ? state.display
            : `${state.display}.`,
      };

    case SYMBOL: {
      const summed = sum(state)
      return {
        ...state,
        lastSymbol: action.symbol,
        new: true,
        register: summed,
        display: String(summed),
      }
    }
    
    default:
      return state
  }
}

export default () => useReducer(calcReducer, initialState)
