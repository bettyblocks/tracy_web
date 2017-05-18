import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import store from '../store'

class DefinitionDetail extends React.Component {

  openSession(session) {
    store.dispatch(push(`/s/${this.props.activeDefinition}/${session.id}`))
  }

  render() {
    const definition = this.props.definitions[this.props.activeDefinition]
    if (!definition) return <span />

    return (
      <div className="padding">
        <Paper className="content">
          <h2>Definition: {definition.id}</h2>
          Modules: {definition.modules.join(",")}
        </Paper>

        <Paper>
          <Subheader>Sessions</Subheader>
          <List>
            {this.props.sessions.map(this.renderSessionItem.bind(this))}
          </List>
        </Paper>
      </div>
    )
  }

  renderSessionItem(session) {
    return (
      <ListItem
        className={session.id === this.props.activeSession ? "selected" : null}
        key={session.id}
        secondaryText={session.time}
        onTouchTap={this.openSession.bind(this, session)}>{session.id}</ListItem>
    )
  }
}
export default connect(s => s)(DefinitionDetail)
