import React from 'react'
import classes from './AboutView.scss'

export class AboutView extends React.Component {
  render () {
    return (
    <div className={classes.container}>
      <h1>This is the about view!</h1>
      <hr />
      <p>
        A simple web-app to demo authentication.
      </p>
    </div>
    )
  }
}

export default AboutView
