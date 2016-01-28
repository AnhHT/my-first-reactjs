import React from 'react'
import ReactDOM from 'react-dom'
import { createHistory } from 'history'
import { useRouterHistory } from 'react-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import { loginSuccess } from 'redux/modules/auth'

const historyConfig = { basename: __BASENAME__ }
const history = useRouterHistory(createHistory)(historyConfig)

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history })

let token = window.localStorage.getItem('token')
if (token !== null) {
  store.dispatch(loginSuccess({access_token: token}))
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
