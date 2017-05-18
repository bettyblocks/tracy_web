import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {},
  compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(browserHistory)
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

sagaMiddleware.run(rootSaga)

export default store
