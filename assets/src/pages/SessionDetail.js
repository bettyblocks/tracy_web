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
      <HorizontalContainer extra={[this.renderSessionDialog(), this.renderTraceDialog()]}>
        <DefinitionsList />
        <DefinitionDetail />
        <SessionDetail />
      </HorizontalContainer>
    )
  }

  renderSessionDialog() {
    if (!this.props.sessionDialogShowing) {
      return null
    }

    const session = find(this.props.sessions, {id: this.props.activeSession})
    const code = JSON.stringify(session.metadata, null, '  ')

    return (
      <Dialog
        key={0}
        title={session.metadata.title || session.id}
        open={true}
        className="content"
        onRequestClose={() => store.dispatch(actions.showSessionDialog(false))}>
        <h3>Metadata:</h3>
        <pre>{code}</pre>
      </Dialog>
    )
  }

  renderTraceDialog() {
    if (!this.props.traceDialog) {
      return null
    }

    const trace = this.props.traceDialog
    const code = JSON.stringify(trace, null, '  ')

    return (
      <Dialog
        key={1}
        title={"Trace"}
        open={true}
        className="content"
        onRequestClose={() => store.dispatch(actions.showTraceDialog(null))}>
        <table>
          <tbody>
            {Object.keys(trace).map((k) => (
              <tr key={k}>
                <td>{k}</td>
                <td><pre>{trace[k]}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dialog>
    )
  }
}
export default connect(s => s)(Page)
