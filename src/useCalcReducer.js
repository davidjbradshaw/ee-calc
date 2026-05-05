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

export function calcReducer(state, action) {
  if (state.display === 'NaN' && action.type !== ALL_CLEAR) {
    return state
  }
  
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

    case ZERO:
    case ONE:
    case TWO:
    case THREE:
    case FOUR:
    case FIVE:
    case SIX:
    case SEVEN:
    case EIGHT:
    case NINE: {
      const { display, fresh } = state
      const digit = action.button
      return {
        ...state,
        fresh: false,
        display:
          fresh || display === ZERO
            ? String(digit)
            : canAppendDigit(display)
              ? `${display}${digit}`
              : display,
      }
    }

    case DECIMAL: {
      const { display } = state
      return {
        ...state,
        fresh: false,
        display:
          !hasDecimal(display) && canAppendDigit(display)
            ? `${display}.`
            : display,
      }
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

    case SQRT: {
      const rooted = Math.sqrt(Number(state.display))
      return {
        ...state,
        display: String(rooted),
        register: rooted,
        fresh: true,
      }
    }

    case PLUS_MINUS:
      return {
        ...state,
        display: String(Number(state.display) * -1),
      }

    default:
      return state
  }
}

export default () => useReducer(calcReducer, initialState)
