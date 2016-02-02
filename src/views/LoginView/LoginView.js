import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import ReactDOM from 'react-dom'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { actions as authActions } from '../../redux/modules/auth'
import classes from './LoginView.scss'

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const form = reduxForm({
  form: 'loginForm',
  fields: ['email', 'password'],
  validate (state) {
    let errors = {}
    if (!state.email) {
      errors.email = 'Email is required'
    }

    if (!state.password) {
      errors.password = 'Password is required'
    }

    return errors
  }
})

class LoginView extends Component {
   static propTypes = {
     error: PropTypes.string,
     login: PropTypes.func.isRequired,
     isAuthenticating: PropTypes.bool,
     statusText: PropTypes.string,
     location: PropTypes.object,
     initializeForm: PropTypes.func
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

  componentWillMount () {
    this.props.initializeForm({
      email: null,
      password: null
    })
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
            <Input type='text' label='Email' name='email' />
            <Input type='password' label='Password' name='password' />
            <Button label='Login' raised primary />
          </form>
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps, authActions)(form(LoginView))
