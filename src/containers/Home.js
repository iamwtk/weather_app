import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './home.scss';

const Home = () => (
  <div className={styles.home}>
  {console.log(styles)}
    <h1>Home page</h1>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/contact">Contact</NavLink>
    <NavLink to="/how-it-works">How it works</NavLink>
  </div>
);


export default Home
