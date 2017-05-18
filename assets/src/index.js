require("babel-core/register");
require("babel-polyfill");

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import store from './store'
import App from './app'
import DefinitionDetail from './pages/DefinitionDetail'

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/d/:definition" component={DefinitionDetail} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'))
