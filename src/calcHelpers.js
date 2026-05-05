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
