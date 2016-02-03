import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import { requireAuthentication } from 'components/Authentication'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import AuthLayout from 'layouts/AuthLayout/AuthLayout'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import HomeView from 'views/HomeView/HomeView'
import AboutView from 'views/AboutView/AboutView'
import LoginView from 'views/LoginView/LoginView'
import SignupView from 'views/SignupView/SignupView'
import AccountView from 'views/AccountView/AccountView'
import RequestView from 'views/RequestView/RequestView'

export default (
<Route>
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={requireAuthentication(HomeView)} />
    <Route path='/about' component={AboutView} />
    <Route path='/account' component={requireAuthentication(AccountView)} />
    <Route path='/request' component={requireAuthentication(RequestView)} />
  </Route>
  <Route path='/auth' component={AuthLayout}>
	<Route path='/login' component={LoginView} />
	<Route path='/signup' component={SignupView} />
  </Route>
  <Route path='/404' component={NotFoundView} />
  <Redirect from='*' to='/404' />
</Route>
)
