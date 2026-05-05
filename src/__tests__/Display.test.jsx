import React from 'react'
import { shallow } from 'enzyme'

import Display, { formatDisplayValue } from '../Display'

it('Renders the display', () => {
  const value = 123
  const display = <Display>{value}</Display>

  expect(display).toMatchSnapshot()

  const component = shallow(display)

  expect(component.text()).toBe(value.toString())
})

it('renders long integers using exponent notation', () => {
  const component = shallow(<Display>{123456789}</Display>)

  expect(component.text()).toBe('1.23 e+8')
})

it('renders long decimals using exponent notation', () => {
  const component = shallow(<Display>{12.3456789}</Display>)

  expect(component.text()).toBe('1.235 e+1')
})

it('formats values only after they exceed the screen length rule', () => {
  expect(formatDisplayValue('12345678')).toBe('12345678')
  expect(formatDisplayValue('1234567.8')).toBe('1234567.8')
})

it('renders NaN as Error', () => {
  const component = shallow(<Display>{NaN}</Display>)

  expect(component.text()).toBe('Error')
})
