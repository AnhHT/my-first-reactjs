import { createAction, handleActions } from 'redux-actions'
// import { propertySelector } from '../utils/reselect'
import Immutable from 'immutable'
import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

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

export const loginRequest = createAction(AUTH_LOGIN_REQUEST, (data) => data)
export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS, (data) => data)
export const loginFailure = createAction(AUTH_LOGIN_FAILURE, (err) => err)
export const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS, (data) => data)
export const signupRequest = createAction(AUTH_SIGNUP_REQUEST, (data) => data)
export const signupSuccess = createAction(AUTH_SIGNUP_SUCCESS, (data) => data)
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
  console.log(response)
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
          let userInfo = JSON.stringify(response)
          window.localStorage.setItem('userInfo', userInfo)
          dispatch(loginSuccess(userInfo))
          dispatch(push('/account'))
        } catch (e) {
          dispatch(loginFailure({
            status: 403,
            statusText: 'Invalid token'
          }))
        }
      })
      .catch(error => {
        window.localStorage.removeItem('userInfo')
        dispatch(loginFailure({
          status: 401,
          statusText: error.message
        }))
      })
  }
}

export function logoutAndRedirect () {
  return (dispatch, getState) => {
    window.localStorage.removeItem('userInfo')
    dispatch(logoutSuccess())
    dispatch(push('/login'))
  }
}

export function signup (data = {email: '', password: '', redirect: '/'}) {
  return (dispatch, getState) => {
    window.localStorage.removeItem('userInfo')
    dispatch(signupRequest(data))
    return fetch('http://pn.quandh.com:80/api/users', {
      method: 'post',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: serialize({
        'email': data.email,
        'password': data.password,
        'fullName': data.fullName,
        'dob': data.dob,
        'pin': data.pin
      })
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(signupSuccess(data))
          dispatch(push('/login'))
        } catch (e) {
          console.log(e)
          dispatch(signupFailure({
            status: 403,
            statusText: 'Signup Failure!'
          }))
        }
      })
      .catch(error => {
        dispatch(signupFailure({
          status: 403,
          statusText: error.message
        }))
      })
  }
}

export function getUsers () {
  // const userId = window.localStorage.getItem('userId')
  const userInfoObj = JSON.parse(window.localStorage.getItem('userInfo'))
  return (dispatch, state) => {
    dispatch(getUsersSuccess(userInfoObj))
  }
}

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
      'statusText': 'You have been successfully logged in.'
    })
  },
  [AUTH_LOGIN_FAILURE]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    })
  },
  [AUTH_LOGOUT_SUCCESS]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
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
      'isAuthenticated': false,
      'statusText': 'Register successfully'
    })
  },
  [AUTH_SIGNUP_FAILURE]: (state, {payload}) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'statusText': `Signup Error: ${payload.status} ${payload.statusText}`
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
