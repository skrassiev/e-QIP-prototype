import React from 'react'
import { mount } from 'enzyme'
import Direct from './Direct'

describe('The Direct component', () => {
  it('Renders without errors', () => {
    const component = mount(<Direct />)
    expect(component.find('.direct').length).toBe(1)
  })
})
