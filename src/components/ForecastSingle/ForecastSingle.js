import React from 'react'

import WeatherIcon from '../WeatherIcon/WeatherIcon'

import style from './forecastSingle.scss'

/**
 * ForecastSingle React component
 * Renders single widget for daily forecast
 * @param {object} props object with data to display
 */
const ForecastSingle = (props) => {
  const { day, icon, temp } = props.data
  return (
    <div className={style.forecast_single}>
      <span key={day} className={style.day}>{day}</span>
      <WeatherIcon icon={icon} key={icon} addClass={style.weather_icon}/>
      <span key={temp} className={style.temp}>{temp}&#176;</span>
    </div>
  )
}
export default ForecastSingle
