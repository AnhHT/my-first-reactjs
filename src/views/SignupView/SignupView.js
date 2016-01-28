import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import ReactDOM from 'react-dom'
import {Button} from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { actions as authActions } from '../../redux/modules/auth'
import { reduxForm } from 'redux-form'
import classes from './SignupView.scss'

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const form = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate (state) {
    const errors = {}
    if (!state.email) {
      errors.email = 'Email is required'
    }

    if (!state.password) {
      errors.password = 'Password is required'
    }

    return errors
  }
})

export class SignupView extends Component {
   static propTypes = {
     error: PropTypes.string,
     signup: PropTypes.func.isRequired,
     isAuthenticating: PropTypes.bool,
     statusText: PropTypes.string,
     location: PropTypes.object
   };

   constructor (props) {
     super(props)
     const redirectRoute = this.props.location.query.next || '/signup'
     this.state = {
       email: '',
       password: '',
       redirectTo: redirectRoute
     }
   }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.signup({email: this.state.email, password: this.state.password, redirectTo: this.state.redirectTo})
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className={classes.container}>
        <h1>Signup</h1>
        <section>
          <form
            onSubmit={::this.handleSubmit}
            onChange={::this.handleChange}>
            {this.props.statusText ? <div>{this.props.statusText}</div> : ''}
            <Input type='text' label='Email' name='email' maxLength={16} />
            <Input type='password' label='Password' name='password' />
            <Button raised primary>
              Signup
            </Button>
          </form>
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps, authActions)(form(SignupView))
