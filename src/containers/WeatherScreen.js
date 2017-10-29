import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './weatherScreen.scss';

import WeatherToday from '../components/WeatherToday/WeatherToday'
import Forecast from './Forecast';


/**
 * Connection to Redux store
 * @return {object} passed to given component as props
 */
@connect(store => {
  return {
    weather: store.weather.data,
    placeImage: store.placeImage.data,
    placeName: store.placeName.data
  }
})


/**
 * WeatherScreen Container
 */
class WeatherScreen extends Component {

  /**
   * Constructor for WeatherScreen Class
   * @param  {object} props props passed from Redux store
   */
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
  /**
   * Disables form redirect after succesfull mount
   */
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


  /**
   * Accepts date string and returns abreviation of month
   * @param  {string} date string of date
   * @return {string}      abreviation of the month e.g. 'Jan.'
   */
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
    /**
     * Gets number representation of month (0-11)
     * @type {number}
     */
    const i = new Date(date).getMonth()
    /**
     * Returns value from months array based on key from i
     * @type {String}
     */
    return months[i]
  }
  /**
   * Render method of component rendering WeatherToday and Forecast components
   * @return ReactElement markup
   */
  render() {

    const { placeName, weather } = this.props
    const todaysDateObj = new Date() //new date object
    /**
     * Creating object to pass to WeatherToday component
     * @type {Object}
     */
    const todaysData = {
      day: this.getDayName(todaysDateObj),
      date: `${this.getMonthName(todaysDateObj)} ${todaysDateObj.getDate()}`,
      place: `${placeName.name}, ${placeName.countryCode}`,
      temp: `${weather.main.temp}`,
      icon: weather.weather[0].icon
    }

    /**
     * Style object for container
     * @type {Object}
     */
    const bgStyle={}
    /**
     * Checks if there is image of place available
     * @param  {Object} this.props.placeImage.urls is passed from Unsplash API if relevant image was found
     * @return {Object} if image available style object contains background-image property
     */
    if (this.props.placeImage.urls) {
      bgStyle.backgroundImage = `url(${this.props.placeImage.urls.custom})`
    }
    if (this.props.weather.coord) {
      return (
        <div style={bgStyle} className={style.weather_container}>
          <WeatherToday data={todaysData} />
          <Forecast getDayName={this.getDayName}/>
        </div>
      );
    } else {
      return (
        <div style={bgStyle} className={style.weather_container}>
          <h1>No data available, how about to <Link to='/'>search</Link> for a city?</h1>
        </div>
      )
    }

  }

}


export default WeatherScreen
