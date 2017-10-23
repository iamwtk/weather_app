import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { getWeather, getForecast } from '../actions/weatherAction'
import { getPlaceImage, getShortName } from '../actions/placeAction'

import Header from './Header'
import WeatherSearch from '../components/WeatherSearch'
import WeatherScreen from './WeatherScreen'




@connect(store => {
  return {
    forecast: store.forecast,
    weather: store.weather,
    formRedirect: store.formRedirect
  }
})

class Weather extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.getData = this.getData.bind(this)
    this.state = {address: ''}
    this.onChange = (address) => this.setState({ address })
  }

  getData(coord) {
    this.props.dispatch(getWeather(coord))
    this.props.dispatch(getForecast(coord))
  }

  getImage(place) {
    this.props.dispatch(getPlaceImage(place))
  }

  handleFormSubmit(event) {
      //prevent html submit
      event.preventDefault()
      //handle place search
      geocodeByAddress(this.state.address)
        .then(results => {
          //Get place short name
          const placeName = results[0].address_components[0].short_name
          //Get Country code
          let countryCode = ''
          //if country code available set else leave empty string
          { results[0].address_components[3]
           && results[0].address_components[3].short_name ?
            countryCode = results[0].address_components[3].short_name :
             null }

          //create payload object
          const payload = {name: placeName, countryCode: countryCode}
          //Save name into store
          this.props.dispatch({type: 'GET_PLACE_NAME', payload: payload})
          this.props.dispatch({type: 'FORM_REDIRECT_ENABLED'})
          //getImage by name
          this.getImage(placeName)
          //return object with lat and Lng
          return getLatLng(results[0])
        })
        .then(latLng => this.getData(latLng))
        .catch(err => console.error('error' + err))

  }



  hasErrors() {
    if ( this.props.weather.error || this.props.forecast.error ) {
      return true
    } else {
      return false
    }
  }

  getErrors() {
    const { weather, forecast } = this.props
    let errors = []
    if (this.hasErrors()) {
      weather.error ? errors.push(weather.error) : null
      forecast.error ? errors.push(forecast.error) : null
    }
    return errors
  }

  isLoading() {
    if ( this.props.weather.fetching || this.props.forecast.fetching ) {
      return true
    } else {
      return false
    }
  }

  isFetched() {
    if ( this.props.weather.fetched && this.props.forecast.fetched ) {
      return true
    } else {
      return false
    }
  }

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
        {this.shouldRedirect() ?
          <Redirect to='/weather' /> : null
        }
      </div>

    );
  }

}

export default Weather
