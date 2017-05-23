import React from 'react'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import store from '../store'
import actions from '../actions'

export default class extends React.Component {

  handleChange(event, text) {
    store.dispatch(actions.setTracesFilter({text}))
  }

  render() {
    const { filter } = this.props
    return (
      <Toolbar className="session-filter-toolbar--wrapper">
        <ToolbarGroup>
          <TextField hintText="Filter..." value={filter.text} onChange={::this.handleChange} />
          <FlatButton label='clear' />
        </ToolbarGroup>
        <ToolbarGroup>
          <span>call</span>
          <span>return</span>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
