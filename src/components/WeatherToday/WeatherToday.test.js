import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import WeatherToday from './WeatherToday'

import WeatherIcon from '../../components/WeatherIcon/WeatherIcon'

import style from './weatherToday.scss'


describe('<WeatherToday/>', () => {
  const data = {
    day: 'Monday',
    date: 'Oct. 25',
    temp: 32.25,
    place: 'Liberec, CZ',
    icon: '01n'
  }
  let component
  beforeEach(() => {
    component = shallow(<WeatherToday data={data}/>)
  })
  describe('Snapshot', () => {
    it('Should match snapshot', () => {
      const tree = toJson(component)
      expect(tree).toMatchSnapshot()
    })
  })
})
