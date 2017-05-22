import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {blue900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'

import DefinitionsList from './components/DefinitionsList'
import HorizontalContainer from './components/HorizontalContainer'
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Snackbar from 'material-ui/Snackbar';

import actions from './actions'
import store from './store'
import './css/app.scss'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue900
  }
});

class App extends Component {

  handleRequestClose() {
    store.dispatch(actions.showSnackbar(null))
  }

  render () {
    let { store } = this.context
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="Tracy"
            iconElementLeft={<IconButton><HomeIcon /></IconButton>}
            onLeftIconButtonTouchTap={() => store.dispatch(push('/'))}
          />
          {this.props.children || this.renderMain()}
          <Snackbar
            open={this.props.snackBar !== null}
            message={this.props.snackBar || ''}
            autoHideDuration={1500}
            onRequestClose={::this.handleRequestClose}
          />
        </div>
      </MuiThemeProvider>
    )
  }

  renderMain() {
    return (
      <HorizontalContainer>
        <DefinitionsList />
      </HorizontalContainer>
    )
  }

}
App.contextTypes = { store: PropTypes.object }

export default connect(s => s)(App)
