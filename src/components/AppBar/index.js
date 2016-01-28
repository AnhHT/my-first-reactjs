import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import { Link } from 'react-router'
import Navigation from '../navigation'
import style from './style'

const MainAppBar = (props) => (
  <AppBar className={style.appbar} flat>
    <Link to='/'><h2 className={style.title}>My Web App</h2></Link>
    <Navigation activeClassName={style.active} className={style.navigation} isAuthenticated={props.isAuthenticated} logoutAndRedirect={props.logoutAndRedirect} />
  </AppBar>
)

MainAppBar.propTypes = {
  activeClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  isAuthenticated: React.PropTypes.bool,
  logoutAndRedirect: React.PropTypes.func
}

export default MainAppBar
