import { calcReducer, initialState } from '../calcReducer'
import { DECIMAL, EQUALS, NUMBER, SYMBOL } from '../consts'

describe('calculator reducer', () => {
  let state = calcReducer(initialState, {})
  const dispatch = action => {
    state = calcReducer(state, action)
    return state
  }

  it('initailises', () => expect(state).toBe(initialState))

  describe('number input', () => {
    it('should record numbers entered by the user', () => {
      state = calcReducer(initialState, {})
      dispatch({ type: NUMBER, number: 1 })
      expect(state.display).toBe('1')
      dispatch({ type: NUMBER, number: 2 })
      expect(state.display).toBe('12')
      dispatch({ type: NUMBER, number: 3 })
      expect(state.display).toBe('123')
    })

    it('should only allow one decimal point to be entered', () => {
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
  })

  describe('number input', () => {
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

    it('should sum two numberes', () => sum(1, 1, '+', 2))
    it('should minuses one number from another', () => sum(6, 2, '-', 4))
    it('should divide one number from another', () => sum(8, 2, '/', 4))
    it('should multiply two numbers', () => sum(9, 9, 'X', 81))
  })
})
