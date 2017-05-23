import React from 'react'
import classNames from 'classnames'

export default class extends React.Component {
  render() {
    const { selected } = this.props
    return (
      <span className={classNames('filter-pill--wrapper', {selected})} {...this.props} >
        {this.props.label}
      </span>
    )
  }
}
