import { useReducer } from 'react'
import { includes } from 'ramda'

import {
  ALL_CLEAR,
  CLEAR,
  NUMBER,
  SYMBOL,
  DECIMAL,
  SCREEN_MAX,
  ZERO,
} from './consts'

export const hasDecimal = includes('.')
export const isScreenFull = (display) =>
  display.length > (hasDecimal(display)
    ? SCREEN_MAX + 1
    : SCREEN_MAX
  )

const canAppendDigit = (display) =>
  !isScreenFull(`${display}${ZERO}`)

export const initialState = {
  display: ZERO,
  lastSymbol: null,
  fresh: true,
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
      return {
        ...state,
        display: ZERO,
        fresh: true,
      }
    
    case ALL_CLEAR:
      return initialState

    case NUMBER:
      return {
        ...state,
        fresh: false,
        display:
          state.fresh || state.display === ZERO
            ? String(action.number)
            : canAppendDigit(state.display)
              ? `${state.display}${action.number}`
              : state.display,
      };

    case DECIMAL:
      return {
        ...state,
        fresh: false,
        display:
          !hasDecimal(state.display) && canAppendDigit(state.display)
            ? `${state.display}.`
            : state.display,
      };

    case SYMBOL: {
      const summed = sum(state);
      return {
        ...state,
        lastSymbol: action.symbol,
        fresh: true,
        register: summed,
        display: String(summed),
      };
    }

    default:
      return state;
  }
}

export default () => useReducer(calcReducer, initialState)
