import { useReducer } from 'react'

import {
  hasDecimal,
  canAppendDigit,
} from './calcHelpers'
import sum from './sum'

import {
  ALL_CLEAR,
  CLEAR,
  DECIMAL,
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  DIVIDE,
  MULTIPLY,
  ADD,
  SUBTRACT,
  EQUALS,
  MEMORY,
  MR,
  SQRT,
  PLUS_MINUS,
} from './consts'

export const initialState = {
  display: ZERO,
  lastSymbol: null,
  fresh: true,
  register: 0,
  memory: 0,
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

    case MR:
      return {
        ...state,
        display: String(state.memory),
        fresh: false,
      }

    case SQRT: {
      const value = Number(state.display)
      if (value < 0) return state
      const rooted = Math.sqrt(value)

      return {
        ...state,
        display: String(rooted),
        register: rooted,
        fresh: true,
      }
    }

    case ZERO:
    case ONE:
    case TWO:
    case THREE:
    case FOUR:
    case FIVE:
    case SIX:
    case SEVEN:
    case EIGHT:
    case NINE:
      return {
        ...state,
        fresh: false,
        display:
          state.fresh || state.display === ZERO
            ? String(action.button)
            : canAppendDigit(state.display)
              ? `${state.display}${action.button}`
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

    case DIVIDE:
    case MULTIPLY:
    case ADD:
    case SUBTRACT:
    case EQUALS: {
      const summed = sum(state)
      return {
        ...state,
        lastSymbol: action.button,
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
