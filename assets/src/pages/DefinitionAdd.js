import React from 'react'
import { connect } from 'react-redux'

import HorizontalContainer from '../components/HorizontalContainer'
import DefinitionsList from '../components/DefinitionsList'
import DefinitionEditor from '../components/DefinitionEditor'

class Page extends React.Component {
  render() {
    const definition = {inclusions: [], exclusions: [], id: null}
    return (
      <HorizontalContainer>
        <DefinitionsList />
        <DefinitionEditor definition={definition} />
      </HorizontalContainer>
    )
  }
}
export default connect(s => s)(Page)
