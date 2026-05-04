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
  MEMORY,
  MEMORY_CLEAR,
  MEMORY_RECALL,
  PLUS_MINUS,
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
  memory: 0,
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
    case ALL_CLEAR:
      return {
        ...initialState,
        memory: state.memory,
      }

    case CLEAR:
      return {
        ...state,
        display: ZERO,
        fresh: true,
      }

    case DECIMAL:
      return {
        ...state,
        fresh: false,
        display:
          !hasDecimal(state.display) && canAppendDigit(state.display)
            ? `${state.display}.`
            : state.display,
      }

    case MEMORY:
      return {
        ...state,
        memory: Number(state.display),
      }

    case MEMORY_CLEAR:
      return {
        ...state,
        memory: 0,
      }

    case MEMORY_RECALL:
      return {
        ...state,
        display: String(state.memory),
        fresh: false,
      }

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
      }
    
    case PLUS_MINUS:
      return {
        ...state,
        display:
          state.display === ZERO
            ? ZERO
            : String(Number(state.display) * -1),
      }

    case SYMBOL: {
      const summed = sum(state)
      return {
        ...state,
        lastSymbol: action.symbol,
        fresh: true,
        register: summed,
        display: String(summed),
      }
    }

    default:
      return state
  }
}

export default () => useReducer(calcReducer, initialState)
