import React from 'react'
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

export class AccountView extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    isFetching: React.PropTypes.bool,
    data: React.PropTypes.Object,
    getUsers: React.PropTypes.func,
    logoutAndRedirect: React.PropTypes.func
  };

  componentWillMount () {
    this.fetchData()
  }

  fetchData () {
    let token = this.props.token
    this.props.getUsers(token)
  }

  handleLogout (evt) {
    evt.preventDefault()
    this.props.logoutAndRedirect()
  }

  render () {
    return (
      <div className={classes.container}>
        <h1>Account</h1>
        <p>Welcome to your account.</p>
        <p>List users</p>
        {
          this.props.isFetching === true
          ? <h4>Loading data...</h4>
          : <h4>{this.props.data.fullName} - {this.props.data.email}</h4>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, authActions)(AccountView)
