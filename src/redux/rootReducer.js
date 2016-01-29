import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routeReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import auth from './modules/auth'

const reducers = {
  auth: auth,
  counter: counter,
  router: router,
  form: formReducer
}

export default combineReducers(reducers)
