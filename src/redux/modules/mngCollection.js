import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'
import fetch from 'isomorphic-fetch'

export const FETCH_COLLECTION = 'FETCH_COLLECTION'
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS'
export const FETCH_COLLECTION_FAIL = 'FETCH_COLLECTION_FAIL'

export const ADD_COLLECTION = 'ADD_COLLECTION'
export const ADD_COLLECTION_SUCCESS = 'ADD_COLLECTION_SUCCESS'
export const ADD_COLLECTION_FAIL = 'ADD_COLLECTION_FAIL'

export const UPDATE_COLLECTION = 'UPDATE_COLLECTION'
export const UPDATE_COLLECTION_SUCCESS = 'UPDATE_COLLECTION_SUCCESS'
export const UPDATE_COLLECTION_FAIL = 'UPDATE_COLLECTION_FAIL'

export const DELETE_COLLECTION = 'DELETE_COLLECTION'
export const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS'
export const DELETE_COLLECTION_FAIL = 'DELETE_COLLECTION_FAIL'

export const getCollectionRequest = createAction(FETCH_COLLECTION, (data) => data)
export const getCollectionSuccess = createAction(FETCH_COLLECTION_SUCCESS, (data) => data)
export const getCollectionFailed = createAction(FETCH_COLLECTION_FAIL, (data) => data)
export const actions = {getCollection}

const initialState = Immutable.fromJS({
  myCollection: null,
  isAdded: false,
  isAdding: false,
  isUpdating: false,
  isUpdated: false,
  isDeleted: false,
  isDeleting: false,
  isFetch: false,
  isFetching: false,
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

export function getCollection () {
  return (dispatch, getState) => {
    dispatch(getCollectionRequest())
    return fetch('//api.cityme.asia/configs/searchCollections', {
      method: 'get',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(getCollectionSuccess(response))
        } catch (e) {
          dispatch(getCollectionFailed({
            status: 405,
            statusText: 'Parse error'
          }))
        }
      })
    .catch(error => {
      dispatch(getCollectionFailed({
        status: 405,
        statusText: error.message
      }))
    })
  }
}

export default handleActions({
  [FETCH_COLLECTION]: (state, { payload }) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [FETCH_COLLECTION_SUCCESS]: (state, { payload }) => {
    return Object.assign({}, state, {
      isFetching: false,
      isFetch: true,
      myCollection: payload
    })
  },
  [FETCH_COLLECTION_FAIL]: (state, { payload }) => {
    return Object.assign({}, state, {
      isFetching: false,
      statusText: payload.statusText
    })
  }
}, initialState)
