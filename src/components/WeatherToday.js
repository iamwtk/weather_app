import React from 'react';

import WeatherIcon from '../components/WeatherIcon';

import style from './weatherToday.scss';

/**
 * Renders Widget for todays weather
 * @param props passed from ../containers/WeatherScreen
 */
const WeatherToday = (props) => (
  <div className={style.weather_today}>
    <div className={style.col_left}>
      <span className={style.day_name}>{props.data.day}</span>
      <span className={style.date}>{props.data.date}</span>
    </div>
    <div className={style.col_right}>
      <span className={style.temp}>{ Math.round(props.data.temp)}&#176;</span>
      <span className={style.place}>{props.data.place}</span>
      <WeatherIcon addClass={style.weather_icon} icon={props.data.icon} />
    </div>
  </div>
);

export default WeatherToday;
