import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './forecast.scss';

import ForecastSingle from '../components/ForecastSingle'





/**
 * Conects to Redux store and passes forecast data into props
 */
@connect(store => {
  return {
    forecast: store.forecast.data.list
  }
})

class Forecast extends Component {

  /**
   * Iterates through data received from OpenWeatherMap API and sorts daily data into forecastDays array
   * @param  {array} data OpenWeatherMap API response
   * @return {array} returns sorted array into single days with all data for given day
   */
  processData(data) {
    let x = 0 //iteration key for daily info (8)
    let d = 0 //iteration key for days (4)
    /**
     * Stores object for each day with arrays of weather data
     * @type {Array}
     */
    let forecastDays = [
      {day: '', temp: [], icon: []},
      {day: '', temp: [], icon: []},
      {day: '', temp: [], icon: []},
      {day: '', temp: [], icon: []}
    ]
    /**
     * Iterates through API response data
     * @type {function}
     */
    data.map( block => {
      const date = new Date(block.dt_txt).toDateString() //string of date in single block of weather data
      const today = new Date().toDateString() //string of todays date
      const temp = Math.round(block.main.temp) //Number - rounded temperature from weather data block
      const icon = block.weather[0].icon //String - description from weather data block
      /**
       * Compares todays date and date from data
       * checks if number of days is less then 4
       */
      if (date !== today && d < 4) {
        forecastDays[d].temp.push(temp) //adds temperature into array of given day object
        forecastDays[d].icon.push(icon) //adds weather description into array of given day object
        forecastDays[d].day.length === 0 ? forecastDays[d].day = this.props.getDayName(date) : null //if there is not day name in forecastDays add day name
        x++ //Increment of x iteration key
        x === 8 ? (d++, x = 0) : null //if x value is 8 reset x and increment d iteration key
      }
    })

    /**
     * Iterates through single days,
     * passes temp array to getHighestTemp method,
     * and overrides array with highest value
     * @type {function}
     */
    forecastDays.map(day => {
      const tempArr = day.temp //temp array from single day
      const iconArr = day.icon //array of icons in single day
      day.temp = this.getHighestTemp(tempArr) //override with highes value returned from getHighestTemp method
      day.icon = this.getMostCommon(iconArr) //overrides array with most common value from getMostCommon
    })


    return forecastDays
  }
  /**
   * Finds and returns highest number in given array
   * @param  {[array]} tempArr array of integer values - temperatures
   * @return {number}          highest value from given array
   */
  getHighestTemp(tempArr) {
    let max = 0 //stores maximum value from array
    /**
     * Iterates through array passed in tempArr parameter
     */
    for (var i = 0; i < tempArr.length; i++) {
      //compares current value against max and if > overrides max with current value
      tempArr[i] > max ? max = tempArr[i] : null
    }
    return max

  }
  /**
   * Gets array of all icons for whole day and selects icon which is most common,
   * regardless day or nigh (n/d) in its name
   * @param  {array} iconArr array of icons
   * @return {string}        icon which is most frequent in given array
   */
  getMostCommon(iconArr) {
    let mf = 1 //stores maximum frequency of element
    let x = 0 //counter
    let icon // stores icon name most times in iconArr
    //iterates through all elements
    for (var i = 0; i < iconArr.length; i++) {
      //iterates through rest of elements
      for (var y = 0; y < iconArr.length; y++) {
        let cur = iconArr[i].replace(/[a-z]/gi, '') //get current item & strip off day or night indicator (d/n)
        let com = iconArr[i].replace(/[a-z]/gi, '') //get item to compare  & strip off day or night indicator (d/n)
        cur === com ? x++ : null // compares current element with rest and if = increments counter
        mf < x ? (mf = x, icon = cur) : null //if counter is > maximum frequency of any of previous elements override item with current value
      }
      x = 0 //resets counter
    }

    return icon + 'd' //Return icon with day indicator (d)
  }

  render() {
    const data = this.processData(this.props.forecast)
    const dataRender = data.map((day, index) => {
      console.log(day);
      return <ForecastSingle data={day}  key={index} />
    })
    return (
      <div className ={style.forecast_container} >{dataRender}</div>
    );
  }

}

export default Forecast;
