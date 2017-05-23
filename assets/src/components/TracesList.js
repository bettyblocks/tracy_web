import React from 'react'

import { AutoSizer, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

import store from '../store'
import actions from '../actions'

export default class extends React.Component {
  render() {
    const columnWidths = [0.15, 0.4, 0.45]

    return (
      <div className="traces-list--wrapper">
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
              <Column label='Module' dataKey='module' width={columnWidths[1] * width}
                cellRenderer={({cellData}) => cellData.replace(/^Elixir./, '')} />
              <Column label='Function' dataKey='function' width={columnWidths[2] * width} />
            </Table>
          )}
        </AutoSizer>
      </div>
    )
  }
}
