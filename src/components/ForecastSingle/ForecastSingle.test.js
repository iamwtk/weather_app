import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ForecastSingle from './ForecastSingle'
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import style from './forecastSingle.scss'


describe('<ForecastSingle />', () => {
  let component
  const data = {
    day: 'Monday',
    icon: '05n',
    temp: '23'
  }
  
  beforeEach(() => {
    component = shallow(<ForecastSingle data={data}/>)
  })

  describe('Snapshot', () => {
    it('should match the snapshot', () => {
      const tree = toJson(component)
      expect(tree).toMatchSnapshot()
    })
  })
})
