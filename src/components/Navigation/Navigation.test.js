import React from 'react'
import { shallow, mount } from 'enzyme'
import { NavLink } from 'react-router-dom';
import toJson from 'enzyme-to-json'

import Navigation from './Navigation'

import style from './navigation.scss'

describe('<Navigation />', () => {
  let component
  let i = 0
  function closeNav() {
    i++
  }
  beforeEach(() => {
    component = shallow(<Navigation closeNav={closeNav} />)
  })
  describe('Behaviour', () => {
    it('Should call closeNav function onclick on each NavLink(3) ', () => {
      const links = component.find(NavLink)
      links.map(link => {
        link.simulate('click')
      })      
      expect(i).toBe(3)
    })
  })
  describe('Snapshot', () => {
    it('Should match the Snapshot', () => {
      const tree = toJson(component)
      expect(tree).toMatchSnapshot()
    });
  });
})
