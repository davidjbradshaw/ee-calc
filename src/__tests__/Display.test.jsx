import { shallow } from 'enzyme'
import React from 'react'

import Display from '../Display'

describe('Calculator display', () => {
  it('should display the passed in number', () => {
    const value = '123.45'
    const display = <Display>{value}</Display>

    expect(display).toMatchSnapshot()

    const component = shallow(display)

    expect(component.text()).toBe(value.toString())
  })
})
