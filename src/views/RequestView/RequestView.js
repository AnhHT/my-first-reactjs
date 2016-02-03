import React, {Component, PropTypes} from 'react'
import classes from './RequestView.scss'

export class RequestView extends Component {
  render () {
    return (
    <div className={classes.container}>
      <h1>This is the request view!</h1>
    </div>
    )
  }
}

export default RequestView