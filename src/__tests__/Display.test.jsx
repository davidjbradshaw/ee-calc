import React from 'react'
import { shallow } from 'enzyme'

import Display from '../Display'

it('Renders the display', () => {
  const value = 123
  const display = <Display>{value}</Display>

  expect(display).toMatchSnapshot()

  const component = shallow(display)

  expect(component.text()).toBe(value.toString())
})
