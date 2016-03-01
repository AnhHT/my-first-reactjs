import React from 'react'
import { Link } from 'react-router'

const Navigation = (props) => {
  const isLoggedIn = props.isAuthenticated
  return (
    <nav className={props.className}>
      <ul>
        { !isLoggedIn && <li><Link activeClassName={props.activeClassName} to='/login'>Login</Link></li> }
        { isLoggedIn && <li><Link activeClassName={props.activeClassName} to='/account'>Account</Link></li> }
        { isLoggedIn && <li><Link activeClassName={props.activeClassName} to='/request'>Collections</Link></li> }
        <li><Link activeClassName={props.activeClassName} to='/about'>About</Link></li>
        { isLoggedIn && <li><a href='#' onClick={props.logoutAndRedirect}>Logout</a></li> }
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  activeClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  isAuthenticated: React.PropTypes.bool,
  logoutAndRedirect: React.PropTypes.func
}

Navigation.defaultProps = {
  activeClassName: '',
  className: ''
}

export default Navigation
