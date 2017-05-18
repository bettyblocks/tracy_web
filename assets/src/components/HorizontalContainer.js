import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="horizontal-container--wrapper">
      {React.Children.map(this.props.children, (c) => <div className="item">{c}</div>)}
      </div>
    )
  }
}
