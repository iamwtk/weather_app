import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './weatherScreen.scss';

import WeatherToday from '../components/WeatherToday';
import Forecast from './Forecast';


@connect(store => {
  return {
    weather: store.weather.data,
    placeImage: store.placeImage.data,
    placeName: store.placeName.data
  }
})

class WeatherScreen extends Component {
  constructor(props) {
    super(props);
    this.getDayName = this.getDayName.bind(this)
    this.getMonthName = this.getMonthName.bind(this)
    this.coord = {
      lat: this.props.weather.coord.lat,
      lng: this.props.weather.coord.lon
    }
  }

  /**
   * Starts interval 30s on component mount
   */
  componentWillMount() {
    this.updateInterval = setInterval(() => this.props.update(this.coord),30000) //calls getData method from parent component Weather every 30s

  }
  componentDidMount() {
    this.props.dispatch({type: 'FORM_REDIRECT_DISABLED'})
  }
  /**
   * Resets Interval on unmount
   */
  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }


  /**
   * Accepts date string and returns name of the day
   * @param  {string} date string of date
   * @return {string}      name of the day e.g. 'Monday'
   */
  getDayName(date) {
    /**
     * Array containing all day name
     * @type {Array}
     */
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    /**
     * Gets number representation of week day (0-6) Sunday = 0
     * @type {number}
     */
    const i = new Date(date).getDay()

    /**
     * Returns value from days array based on key from i
     * @type {String}
     */
    return days[i]
  }



  getMonthName(date) {
    //array of months of the year
    const months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.'
    ]
    //get day index
    const i = new Date(date).getMonth()
    //return day from array by index
    return months[i]
  }

  render() {
    const { placeName, weather } = this.props
    const todaysDateObj = new Date()
    const todaysData = {
      day: this.getDayName(todaysDateObj),
      date: `${this.getMonthName(todaysDateObj)} ${todaysDateObj.getDate()}`,
      place: `${placeName.name}, ${placeName.countryCode}`,
      temp: `${weather.main.temp}`,
      icon: weather.weather[0].icon
    }
    console.log(this.props);
    const bgStyle={}

    if (this.props.placeImage.urls) {
      bgStyle.backgroundImage = `url(${this.props.placeImage.urls.custom})`
    }


    return (
      <div style={bgStyle} className={style.weather_container}>
        <WeatherToday data={todaysData} />
        <Forecast getDayName={this.getDayName}/>
      </div>

    );
  }

}


export default WeatherScreen
