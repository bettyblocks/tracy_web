import React from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import AutoScroll from 'react-auto-scroll'

const ScrollList = AutoScroll({property: 'traces'})(class TracesList extends React.Component {
  render() {
    return (
      <List>
        {this.props.traces.map(this.renderItem.bind(this))}
      </List>
    )
  }

  renderItem(trace, i) {
    return (
      <ListItem key={i}
        primaryText={trace.trace} />
    )
  }
})

class SessionDetail extends React.Component {
  render() {
    return (
      <div className="session-detail--wrapper">
        <div className="traces-list">
          <ScrollList traces={this.props.traces} />
        </div>
      </div>
    )
  }


}
export default connect(s => s)(SessionDetail)
