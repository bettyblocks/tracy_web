import React from 'react'

import HorizontalContainer from '../components/HorizontalContainer'
import DefinitionsList from '../components/DefinitionsList'
import DefinitionDetail from '../components/DefinitionDetail'
import SessionDetail from '../components/SessionDetail'

export default class Page extends React.Component {
  render() {
    return (
      <HorizontalContainer>
        <DefinitionsList />
        <DefinitionDetail />
        <SessionDetail />
      </HorizontalContainer>
    )
  }
}
