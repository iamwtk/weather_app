import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { getWeather, getForecast } from '../actions/weatherAction'
import { getPlaceImage, getShortName } from '../actions/placeAction'

import Header from './Header'
import WeatherSearch from '../components/WeatherSearch/WeatherSearch'
import WeatherScreen from './WeatherScreen'



/**
 * Connection to Redux store
 * @return {object} passed to given component as props
 */
@connect(store => {
  return {
    forecast: store.forecast,
    weather: store.weather,
    formRedirect: store.formRedirect
  }
})

/**
 * Weather Container
 * contains all main functions of application
 */

class Weather extends Component {

  /**
   * Constructor for Weather Class
   * @param  {object} props props passed from Redux store
   */
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.getData = this.getData.bind(this)

    this.state = {address: ''} //sets default state for Address in WeatherSearch
    this.onChange = (address) => this.setState({ address }) //handles change on input and changes state
  }


  /**
   * Dispatches Actions from ../actions/weatherActions
   * @param  {object} coord object containing lat and lng of searched location
   */
  getData(coord) {
    this.props.dispatch(getWeather(coord))
    this.props.dispatch(getForecast(coord))
  }

  /**
   * Dispatches Action from ../actions/placeActions
   * @param  {string} place short name of searched location
   */
  getImage(place) {
    this.props.dispatch(getPlaceImage(place))
  }

  /**
   * Handles submit of search field
   * @param  {object} event object of submit event
   */
  handleFormSubmit(event) {
      //prevents html submit
      event.preventDefault()
      //handle place search
      geocodeByAddress(this.state.address)
        .then(results => {
          //Get place short name
          const placeName = results[0].address_components[0].long_name
          //Get Country code
          let countryCode = ''
          //if country code available set else leave empty string
          { results[0].address_components[3]
           && results[0].address_components[3].short_name ?
            countryCode = results[0].address_components[3].short_name :
             countryCode = results[0].address_components[2].short_name }

          //create payload object
          const payload = {name: placeName, countryCode: countryCode}
          //Save name into store
          this.props.dispatch({type: 'GET_PLACE_NAME', payload: payload})
          //enable redirect
          this.props.dispatch({type: 'FORM_REDIRECT_ENABLED'})
          //getImage by name
          this.getImage(placeName)
          //return object with lat and Lng
          return getLatLng(results[0])
        })
        .then(latLng =>
          //send lat and lng object to getData function
          this.getData(latLng)
        )
        .catch(err =>
          //If error console error :IDEA handle error on front end
          console.error('error' + err))

  }

 /**
  * Checks if API call for weather or forecast returned error
  * @return {Boolean} was ther error? true | false
  */
  hasErrors() {
    if ( this.props.weather.error || this.props.forecast.error ) {
      return true
    } else {
      return false
    }
  }

  /**
   * If there were fetching errors create array of errors :IDEA combine with hasErros function.
   * @return {array} array of fetching errors
   */
  getErrors() {
    const { weather, forecast } = this.props
    let errors = []
    if (this.hasErrors()) {
      weather.error ? errors.push(weather.error) : null
      forecast.error ? errors.push(forecast.error) : null
    }
    return errors
  }

  /**
   * Checks if API call to weather or forecast is fetching
   * @return {Boolean} is API fetching? true | false
   */
  isLoading() {
    if ( this.props.weather.fetching || this.props.forecast.fetching ) {
      return true
    } else {
      return false
    }
  }

  /**
   * Checks is API fetched succesfully data
   * @return {Boolean} is data fetched? true | false
   */
  isFetched() {
    if ( this.props.weather.fetched && this.props.forecast.fetched ) {
      return true
    } else {
      return false
    }
  }

  /**
   * Checks if API call ended and was succesful
   * checks if path is not /weather and if form submit allowed redirect
   * @return {Boolean} is redirect ready? true | false
   */
  shouldRedirect() {
    if(!this.hasErrors()
    && !this.isLoading()
    && this.isFetched()
    && this.props.location.pathname !== '/weather'
    && this.props.formRedirect.redirect) {
      return true
    } else {
      return false
    }

  }

  /**
   * Render method of component rendering WeatherSearch on '/' path or Weather screen on '/weather'
   * @return ReactElement markup
   */
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Type a city...'
    }
    const options = {
      types: ['(cities)']
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={(props) => (
              <WeatherSearch {...props}
              handle={this.handleFormSubmit}
              inputProps={inputProps}
              options={options}
              errors={this.getErrors()}/>
          )}/>
          <Route exact path='/weather' render={(props) => (
              <WeatherScreen {...props} update={this.getData}/>
          )}/>
        </Switch>
        {//if redirect is enabled redirect to '/weather'
          this.shouldRedirect() ?
          <Redirect to='/weather' /> : null
        }
      </div>

    );
  }

}

export default Weather
