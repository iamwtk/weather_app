import React, { PropTypes } from 'react'

import style from './errorModule.scss'

/**
 * <ErrorModule />
 * displays errors from array passed as props
 * @param {array} errors array of errors occured while fetching
 */
const ErrorModule = ({errors}) => (
  <div className={style.error_module}>
    <p>Sorry, there was an error!</p>
    {errors.map((err, i) => <span key={i}>{err.message}</span>)}
  </div>
)
export default ErrorModule
