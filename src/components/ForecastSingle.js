import React from 'react'

import WeatherIcon from './WeatherIcon';

import style from './forecastSingle.scss';

const ForecastSingle = (props) => (
  <div className={style.forecast_single}>
    <span key={props.data.day} className={style.day}>{props.data.day}</span>
    <WeatherIcon icon={props.data.icon} key={props.data.icon} addClass={style.weather_icon}/>
    <span key={props.data.temp} className={style.temp}>{props.data.temp}&#176;</span>
  </div>
);

export default ForecastSingle
