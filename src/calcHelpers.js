import { includes } from 'ramda'
import { SCREEN_MAX, ZERO } from './consts'

export const hasDecimal = includes('.')

export const isScreenFull = (display) =>
  display.length > (hasDecimal(display)
    ? SCREEN_MAX + 1
    : SCREEN_MAX
  )

export const canAppendDigit = (display) =>
  !isScreenFull(`${display}${ZERO}`)

export function sum({ register, display, lastSymbol }) {
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
