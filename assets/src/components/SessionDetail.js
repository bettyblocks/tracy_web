import React from 'react'
import { connect } from 'react-redux'

import Subheader from 'material-ui/Subheader'
import AutoScroll from 'react-auto-scroll'
import { AutoSizer, List } from 'react-virtualized'

class SessionDetail extends React.Component {
  render() {
    return (
      <div className="traces-list">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowHeight={50}
              rowCount={this.props.traces.length}
              noRowsRenderer={::this.noRowsRenderer}
              rowRenderer={::this.rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    )
  }

  rowRenderer ({ index, isScrolling, key, style }) {
    let trace = this.props.traces[index]
    return (
      <div
        key={index}
        style={style}
        className="trace-item">{trace.trace}</div>
    )
  }

  noRowsRenderer () {
    return (
      <div key={0}>No traces</div>
    )
  }

}
export default connect(s => s)(SessionDetail)
