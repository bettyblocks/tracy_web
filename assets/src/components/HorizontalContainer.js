import React from 'react';
import SplitLayout from 'react-split-layout'

export default class extends React.Component {
  render() {
    let children = React.Children.toArray(this.props.children)
    if (children.length < 3) children.push(<div key={1}></div>)
    return (
      <div className="horizontal-container--wrapper">
        <SplitLayout
          initialSizes={[200, 400, null]}
          direction="vertical" >
          {children}
        </SplitLayout>
      </div>
    )
  }
}
