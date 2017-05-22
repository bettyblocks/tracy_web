import React from 'react'
import { connect } from 'react-redux'

import HorizontalContainer from '../components/HorizontalContainer'
import DefinitionsList from '../components/DefinitionsList'
import DefinitionDetail from '../components/DefinitionDetail'
import DefinitionEditor from '../components/DefinitionEditor'

class Page extends React.Component {
  render() {
    const definition = this.props.definitions[this.props.activeDefinition]
    return (
      <HorizontalContainer>
        <DefinitionsList />
        <DefinitionDetail />
        <DefinitionEditor definition={definition} />
      </HorizontalContainer>
    )
  }
}
export default connect(s => s)(Page)
