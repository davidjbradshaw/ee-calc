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
  useEffect(
    () => {
      const handleKeyDown = (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey) return
        if (isEditableElement(event.target)) return;

        const { key } = event

        if (/^[0-9]$/.test(key)) {
          dispatch({ type: NUMBER, number: Number(key) })
        } else switch (key) {
          case '.':
            dispatch({ type: DECIMAL })
            break

          case '+':
          case '-':
          case '/':
            dispatch({ type: SYMBOL, symbol: key })
            break

          case '*':
          case 'x':
          case 'X':
            dispatch({ type: SYMBOL, symbol: 'X' })
            break

          case '=':
          case 'Enter':
            dispatch({ type: SYMBOL, symbol: '=' })
            break

          case 'Backspace':
          case 'Delete':
          case 'Escape':
          case 'c':
          case 'C':
            dispatch({ type: CLEAR })
            break

          default:
            return
        }

        event.preventDefault()
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    },
    [dispatch],
  )
}
