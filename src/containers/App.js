import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Header from './Header'

import Weather from './Weather'
import AboutPage from '../components/AboutPage'
import ContactPage from '../components/ContactPage'
import HowItWorksPage from '../components/HowItWorksPage'


/**
 * Main Container Component, renders specific component based on the browser path
 */
class App extends Component {

  render() {
    return (
      <div>
      <Switch>
        <Route path="/" exact component={Weather} />
        <Route path="/weather" exact component={Weather} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/how-it-works" exact component={HowItWorksPage} />
        <Route path="/contact" exact component={ContactPage} />
      </Switch>
      </div>
    )
  }

}

export default App
