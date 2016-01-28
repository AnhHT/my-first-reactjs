import { combineReducers } from 'redux'
import { formReducer } from 'redux-form'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import auth from './modules/auth'

const reducers = {
  auth: auth,
  counter: counter,
  router: router,
  form: formReducer
}

export default combineReducers(reducers)
