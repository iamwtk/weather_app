import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Link } from 'react-router-dom'

import ErrorModule from '../ErrorModule/ErrorModule'

import SearchIcon from '-!svg-react-loader?name=MyIcon!../../icons/searchIcon.svg'

import style from './weatherSearch.scss'


/**
 * WeatherSearch Component - shows search bar form
 * @param {Object} props passed by parent component
 */
const WeatherSearch = (props) => {
  //Destructuring of props
  const { handle, inputProps, options, errors } = props
  return (
    <div className={style.search_container}>
      <div id='search_bar' className={style.search_bar}>
        <form onSubmit={handle} className={style.form}>
          <PlacesAutocomplete
          inputProps={inputProps}
          options={options}/>
          <button type="submit" className={style.search_button}><SearchIcon /></button>
        </form>
        { errors.length ? <ErrorModule errors={errors} /> : null}
      </div>
    </div>
  )
}
export default WeatherSearch
