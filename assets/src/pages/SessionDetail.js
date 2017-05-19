import React from 'react'
import { connect } from 'react-redux'

import HorizontalContainer from '../components/HorizontalContainer'
import DefinitionsList from '../components/DefinitionsList'
import DefinitionDetail from '../components/DefinitionDetail'
import SessionDetail from '../components/SessionDetail'
import find from 'lodash/find'

import Dialog from 'material-ui/Dialog';
import store from '../store'
import actions from '../actions'

class Page extends React.Component {
  render() {
    return (
      <HorizontalContainer extra={this.renderDialog()}>
        <DefinitionsList />
        <DefinitionDetail />
        <SessionDetail />
      </HorizontalContainer>
    )
  }

  renderDialog() {
    if (!this.props.sessionDialogShowing) {
      return null
    }

    const session = find(this.props.sessions, {id: this.props.activeSession})
    const code = JSON.stringify(session.metadata, null, '  ')

    return (
      <Dialog
        title={session.metadata.title || session.id}
        open={true}
        className="content"
        onRequestClose={() => store.dispatch(actions.showSessionDialog(false))}>
        <h3>Metadata:</h3>
        <pre>{code}</pre>
      </Dialog>
    )
  }
}
export default connect(s => s)(Page)
