import React from 'react'
import { mount } from 'enzyme'
import DirectActivity from './DirectActivity'

describe('The DirectActivity component', () => {
  it('Renders without errors', () => {
    const component = mount(<DirectActivity />)
    expect(component.find('.direct').length).toBe(1)
  })
})
