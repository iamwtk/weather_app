import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './navigation.scss'

/**
 * <Navigation />
 * displays side navigation with link to sub pages
 * @param {function} closeNav dispatches action to close navigation on displays < 992px
 */
const Navigation = ({closeNav}) => {
  /**
   * Heading displayed in the upper part of application window
   * @type {String}
   */
  const heading = 'Your best weather app'
  /**
   * Array of pages and given paths
   * @type {Array}
   */
  const pages = [
    {text: 'about', path: '/about'},
    {text: 'how it works', path: '/how-it-works'},
    {text: 'contact', path: '/contact'}
  ]
  /**
   * Maps pages into NavLink elements
   * @type {ReactMarkup}
   */
  const links = pages.map((page, i) =>
    <li key={'page-'+i}><NavLink key={'link-'+i} onClick={closeNav} activeClassName={style.active} to={page.path}>{page.text}</NavLink></li>
  )
  /**
   * Displays markup of Navigation
   * @type {ReactMarkup}
   */
  return (
    <div className={style.navigation}>
      <h1>{heading}</h1>
      <div className={style.separator}/>
      <ul>
        {links}
      </ul>
    </div>
  )
}

export default Navigation
