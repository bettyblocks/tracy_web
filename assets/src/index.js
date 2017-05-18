require("babel-core/register");
require("babel-polyfill");

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { history, store } from './store'
import actions from './actions'
import './css/app.scss'


class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <RaisedButton label="Load" onTouchTap={() => store.dispatch(actions.getDefinitions())}/>
      </MuiThemeProvider>
    )
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'))
