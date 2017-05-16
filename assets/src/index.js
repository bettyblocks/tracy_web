import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import socket from './socket'
import reducers from './reducers'

import './css/app.scss'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
  render () {
    return <h1>app</h1>
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'))
