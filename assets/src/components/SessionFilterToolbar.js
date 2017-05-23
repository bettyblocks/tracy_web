import React from 'react'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import store from '../store'
import actions from '../actions'

import FilterPill from './FilterPill'

export default class extends React.Component {

  handleChange(event, text) {
    store.dispatch(actions.setTracesFilter({text}))
  }

  clearFilter() {
    store.dispatch(actions.setTracesFilter({text: ''}))
  }

  toggleFilterType(type) {
    store.dispatch(actions.toggleTracesType({type}))
  }

  render() {
    const { filter } = this.props
    return (
      <Toolbar className="session-filter-toolbar--wrapper">
        <ToolbarGroup>
          <TextField hintText="Filter..." value={filter.text} onChange={::this.handleChange} />
          <FlatButton label='clear' onTouchTap={::this.clearFilter} />
        </ToolbarGroup>
        <ToolbarGroup>
          {['call', 'return'].map(
             (type) =>
               <FilterPill key={type} label={type} selected={filter.types.indexOf(type) >= 0} onTouchTap={this.toggleFilterType.bind(this, type)} />
          )}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
