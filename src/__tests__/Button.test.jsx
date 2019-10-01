import { shallow } from 'enzyme'
import { identity } from 'ramda'
import React from 'react'

import Button from '../Button'

describe('Calculator button', () => {
  it('should render a clickabke button', () => {
    const value = 'foo'
    const button = <Button value={value} onClick={identity} />
    expect(button).toMatchSnapshot()

    const component = shallow(button)
    expect(component.invoke('onClick')()).toBe(value)
    expect(component.prop('value')).toBe(value)
  })
})
