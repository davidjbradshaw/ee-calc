import { DIVIDE, MULTIPLY, ADD, SUBTRACT } from './consts'

const sum = ({ register, display, lastSymbol }) => {
  const floatDisplay = Number(display)

  switch (lastSymbol) {
    case DIVIDE:
      return register / floatDisplay

    case MULTIPLY:
      return register * floatDisplay

    case ADD:
      return register + floatDisplay

    case SUBTRACT:
      return register - floatDisplay

    default:
      return floatDisplay
  }
}

export default sum
