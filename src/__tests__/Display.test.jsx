import React from 'react'
import { shallow } from 'enzyme'

import Display, { formatDisplayValue } from '../Display'

const buttons = ['AC', '1', '2', '3', '+', '-', 'X', '/', '=', '.']

it('Renders the display', () => {
  const component = shallow(<Display for={buttons}>123</Display>)

  expect(component.text()).toBe('123')
})

it('renders long integers using exponent notation', () => {
  const component = shallow(<Display for={buttons}>123456789</Display>)

  expect(component.text()).toBe('1.2346 e+8')
})

it('renders long decimals using exponent notation', () => {
  const component = shallow(<Display for={buttons}>12.3456789</Display>)

  expect(component.text()).toBe('1.2346 e+1')
})

it('formats values only after they exceed the screen length rule', () => {
  expect(formatDisplayValue('12345678')).toBe('12345678')
  expect(formatDisplayValue('1234567.8')).toBe('1234567.8')
})

it('renders NaN as Error', () => {
  const component = shallow(<Display for={buttons}>NaN</Display>)

  expect(component.text()).toBe('Error')
})
