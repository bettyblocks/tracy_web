import React from 'react'

import DefinitionsList from '../components/DefinitionsList'
import DefinitionDetail from '../components/DefinitionDetail'
import DefinitionEdit from '../components/DefinitionEdit'
import HorizontalContainer from '../components/HorizontalContainer'

export default class Page extends React.Component {
  render() {
    return (
      <HorizontalContainer>
        <DefinitionsList />
        <DefinitionDetail />
        <DefinitionEdit />
      </HorizontalContainer>
    )
  }
}
