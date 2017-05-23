import React from 'react'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Help from 'material-ui/svg-icons/action/info'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up'

import store from '../store'
import actions from '../actions'

export default class extends React.Component {
  showSessionDialog() {
    store.dispatch(actions.showSessionDialog(true))
  }

  toggleTracesFilter() {
    store.dispatch(actions.toggleTracesFilter())
  }

  render() {
    const icon = !this.props.filterShowing ? <ArrowDropDown /> : <ArrowDropUp />
    return (
      <Toolbar className="session-toolbar--wrapper">
        <ToolbarGroup>
          <ToolbarTitle text={this.props.title} onTouchTap={::this.showSessionDialog} title='Click for session info' />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton label="Filter" onTouchTap={::this.toggleTracesFilter} icon={icon} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
