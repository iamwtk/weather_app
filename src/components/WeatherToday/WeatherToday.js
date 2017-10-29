import React from 'react'

import WeatherIcon from '../../components/WeatherIcon/WeatherIcon'

import style from './weatherToday.scss'

/**
 * Renders Widget for todays weather
 * @param props passed from ../containers/WeatherScreen
 */
const WeatherToday = (props) => {
  //Destructuring of props
  const { day, date, temp, place, icon } = props.data
  return (
    <div className={style.weather_today}>
      <div className={style.col_left}>
        <span className={style.day_name}>{day}</span>
        <span className={style.date}>{date}</span>
      </div>
      <div className={style.col_right}>
        <span className={style.temp}>{ Math.round(temp)}&#176;</span>
        <span className={style.place}>{place}</span>
        <WeatherIcon addClass={style.weather_icon} icon={icon} />
      </div>
    </div>
  )
}
export default WeatherToday
