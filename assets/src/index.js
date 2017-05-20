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
import DefinitionEdit from './pages/DefinitionEdit'
import DefinitionAdd from './pages/DefinitionAdd'
import SessionDetail from './pages/SessionDetail'

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/d/add" component={DefinitionAdd} />
        <Route path="/d/:definition" component={DefinitionDetail} />
        <Route path="/d/:definition/edit" component={DefinitionEdit} />
        <Route path="/s/:definition/:session" component={SessionDetail} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'))
