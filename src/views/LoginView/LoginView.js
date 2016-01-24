import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import ReactDOM from 'react-dom'
import {Button} from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { actions as authActions } from '../../redux/modules/auth'
import classes from './LoginView.scss'

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

export class LoginView extends React.Component {
   static propTypes = {
     error: React.PropTypes.string,
     login: React.PropTypes.func.isRequired,
     isAuthenticating: React.PropTypes.bool,
     statusText: React.PropTypes.string,
     location: React.PropTypes.object
   };

   constructor (props) {
     super(props)
     const redirectRoute = this.props.location.query.next || '/login'
     this.state = {
       userName: '',
       password: '',
       redirectTo: redirectRoute
     }
   }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.login({userName: this.state.userName, password: this.state.password, redirectTo: this.state.redirectTo})
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
            <Input type='text' label='userName' name='userName' maxLength={16} />
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

export default connect(mapStateToProps, authActions)(LoginView)
