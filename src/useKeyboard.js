import { useEffect } from 'react'

import {
  ALL_CLEAR,
  CLEAR,
  DECIMAL,
  DIVIDE,
  MULTIPLY,
  ADD,
  SUBTRACT,
  EQUALS,
} from './consts'

const isEditableElement = (target) =>
  target instanceof HTMLElement && (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )

export default function useKeyboard(dispatch, clearAction = CLEAR) {
  useEffect(
    () => {
      const dispatchButton = (button) =>
        dispatch({ type: button, button })

      const handleKeyDown = (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey) return
        if (isEditableElement(event.target)) return

        const { key } = event

        if (/^[0-9]$/.test(key)) {
          dispatch({
            type: key,
            button: key,
            number: Number(key),
          })
        } else switch (key) {
          case '.':
            dispatchButton(DECIMAL)
            break

          case '+':
            dispatchButton(ADD)
            break

          case '-':
            dispatchButton(SUBTRACT)
            break

          case '/':
            dispatchButton(DIVIDE)
            break

          case '*':
          case 'x':
          case 'X':
            dispatchButton(MULTIPLY)
            break

          case '=':
          case 'Enter':
            dispatchButton(EQUALS)
            break

          case 'Backspace':
          case 'Delete':
            dispatchButton(clearAction)
            break

          case 'Escape':
            dispatchButton(ALL_CLEAR)
            break

          case 'c':
          case 'C':
            dispatchButton(clearAction)
            break

          default:
            return
        }

        event.preventDefault()
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    },
    [dispatch, clearAction],
  )
}
