import React, {Component, PropTypes} from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import classes from './AccountView.scss'
import { actions as authActions } from '../../redux/modules/auth'

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.auth.isFetching,
  data: state.auth.data,
  statusText: state.auth.statusText
})

export class AccountView extends Component {

  static propTypes = {
    token: PropTypes.string,
    isFetching: PropTypes.bool,
    data: PropTypes.object,
    getUsers: PropTypes.func,
    logoutAndRedirect: PropTypes.func
  };

  componentWillMount () {
    this.props.getUsers()
  }

  handleLogout (evt) {
    evt.preventDefault()
    this.props.logoutAndRedirect()
  }

  render () {
    return (
      <div className={classes.container}>
        <h1>Account</h1>
        {
          !this.props.isFetching ? <h4>{this.props.data.user.fullName} - {this.props.data.user.email}</h4> : <h4>Waiting...</h4>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, authActions)(AccountView)
