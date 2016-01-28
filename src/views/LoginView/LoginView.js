import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import ReactDOM from 'react-dom'
import {Button} from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { actions as authActions } from '../../redux/modules/auth'
import classes from './LoginView.scss'

export const fields = ['email', 'password']
const validate = state => {
  const errors = {}
  if (!state.email) {
    errors.email = 'Email is required'
  }

  if (!state.password) {
    errors.password = 'Password is required'
  }

  return errors
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

class LoginView extends Component {
   static propTypes = {
     error: PropTypes.string,
     login: PropTypes.func.isRequired,
     isAuthenticating: PropTypes.bool,
     statusText: PropTypes.string,
     location: PropTypes.object
   };

   constructor (props) {
     super(props)
     const redirectRoute = this.props.location.query.next || '/login'
     this.state = {
       email: '',
       password: '',
       redirectTo: redirectRoute
     }
   }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.login({email: this.state.email, password: this.state.password, redirectTo: this.state.redirectTo})
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className={classes.container}>
        <h1>Login</h1>
        <section>
          <form
            onSubmit={::this.handleSubmit}
            onChange={::this.handleChange}>
            {this.props.statusText ? <div>{this.props.statusText}</div> : ''}
            <Input type='text' label='Email' name='email' maxLength={16} />
            <Input type='password' label='Password' name='password' />
            <Button raised primary>
              Login
            </Button>
          </form>
        </section>
      </div>
    )
  }
}

const formReduce = reduxForm({
  form: 'loginForm',
  fields,
  validate
})(LoginView)

export default connect(mapStateToProps, authActions)(formReduce)
