import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton';

import DefinitionEditor from './DefinitionEditor'

class DefinitionEdit extends React.Component {

  render() {
    const definition = this.props.definitions[this.props.activeDefinition]
    if (!definition) return <span />

    return (
      <div className="padding">
        <DefinitionEditor definition={definition} />
        <RaisedButton>Save</RaisedButton>
      </div>
    )
  }
}
export default connect(s => s)(DefinitionEdit)
