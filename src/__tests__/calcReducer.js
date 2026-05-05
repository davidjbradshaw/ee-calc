import { calcReducer, initialState } from '../useCalcReducer'
import {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SEVEN,
  EIGHT,
  NINE,
  DECIMAL,
  ADD,
  SUBTRACT,
  DIVIDE,
  MULTIPLY,
  EQUALS,
  CLEAR,
  ALL_CLEAR,
  PLUS_MINUS,
  SQRT,
  MEMORY,
  MR,
} from '../consts'

const buttonAction = (button) => ({ type: button, button })

describe('Reducer can do basic math', () => {
  let state = calcReducer(initialState, {})
  const dispatch = (action) => {
    state = calcReducer(state, action)
    return state
  }

  it('initialises', () => expect(state).toBe(initialState))

  it('displays entered numbers', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(ONE))
    expect(state.display).toBe('1')
    dispatch(buttonAction(TWO))
    expect(state.display).toBe('12')
    dispatch(buttonAction(THREE))
    expect(state.display).toBe('123')
  })

  it('can only enter decimal once', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(ONE))
    expect(state.display).toBe('1')
    dispatch(buttonAction(DECIMAL))
    dispatch(buttonAction(DECIMAL))
    dispatch(buttonAction(TWO))
    expect(state.display).toBe('1.2')
    dispatch(buttonAction(DECIMAL))
    dispatch(buttonAction(TWO))
    expect(state.display).toBe('1.22')
  })

  function runBinaryOp(n1, n2, operator, answer) {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(String(n1)))
    dispatch(buttonAction(operator))
    dispatch(buttonAction(String(n2)))
    expect(state.display).toBe(String(n2))

    dispatch(buttonAction(EQUALS))
    expect(state.display).toBe(String(answer))
  }

  it('adds', () => runBinaryOp(1, 1, ADD, 2))
  it('subtracts', () => runBinaryOp(6, 2, SUBTRACT, 4))
  it('divides', () => runBinaryOp(8, 2, DIVIDE, 4))
  it('multiplies', () => runBinaryOp(9, 9, MULTIPLY, 81))

  it('returns Infinity for division by zero', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(ONE))
    dispatch(buttonAction(DIVIDE))
    dispatch(buttonAction(ZERO))
    dispatch(buttonAction(EQUALS))

    expect(state.display).toBe('Infinity')
  })

  it('clears display with CLEAR', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(ONE))
    dispatch(buttonAction(TWO))
    dispatch(buttonAction(THREE))
    expect(state.display).toBe('123')

    dispatch(buttonAction(CLEAR))
    expect(state.display).toBe('0')
    expect(state.fresh).toBe(true)
  })

  it('resets state with ALL_CLEAR', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(FIVE))
    dispatch(buttonAction(ADD))
    dispatch(buttonAction(THREE))
    dispatch(buttonAction(EQUALS))

    dispatch(buttonAction(ALL_CLEAR))
    expect(state).toEqual({
      ...initialState,
      memory: 0,
    })
  })

  it('toggles sign with PLUS_MINUS', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(FIVE))
    expect(state.display).toBe('5')

    dispatch(buttonAction(PLUS_MINUS))
    expect(state.display).toBe('-5')

    dispatch(buttonAction(PLUS_MINUS))
    expect(state.display).toBe('5')
  })

  it('handles PLUS_MINUS on zero', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(PLUS_MINUS))
    expect(state.display).toBe('0')
  })

  it('calculates square root with SQRT', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(NINE))
    dispatch(buttonAction(SQRT))
    expect(state.display).toBe('3')
  })

  it('ignores SQRT for negative numbers', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(FIVE))
    dispatch(buttonAction(PLUS_MINUS))
    dispatch(buttonAction(SQRT))
    expect(state.display).toBe('-5')
  })

  it('stores value with MEMORY', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(SEVEN))
    dispatch(buttonAction(MEMORY))
    expect(state.memory).toBe(7)
  })

  it('recalls value with MR', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(SEVEN))
    dispatch(buttonAction(MEMORY))
    dispatch(buttonAction(CLEAR))
    dispatch(buttonAction(MR))
    expect(state.display).toBe('7')
  })

  it('chains multiple operations', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(TWO))
    dispatch(buttonAction(ADD))
    dispatch(buttonAction(THREE))
    dispatch(buttonAction(ADD))
    dispatch(buttonAction(FOUR))
    dispatch(buttonAction(EQUALS))
    expect(state.display).toBe('9')
  })

  it('starts decimal on fresh state', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(DECIMAL))
    expect(state.display).toBe('0.')
    dispatch(buttonAction(FIVE))
    expect(state.display).toBe('0.5')
  })

  it('maintains state during multi-step operation', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(TWO))
    dispatch(buttonAction(MULTIPLY))
    expect(state.register).toBe(2)
    expect(state.lastSymbol).toBe(MULTIPLY)
    expect(state.fresh).toBe(true)
  })

  it('handles decimal in operations', () => {
    state = calcReducer(initialState, {})
    dispatch(buttonAction(ONE))
    dispatch(buttonAction(DECIMAL))
    dispatch(buttonAction(FIVE))
    dispatch(buttonAction(ADD))
    dispatch(buttonAction(TWO))
    dispatch(buttonAction(DECIMAL))
    dispatch(buttonAction(FIVE))
    dispatch(buttonAction(EQUALS))
    expect(state.display).toBe('4')
  })
})
