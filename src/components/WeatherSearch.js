import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Link } from 'react-router-dom';

import ErrorModule from './ErrorModule';

import SearchIcon from '-!svg-react-loader?name=MyIcon!../icons/searchIcon.svg'

import style from './weatherSearch.scss';

const WeatherSearch = (props) => (
  <div className={style.search_container}>
    <div id='search_bar' className={style.search_bar}>
      <form onSubmit={props.handle} className={style.form}>
        <PlacesAutocomplete
        inputProps={props.inputProps}
        options={props.options}/>
        <button type="submit" className={style.search_button}><SearchIcon /></button>
      </form>
      { props.errors.length ? <ErrorModule errors={props.errors} /> : null}
    </div>
  </div>
)

export default WeatherSearch
