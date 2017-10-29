import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json';

import PlacesAutocomplete from 'react-places-autocomplete'
import WeatherSearch from './WeatherSearch'
import ErrorModule from '../ErrorModule/ErrorModule'

import style from './weatherSearch.scss'

describe('<WeatherSearch/>', () => {
  let component
  let errors = []
  const options = {}
  const handle = jest.fn()
  describe('Form', () => {
    it('Should call handle() on form submit', () => {
      component = shallow(<WeatherSearch handle={handle} errors={errors}/>)
      component.find('form').simulate('submit')
      expect(handle).toBeCalled()
    })
  })
  describe('Errors', () => {
    describe('No errors', () => {
      it('If no errors component <ErrorModule/> should not render', () => {
          expect(component.contains(<ErrorModule errors={errors}/>)).toBe(false)
      })
      it('should match the snapshot', () => {
        const tree = toJson(component)
        expect(tree).toMatchSnapshot()
      })
    })
    describe('Has errors', () => {
      it('If errors component should render <ErrorModule/> with errors as props', () => {
        errors = [{message: 'error 1'}]
        component = shallowu(<WeatherSearch handle={handle} errors={errors}/>)
        expect(component.contains(<ErrorModule errors={errors}/>)).toBe(true)
      })
      it('should match the snapshot', () => {
        const tree = toJson(component)
        expect(tree).toMatchSnapshot()
      })
    })
  })

});
