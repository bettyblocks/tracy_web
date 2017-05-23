import React from 'react'
import { connect } from 'react-redux'
import find from 'lodash/find'

import SessionToolbar from './SessionToolbar'
import SessionFilterToolbar from './SessionFilterToolbar'
import TracesList from './TracesList'

class SessionDetail extends React.Component {
  render() {
    const title = `Trace details (${this.props.traces.length} entries)`;

    const session = find(this.props.sessions, {id: this.props.activeSession})
    if (!session) return null

    return (
      <div className="session-detail--wrapper">
        <SessionToolbar title={session.metadata.title || session.id} filterShowing={this.props.traceFilter.open} />
        {this.props.traceFilter.open ? <SessionFilterToolbar filter={this.props.traceFilter} /> : null}
        <TracesList traces={this.props.traces} scrollToIndex={this.props.sessionScrollToIndex} />
      </div>
    )
  }
}
export default connect(s => s)(SessionDetail)
