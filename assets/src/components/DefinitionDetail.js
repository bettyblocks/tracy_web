import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import copy from 'copy-to-clipboard';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Copy from 'material-ui/svg-icons/content/content-copy';

import store from '../store'
import actions from '../actions'

class DefinitionDetail extends React.Component {

  openSession(session) {
    store.dispatch(push(`/s/${this.props.activeDefinition}/${session.id}`))
  }

  openDefinitionDetail() {
    store.dispatch(push(`/d/${this.props.activeDefinition}/edit`))
  }

  copyDefinitionKey(definition) {
    copy(definition.id);
    store.dispatch(actions.showSnackbar('Trace key copied to clipboard.'))
  }

  render() {
    const definition = this.props.definitions[this.props.activeDefinition]
    if (!definition) return <span />

    return (
      <div className="padding">
        <Paper className="content">
          <IconButton tooltip='Edit trace definition' className="icon-button" onTouchTap={::this.openDefinitionDetail}>
            <Edit />
          </IconButton>
          <IconButton tooltip='Copy trace key' className="icon-button" onTouchTap={this.copyDefinitionKey.bind(this, definition)}>
            <Copy />
          </IconButton>

          <h2>{definition.label || definition.id}</h2>

          {definition.inclusions.length
           ? <div>
             <h3>Included</h3>
             {definition.inclusions.join(", ")}
           </div>
           : null}

          {definition.exclusions.length
           ? <div>
             <h3>Excluded</h3>
             {definition.exclusions.join(", ")}
           </div>
           : null}

        </Paper>

        <Paper className="content sessions-list">
          <h3>Traces</h3>
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
        onTouchTap={this.openSession.bind(this, session)}>{session.metadata.title || session.id}</ListItem>
    )
  }
}
export default connect(s => s)(DefinitionDetail)
