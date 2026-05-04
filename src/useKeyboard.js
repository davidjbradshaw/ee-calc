import { useEffect } from 'react'

import { CLEAR, NUMBER, SYMBOL, DECIMAL } from './consts'

const isEditableElement = (target) =>
  target instanceof HTMLElement && (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )

export default function useKeyboard(dispatch) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const { key, target } = event

      if (isEditableElement(target)) {
        return
      }

      if (/^[0-9]$/.test(key)) {
        event.preventDefault()
        dispatch({ type: NUMBER, number: Number(key) })
        return
      }

      switch (key) {
        case '.':
          event.preventDefault()
          dispatch({ type: DECIMAL })
          return

        case '+':
        case '-':
        case '/':
          event.preventDefault()
          dispatch({ type: SYMBOL, symbol: key })
          return

        case '*':
        case 'x':
        case 'X':
          event.preventDefault()
          dispatch({ type: SYMBOL, symbol: 'X' })
          return

        case '=':
        case 'Enter':
          event.preventDefault()
          dispatch({ type: SYMBOL, symbol: '=' })
          return

        case 'Backspace':
        case 'Delete':
        case 'Escape':
        case 'c':
        case 'C':
          event.preventDefault()
          dispatch({ type: CLEAR })
          return

        default:
          return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])
}