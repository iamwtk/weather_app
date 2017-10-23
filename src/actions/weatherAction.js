import axios from 'axios'
import { openweathermap as apikey} from "../apikeys.js"

export function getWeather(coord, name) {
    return function(dispatch) {

      const lat = coord.lat
      const lng = coord.lng
      const url = 'https://api.openweathermap.org/data/2.5/weather'
      const getUrl = `${url}?lat=${lat}&lon=${lng}&units=metric&APPID=${apikey}`

      dispatch({type: 'GET_WEATHER'})

      axios.get(getUrl)
        .then(res => {
          dispatch({type: 'GET_WEATHER_FULLFILLED', payload: res.data})
        })
        .catch(err => {
          dispatch({type: 'GET_WEATHER_REJECTED', payload: err})

        })
    }
}
export function getForecast(coord) {
    return function(dispatch) {

      const lat = coord.lat
      const lng = coord.lng
      const url = 'https://api.openweathermap.org/data/2.5/forecast'      
      const getUrl = `${url}?lat=${lat}&lon=${lng}&units=metric&APPID=${apikey}`

      dispatch({type: 'GET_FORECAST'})

      axios.get(getUrl)
        .then(res => {
          dispatch({type: 'GET_FORECAST_FULLFILLED', payload: res.data})
        })
        .catch(err => {
          dispatch({type: 'GET_FORECAST_REJECTED', payload: err})

        })
    }
}
