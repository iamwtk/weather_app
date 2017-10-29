import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Navigation from '../components/Navigation/Navigation';

import MenuIcon from '-!svg-react-loader?name=MyIcon!../icons/MenuIcon.svg'
import MenuIcon2 from '-!svg-react-loader?name=MyIcon2!../icons/MenuIcon2.svg'
import LogoIcon from '-!svg-react-loader?name=logoIcon!../icons/logoIcon.svg'

import style from './header.scss';

@connect(store => {
  return {
    forecast: store.forecast,
    weather: store.weather,
    navToggle: store.navToggle
  }
})

class Header extends Component {
  constructor(props) {
    super(props);
    this.navToggle = this.navToggle.bind(this)
    this.mobileCloseNav = this.mobileCloseNav.bind(this)
  }

  navToggle() {
    this.props.navToggle.toggle ?
    this.props.dispatch({type:'NAVIGATION_CLOSED'}) :
    this.props.dispatch({type:'NAVIGATION_OPEN'})
  }



  /**
   * Closes nav on mobile devices when user clicks on link
   */
  mobileCloseNav() {
    window.innerWidth < 992 ?
    this.props.dispatch({type:'NAVIGATION_CLOSED'}) : null
  }

  render() {
    const { navToggle, weather, forecast } = this.props

    return (
        <div className={style.container}>
        { navToggle.toggle ? <Navigation closeNav={this.mobileCloseNav} /> : null }
        { navToggle.toggle ? <MenuIcon2 onClick={this.navToggle} className={style.menu_icon_open} />
          : <MenuIcon onClick={this.navToggle} className={style.menu_icon} /> }
        <Link to='/'>
          <LogoIcon className={ forecast.fetching || weather.fetching ? style.logo_icon_loading : style.logo_icon }/>
        </Link>
        </div>
    )
  }
}


export default Header
