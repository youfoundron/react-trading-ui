import immutable from 'immutable'
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from '../reducers'
import initialState from './initialState'
import rootSaga from '../sagas'
import types from '../constants/actionTypes'
import * as actionCreators from '../constants/actionCreators'

// middleware helpers
const typeRegEx = /Symbol\((.*?)\)/
const stateSanitizer = state => state.toJS()
const actionSanitizer = action => ({
  ...action,
  type: typeof action.type === 'symbol'
    ? String(action.type).match(typeRegEx)[1]
    : action.type
})
const predicate = (state, action) =>
  (action.payload && action.payload.type === 'match') ||
  action.type !== types.SOCKET_MESSAGE

// use redux devtools enhancer
const composeEnhancers = composeWithDevTools({
  predicate,
  actionCreators,
  actionSanitizer,
  serialize: { immutable },
  actionsBlackList: types.SOCKET_MESSAGE
})

// create and apply middlewares
const loggerMiddleware = createLogger({
  predicate,
  diff: true,
  collapsed: true,
  stateTransformer: stateSanitizer,
  actionTransformer: actionSanitizer
})
const sagaMiddleware = createSagaMiddleware()
const middleware = composeEnhancers(
  applyMiddleware(loggerMiddleware, sagaMiddleware)
  // , additional enhancers...
)

// create the store
const store = createStore(rootReducer, initialState, middleware)

// run sagas
sagaMiddleware.run(rootSaga)

export default store
