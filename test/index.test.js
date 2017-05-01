import React from 'react'
import { mount } from 'enzyme'
import App from './App'

describe('Test Suite', () => {
  it('Has at least one test', () => {
    const wrapper = mount(<App />)

    expect(wrapper.text()).toEqual('Hello World')
  })
})
