import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import weather from './weatherNowReducer'
import forecast from './forecastReducer'
import placeImage from './placeImageReducer'
import placeName from './placeNameReducer'
import formRedirect from './formRedirectReducer'
import navToggle from './navToggleReducer'


export default combineReducers({
  weather,
  forecast,
  placeImage,
  placeName,
  formRedirect,
  navToggle
})
