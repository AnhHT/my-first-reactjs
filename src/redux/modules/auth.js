import { createAction, handleActions } from 'redux-actions'
// import { propertySelector } from '../utils/reselect'
import Immutable from 'immutable'
// import jwtDecode from 'jwt-decode'
import { pushPath } from 'redux-simple-router'
// import * as promise from 'es6-promise'
// promise.polyfill()
import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'

export const AUTH_SIGNUP_REQUEST = 'AUTH_SIGNUP_REQUEST'
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'
export const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE'

export const FETCH_USERS_DATA_REQUEST = 'FETCH_USERS_DATA_REQUEST'
export const RECEIVE_USERS_DATA_SUCCESS = 'RECEIVE_USERS_DATA_SUCCESS'
export const RECEIVE_USERS_DATA_FAILURE = 'RECEIVE_USERS_DATA_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export const loginRequest = createAction(AUTH_LOGIN_REQUEST, (data) => data)
export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS, (data) => data)
export const loginFailure = createAction(AUTH_LOGIN_FAILURE, (err) => err)
export const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS)
export const signupRequest = createAction(AUTH_SIGNUP_REQUEST, (data) => data)
export const signupSuccess = createAction(AUTH_SIGNUP_SUCCESS, ({ token }) => ({token}))
export const signupFailure = createAction(AUTH_SIGNUP_FAILURE, (err) => err)
export const getUsersRequest = createAction(FETCH_USERS_DATA_REQUEST, (data) => data)
export const getUsersSuccess = createAction(RECEIVE_USERS_DATA_SUCCESS, (data) => data)
export const getUsersFailure = createAction(RECEIVE_USERS_DATA_FAILURE, (err) => err)

export const actions = {login, logoutAndRedirect, signup, getUsers}

const initialState = Immutable.fromJS({
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
})

function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

function serialize (data) {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&')
}

export function login (data = {email: '', password: '', redirect: '/'}) {
  return (dispatch, getState) => {
    // Login remote
    dispatch(loginRequest(data))
    return fetch('http://pn.quandh.com:80/api/users/login?include=user', {
      method: 'post',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: serialize({
        'email': data.email,
        'password': data.password
      })
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          // let decoded = jwtDecode(response.access_token)
          window.localStorage.setItem('token', response.access_token)
          dispatch(loginSuccess(response))
          // dispatch(pushPath(data.redirect))
          dispatch(pushPath('/account'))
        } catch (e) {
          dispatch(loginFailure({
            status: 403,
            statusText: 'Invalid token'
          }))
        }
      })
      .catch(error => {
        window.localStorage.removeItem('token')
        dispatch(loginFailure({
          status: 401,
          statusText: error.message
        }))
      })
  }
}

export function logoutAndRedirect () {
  window.localStorage.removeItem('token')
  return (dispatch, getState) => {
    window.localStorage.removeItem('token')
    dispatch(logoutSuccess())
    dispatch(pushPath('/login'))
  }
}

export function signup (data = {email: '', password: '', redirect: '/'}) {
  return (dispatch, getState) => {
    // signup Fake
    dispatch(signupRequest(data))
    if (data.email !== '' && data.password !== '') {
      let token = '12345689'
      window.localStorage.setItem('token', token)
      dispatch(signupSuccess({token}))
      dispatch(pushPath('/account'))
    // dispatch(pushPath(data.redirect))
    } else {
      window.localStorage.removeItem('token')
      dispatch(loginFailure({
        status: 403,
        statusText: 'Signup Failure!'
      }))
    }
  }
}

export function getUsers (token) {
  return (dispatch, state) => {
    dispatch(getUsersRequest(token))
    return fetch('http://pn.quandh.com:80/api/users', {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(getUsersSuccess(response))
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(getUsersFailure(error))
        }
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [AUTH_LOGIN_REQUEST]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    })
  },
  [AUTH_LOGIN_SUCCESS]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.access_token,
      // 'userName': payload.userName,
      'userName': 'admin',
      'statusText': 'You have been successfully logged in.'
    })
  },
  [AUTH_LOGIN_FAILURE]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    })
  },
  [AUTH_LOGOUT_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': 'You have been successfully logged out.'
    })
  },
  [AUTH_SIGNUP_REQUEST]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    })
  },
  [AUTH_SIGNUP_SUCCESS]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.access_token,
      // 'userName': jwtDecode(payload.token).userName,
      'userName': 'admin',
      'statusText': 'You have been successfully logged in.'
    })
  },
  [AUTH_SIGNUP_FAILURE]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    })
  },
  [FETCH_USERS_DATA_REQUEST]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isFetching': true,
      'statusText': null
    })
  },
  [RECEIVE_USERS_DATA_SUCCESS]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isFetching': false,
      'data': payload,
      'statusText': 'Load users successfully.'
    })
  },
  [RECEIVE_USERS_DATA_FAILURE]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isFetching': false,
      'data': null,
      'statusText': `Error: ${payload.status} ${payload.statusText}`
    })
  }
}, initialState)

// export const stateKey = 'auth'
// export const getAuthState = (state) => state[stateKey]
// export const getAuthError = propertySelector(getAuthState, 'error')
// export const getAuthToken = propertySelector(getAuthState, 'token')
// export const isLoggedIn = (state) => !!getAuthToken(state)