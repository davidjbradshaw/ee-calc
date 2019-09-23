import React from 'react'
import { identity } from 'ramda'
import { shallow } from 'enzyme'
import Button from '../Button'

it('Renders a button', () => {
  const value = "foo"
  const button = <Button value={value} onClick={identity}/>
  expect(button).toMatchSnapshot()

  const component = shallow(button)
  expect(component.invoke('onClick')()).toBe(value)
  expect(component.prop('value')).toBe(value)
})
