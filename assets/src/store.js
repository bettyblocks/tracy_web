import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import actions from './actions'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

sagaMiddleware.run(rootSaga)

store.dispatch(actions.getDefinitions());

export const history = syncHistoryWithStore(browserHistory, store)
