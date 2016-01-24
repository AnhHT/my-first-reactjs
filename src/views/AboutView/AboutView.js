import React from 'react'
import classes from './AboutView.scss'

export class AboutView extends React.Component {
  render () {
    return (
    <div className={classes.container}>
      <h1>This is the about view!</h1>
      <hr />
      <p>
        We are GOSEI Vietnam Joint Stock Company, a company incorporated on March 25th, 2013 by the members who have rich experience in creating software products of high
        applicability and supplying the same to Japanese customers. We aim to create software products and services with high quality and reasonable prices that satisfy
        the needs of all the customers.
      </p>
    </div>
    )
  }
}

export default AboutView
