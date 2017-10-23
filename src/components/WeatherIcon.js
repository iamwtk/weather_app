import React, { Component } from 'react';

/**
 * Loading SVG icons as Component via svg-react-loader in webpack
 * @type {Component}
 */
import IconDay01 from '-!svg-react-loader?name=MyIcon!../icons/day01.svg'
import IconNight01 from '-!svg-react-loader?name=MyIcon!../icons/night01.svg'
import IconDay02 from '-!svg-react-loader?name=MyIcon!../icons/day02.svg'
import IconNight02 from '-!svg-react-loader?name=MyIcon!../icons/night02.svg'
import IconDay03 from '-!svg-react-loader?name=MyIcon!../icons/day03.svg'
import IconNight03 from '-!svg-react-loader?name=MyIcon!../icons/night03.svg'
import IconDay04 from '-!svg-react-loader?name=MyIcon!../icons/day04.svg'
import IconNight04 from '-!svg-react-loader?name=MyIcon!../icons/night04.svg'
import IconDay09 from '-!svg-react-loader?name=MyIcon!../icons/day09.svg'
import IconNight09 from '-!svg-react-loader?name=MyIcon!../icons/night09.svg'
import IconDay10 from '-!svg-react-loader?name=MyIcon!../icons/day10.svg'
import IconNight10 from '-!svg-react-loader?name=MyIcon!../icons/night10.svg'
import IconDay11 from '-!svg-react-loader?name=MyIcon!../icons/day11.svg'
import IconNight11 from '-!svg-react-loader?name=MyIcon!../icons/night11.svg'
import IconDay13 from '-!svg-react-loader?name=MyIcon!../icons/day13.svg'
import IconNight13 from '-!svg-react-loader?name=MyIcon!../icons/night13.svg'
import IconDay50 from '-!svg-react-loader?name=MyIcon!../icons/day50.svg'
import IconNight50 from '-!svg-react-loader?name=MyIcon!../icons/night50.svg'

class WeatherIcon extends Component {

  constructor(props) {
    super(props)
    /**
     * Assigns SVG icon modules to icon codes received from OpenWeatherMap API
     * @type {Object}
     */
    this.icons = {
      '01d': IconDay01,
      '01n': IconNight01,
      '02d': IconDay02,
      '02n': IconNight02,
      '03d': IconDay03,
      '03n': IconNight03,
      '04d': IconDay04,
      '04n': IconNight04,
      '09d': IconDay09,
      '09n': IconNight09,
      '10d': IconDay10,
      '10n': IconNight10,
      '11d': IconDay11,
      '11n': IconNight11,
      '13d': IconDay13,
      '13n': IconNight13,
      '50d': IconDay50,
      '50n': IconNight50
    }
  }

  render() {
    /**
     * Gets Component from this.icons Object by key passed as a prop to WeatherIcon Component
     * then renders Component
     * if icon was not passed defaults to IconDay1
     * @type {Component}
     */
    let IconName;
    console.log(this.props);
    this.props.icon ?
      IconName = this.icons[this.props.icon] :
      IconName = IconDay01



    return <IconName className={this.props.addClass ? this.props.addClass : 'null'}/>

  }

}

export default WeatherIcon;
