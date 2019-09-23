import { calcReducer, initialState } from '../calcReducer'
import { NUMBER, SYMBOL, EQUALS, DECIMAL } from '../consts'

describe('Reducer can do basic math', () => {
  let state = calcReducer(initialState, {})
  const dispatch = action => {
    state = calcReducer(state, action)
    return state
  }

  it('initailises', () => expect(state).toBe(initialState))

  it('displays entered numbers', () => {
    state = calcReducer(initialState, {})
    dispatch({ type: NUMBER, number: 1 })
    expect(state.display).toBe('1')
    dispatch({ type: NUMBER, number: 2 })
    expect(state.display).toBe('12')
    dispatch({ type: NUMBER, number: 3 })
    expect(state.display).toBe('123')
  })

  it('can only enter decimal once', () => {
    state = calcReducer(initialState, {})
    dispatch({ type: NUMBER, number: 1 })
    expect(state.display).toBe('1')
    dispatch({ type: DECIMAL })
    dispatch({ type: DECIMAL })
    dispatch({ type: NUMBER, number: 2 })
    expect(state.display).toBe('1.2')
    dispatch({ type: DECIMAL })
    dispatch({ type: NUMBER, number: 2 })
    expect(state.display).toBe('1.22')
  })

  function sum(n1, n2, symbol, answer) {
    state = calcReducer(initialState, {})
    dispatch({ type: NUMBER, number: n1 })
    dispatch({ type: SYMBOL, symbol })
    expect(state).toEqual({
      display: '0',
      lastSymbol: symbol,
      register: n1,
    })

    dispatch({ type: NUMBER, number: n2 })
    expect(state.display).toBe(String(n2))

    dispatch({ type: EQUALS })
    expect(state.display).toBe(String(answer))
  }

  it('adds', () => sum(1, 1, '+', 2))
  it('minuses', () => sum(6, 2, '-', 4))
  it('divides', () => sum(8, 2, '/', 4))
  it('multipies', () => sum(9, 9, 'X', 81))
})
