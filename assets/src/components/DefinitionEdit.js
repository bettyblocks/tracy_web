import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';

import ModuleInput from './ModuleInput'

import store from '../store'

class DefinitionEdit extends React.Component {

  render() {
    const definition = this.props.definitions[this.props.activeDefinition]
    if (!definition) return <span />

    return (
      <div className="padding">
        <Paper className="content">
          <h2>Editing: {definition.id}</h2>

          <h3>Traced modules</h3>
          {definition.modules.map((m, i) => <ModuleInput key={i} module={m} />)}
        </Paper>
      </div>
    )
  }
}
export default connect(s => s)(DefinitionEdit)
