import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import DefinitionsList from './components/DefinitionsList'
import HorizontalContainer from './components/HorizontalContainer'

import actions from './actions'
import './css/app.scss'

export default class App extends Component {
  render () {
    let { store } = this.context
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Tracy" />
          {this.props.children || this.renderMain()}
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
