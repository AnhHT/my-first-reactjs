import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import DatePicker from 'react-toolbox/lib/date_picker'
import { actions as authActions } from '../../redux/modules/auth'
import { reduxForm } from 'redux-form'
import classes from './SignupView.scss'

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const form = reduxForm({
  form: 'login',
  fields: ['email', 'password', 'fullName', 'dob', 'pin'],
  validate (state) {
    const errors = {}
    if (!state.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
      errors.email = 'Invalid email address'
    }

    if (!state.password) {
      errors.password = 'Password is required'
    }

    if (!state.pin) {
      errors.pin = 'PIN is required'
    } else if (!/^[0-9]{4}$/i.test(state.pin)) {
      errors.pin = 'Use number only.'
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
     fields: PropTypes.object.isRequired,
     location: PropTypes.object,
     valid: PropTypes.bool
   };

   constructor (props) {
     super(props)
     const redirectRoute = this.props.location.query.next || '/signup'
     this.state = {
       email: '',
       password: '',
       fullName: '',
       dob: new Date(),
       pin: '',
       redirectTo: redirectRoute
     }
   }

  handleSubmit (evt) {
    evt.preventDefault()
    if (this.props.valid) {
      this.props.signup(this.state)
    }
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  dateChange (item, value) {
    this.setState({ ...this.state, [item]: value })
  }

  render () {
    const {fields: {email, password, fullName, pin}} = this.props
    return (
      <div className={classes.container}>
        <h1>Signup</h1>
        <section>
          <form
            onSubmit={::this.handleSubmit}
            onChange={::this.handleChange}>
            {this.props.statusText ? <div>{this.props.statusText}</div> : ''}
            <Input type='text' label='Email' {...email} />
            <Input type='password' label='Password' {...password} />
            <Input type='text' label='Full Name' {...fullName} />
            <DatePicker label='Birthdate' onChange={this.dateChange.bind(this, 'dob')} value={this.state.dob} name='dob' />
            <Input type='password' label='PIN' {...pin} maxLength={4} />
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
