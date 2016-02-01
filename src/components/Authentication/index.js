import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replacePath } from 'react-router-redux'

export function requireAuthentication (Component) {
  class AuthenticateComponent extends React.Component {

    componentWillMount () {
      this.checkAuth()
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth()
    }

    checkAuth () {
      console.log(this.props)
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        console.log(redirectAfterLogin)
        this.props.dispatch(replacePath(`/login?next=${redirectAfterLogin}`))
      }
    }

    render () {
      return (
      <div>
        {this.props.isAuthenticated === true
           ? <Component {...this.props}/>
           : null}
      </div>
      )
    }
  }

  AuthenticateComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object
  }

  function mapStateToProps (state) {
    return {
      token: state.auth.token,
      userName: state.auth.userName,
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps)(AuthenticateComponent)
}
