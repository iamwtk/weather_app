import React from 'react'



import style from './errorModule.scss'

const ErrorModule = (props) => (
  <div className={style.error_module}>
  <p>Sorry, there was an error!</p>
  {props.errors.map((err, i) => <span key={i}>{err.message}</span>)}
  </div>
);

export default ErrorModule;
