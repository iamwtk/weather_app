import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './navigation.scss';

const Navigation = (props) => (
  <div className={style.navigation}>
    <h1>Your best weather app</h1>
    <div className={style.separator}/>
    <ul>
      <li><NavLink onClick={props.closeNav} activeClassName={style.active} to='/about'>about</NavLink></li>
      <li><NavLink onClick={props.closeNav} activeClassName={style.active} to='/how-it-works'>how it works</NavLink></li>
      <li><NavLink onClick={props.toggleNav} activeClassName={style.active} to='/contact'>contact</NavLink></li>
    </ul>
  </div>
)

export default Navigation
