import React from 'react';
import Paper from 'material-ui/Paper';

import ModuleInput from './ModuleInput'

export default class extends React.Component {
  render() {
    const definition = this.props.definition
    return (
      <Paper className="content">
        <h2>{definition.id ? "Edit definition" : "Add definition"}</h2>

        <h3>Included modules</h3>
        {definition.inclusions.map((m, i) => <ModuleInput key={i} module={m} />)}

        <h3>Excluded modules</h3>
        {definition.exclusions.map((m, i) => <ModuleInput key={i} module={m} />)}

      </Paper>
    )
  }
}
