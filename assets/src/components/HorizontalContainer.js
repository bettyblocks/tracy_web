import React from 'react';
import SplitLayout from 'react-split-layout'
import debounce from 'lodash/debounce'

export default class extends React.Component {

  componentWillMount() {
    this._sizes = '_sizes' in localStorage ? JSON.parse(localStorage._sizes) : [150, 400, null]
  }

  onChange = debounce((arg) => {
    localStorage._sizes = JSON.stringify(arg)
  }, 200)

  render() {
    let children = React.Children.toArray(this.props.children)
    if (children.length < 3) children.push(<div key={1}></div>)

    return (
      <div className="horizontal-container--wrapper">
        <SplitLayout
          onChange={::this.onChange}
          initialSizes={this._sizes}
          direction="vertical" >
          {children}
        </SplitLayout>
        {this.props.extra || null}
      </div>
    )
  }
}
