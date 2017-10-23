import React from 'react'

import Header from '../containers/Header'

import style from './samplePages.scss';

const AboutPage = () => (
  <div>
    <Header/>
    <div className={style.page}>
      About us
    </div>

  </div>
)

export default AboutPage
