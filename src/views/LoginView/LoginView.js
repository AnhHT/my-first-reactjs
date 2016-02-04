import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import ReactDOM from 'react-dom'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { actions as authActions } from '../../redux/modules/auth'
import { push } from 'react-router-redux'
import classes from './LoginView.scss'

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const form = reduxForm({
  form: 'loginForm',
  fields: ['email', 'password'],
  touchOnChange: true,
  validate (state) {
    let errors = {}
    if (!state.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
      errors.email = 'Invalid email address'
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
     fields: PropTypes.object.isRequired,
     dispatch: PropTypes.func.isRequired,
     valid: PropTypes.bool
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
    if (this.props.valid) {
      this.props.login(this.state)
    }
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRegister (e) {
    e.preventDefault()
    this.props.dispatch(push('/signup'))
  }

  render () {
    const {fields: {email, password}} = this.props
    return (
      <div className={classes.container}>
        <h1>Login</h1>
        <section>
          <form
            onSubmit={::this.handleSubmit}
            onChange={::this.handleChange}>
            {this.props.statusText ? <div>{this.props.statusText}</div> : ''}
            <Input type='text' label='Email' {...email} />
            <Input type='password' label='Password' {...password} />
            <Button label='Login' raised primary />
            {' '}
            <Button label='Register' raised accent onClick={::this.handleRegister} />
          </form>
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps, authActions)(form(LoginView))
