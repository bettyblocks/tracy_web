import React from 'react'
import { connect } from 'react-redux'
import find from 'lodash/find'
import filter from 'lodash/filter'

import SessionToolbar from './SessionToolbar'
import SessionFilterToolbar from './SessionFilterToolbar'
import TracesList from './TracesList'

class SessionDetail extends React.Component {

  filteredTraces() {
    const {types, text} = this.props.traceFilter

    return filter(this.props.traces, (row) => (
      types.indexOf(row.type) >= 0 &&
      (row.module.search(text) >= 0 || row.function.search(text) >= 0)
    ))
  }

  render() {
    const session = find(this.props.sessions, {id: this.props.activeSession})
    if (!session) return null

    const traces = this.filteredTraces()
    const title = `${session.metadata.title || session.id} (${traces.length})`

    return (
      <div className="session-detail--wrapper">
        <SessionToolbar title={title} filterShowing={this.props.traceFilter.open} />
        {this.props.traceFilter.open ? <SessionFilterToolbar filter={this.props.traceFilter} /> : null}
        <TracesList traces={traces} scrollToIndex={this.props.sessionScrollToIndex} />
      </div>
    )
  }
}
export default connect(s => s)(SessionDetail)
