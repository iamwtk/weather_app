import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json';

import ErrorModule from './ErrorModule'
import style from './errorModule.scss'

describe('<ErrorModule/>', () => {
  let component
  const errors = [
    {message: "error 1"},
    {message: "error 2"}
  ]
  
  beforeEach(() => {
    component = shallow(<ErrorModule errors={errors}/>)
  })

  describe('Snapshot', () => {
    it('should match the snapshot', () => {
      const tree = toJson(component)
      expect(tree).toMatchSnapshot()
    })
  })
})
