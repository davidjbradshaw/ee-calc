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

export default function useKeyboard(onClick, clearAction = CLEAR) {
  useEffect(
    () => {
      const handleKeyDown = (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey) return
        if (isEditableElement(event.target)) return

        const { key } = event

        if (/^[0-9]$/.test(key)) {
          onClick(key)
        } else switch (key) {
          case '.':
            onClick(DECIMAL)
            break

          case '+':
            onClick(ADD)
            break

          case '-':
            onClick(SUBTRACT)
            break

          case '/':
            onClick(DIVIDE)
            break

          case '*':
          case 'x':
          case 'X':
            onClick(MULTIPLY)
            break

          case '=':
          case 'Enter':
            onClick(EQUALS)
            break

          case 'Backspace':
          case 'Delete':
            onClick(clearAction)
            break

          case 'Escape':
            onClick(ALL_CLEAR)
            break

          case 'c':
          case 'C':
            onClick(clearAction)
            break

          default:
            return
        }

        event.preventDefault()
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    },
    [onClick, clearAction],
  )
}
