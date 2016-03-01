import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routeReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import auth from './modules/auth'
import mngCollection from './modules/mngCollection'

const reducers = {
  auth: auth,
  counter: counter,
  router: router,
  form: formReducer,
  mngCollection: mngCollection
}

export default combineReducers(reducers)
