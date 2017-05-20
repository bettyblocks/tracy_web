import React from 'react'

import DefinitionsList from '../components/DefinitionsList'
import DefinitionDetail from '../components/DefinitionDetail'
import DefinitionAdd from '../components/DefinitionAdd'
import HorizontalContainer from '../components/HorizontalContainer'

export default class Page extends React.Component {
  render() {
    return (
      <HorizontalContainer>
        <DefinitionsList />
        <DefinitionAdd />
      </HorizontalContainer>
    )
  }
}
