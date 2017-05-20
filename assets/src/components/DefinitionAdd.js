import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton';

import DefinitionEditor from './DefinitionEditor'

class DefinitionAdd extends React.Component {

  render() {
    return (
      <div className="padding">
        <DefinitionEditor definition={{modules: []}} />
        <RaisedButton>Add</RaisedButton>
      </div>
    )
  }
}
export default connect(s => s)(DefinitionAdd)
