import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from '../App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('supports keyboard input', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    ReactDOM.render(<App />, div)
  })

  const pressKey = (key) => {
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
    })
  }

  pressKey('1')
  pressKey('2')
  expect(div.querySelector('.display').textContent).toBe('12')

  pressKey('+')
  pressKey('3')
  pressKey('Enter')
  expect(div.querySelector('.display').textContent).toBe('15')

  pressKey('Escape')
  expect(div.querySelector('.display').textContent).toBe('0')

  pressKey('4')
  pressKey('.')
  pressKey('5')
  expect(div.querySelector('.display').textContent).toBe('4.5')

  ReactDOM.unmountComponentAtNode(div)
  document.body.removeChild(div)
})
