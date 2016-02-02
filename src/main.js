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

let userInfoObj = JSON.parse(window.localStorage.getItem('userInfo'))
if (userInfoObj !== null) {
  store.dispatch(loginSuccess(userInfoObj))
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
