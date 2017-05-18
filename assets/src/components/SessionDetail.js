import React from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class SessionDetail extends React.Component {
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
        primaryText={trace.trace}
        secondaryText={trace.time} />
    )
  }

}
export default connect(s => s)(SessionDetail)
