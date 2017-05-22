import React from 'react'
import { connect } from 'react-redux'

import { AutoSizer, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

import Subheader from 'material-ui/Subheader'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

import store from '../store'
import actions from '../actions'

class SessionDetail extends React.Component {
  render() {
    const title = `Trace details (${this.props.traces.length} entries)`;
    const columnWidths = [0.15, 0.4, 0.45]

    return (
      <div className="traces-list">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={title} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton label="Info" onTouchTap={() => store.dispatch(actions.showSessionDialog(true))} />
          </ToolbarGroup>
        </Toolbar>

        <div className="traces">
          <AutoSizer>
            {({ height, width }) => (
              <Table
                width={width}
                height={height}
                headerHeight={20}
                rowHeight={20}
                scrollToIndex={this.props.sessionScrollToIndex}
                rowCount={this.props.traces.length}
                onRowClick={({rowData}) => store.dispatch(actions.showTraceDialog(rowData))}
                rowGetter={({index}) => this.props.traces[index]}
              >
                <Column label='Type' dataKey='type' width={columnWidths[0] * width} />
                <Column label='Module' dataKey='module' width={columnWidths[1] * width} />
                <Column label='Function' dataKey='function' width={columnWidths[2] * width} />
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }

  cellRenderer ({ columnIndex, rowIndex, key, style }) {
    let trace = this.props.traces[rowIndex]
    let columns = ['type', 'module', 'function', 'args']
    let value
    switch (columnIndex) {
      case 0:
        value = trace.type
        break
      case 1:
        value = (trace.module.replace(/^Elixir./, '')) + ':' + trace.function
        break
      case 2:
        value = trace.args
    }

    return (
      <div key={key} style={style} className="trace-item">{value}</div>
    )
  }

  noRowsRenderer () {
    return (
      <div key={0}>No traces</div>
    )
  }

}
export default connect(s => s)(SessionDetail)
