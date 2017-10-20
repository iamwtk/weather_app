import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import HowItWorks from './HowItWorks';

class App extends Component {

  render() {
    return (
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/how-it-works" component={HowItWorks} />
      </div>
    );
  }

}

export default App;
