import React from 'react'
import ReactDOM from 'react-dom'
import { createHistory, useBasename } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import { loginSuccess } from 'redux/modules/auth'

const history = useBasename(createHistory)({
  basename: __BASENAME__
})

const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(history, store, (state) => state.router)

let token = window.localStorage.getItem('token')
if (token !== null) {
  store.dispatch(loginSuccess({access_token: token}))
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
