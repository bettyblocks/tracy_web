import React from 'react';
import Paper from 'material-ui/Paper';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import ModuleInput from './ModuleInput'

import store from '../store'
import actions from '../actions'

export default class extends React.Component {

  save(definition) {
    store.dispatch(actions.putDefinition(definition))
  }

  render() {
    const definition = this.props.definition
    return (
      <div className="padding">
        <Paper className="content">
          <h2>{definition.id ? "Edit definition" : "Add definition"}</h2>

          <h3>Label</h3>
          <TextField value={definition.label || ''} onChange={(e, v) => { definition.label = v; this.forceUpdate(); }} id='label' />

          <h3>Included modules</h3>
          {definition.inclusions.map((m, i) =>
            <ModuleInput key={i} index={i} module={m} onDelete={(i) => {
                definition.inclusions.splice(i, 1);
                this.forceUpdate(); }}
              onUpdate={(i, value) => {
                  definition.inclusions[i] = value;
                  this.forceUpdate(); }}
            />
          )}
          <FlatButton onTouchTap={() => { definition.inclusions.push(""); this.forceUpdate() }}>Add</FlatButton>

          <h3>Excluded modules</h3>
          {definition.exclusions.map((m, i) =>
            <ModuleInput key={i} index={i} module={m}
              onDelete={(i) => {
                  definition.exclusions.splice(i, 1);
                  this.forceUpdate(); }}
              onUpdate={(i, value) => {
                  definition.exclusions[i] = value;
                  this.forceUpdate(); }}
            />
          )}
          <FlatButton onTouchTap={() => { definition.exclusions.push(""); this.forceUpdate() }}>Add</FlatButton>

        </Paper>

        <RaisedButton primary onTouchTap={::this.save.bind(this, definition)}>Save</RaisedButton>
      </div>
    )
  }
}
