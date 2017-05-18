import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import store from '../store'
import actions from '../actions'

class Component extends React.Component {

  openDefinition(id) {
    store.dispatch(push(`/d/${id}`))
  }

  render() {
    let { definitions } = this.props
    return (
      <List>
      {Object.values(definitions).map(this.renderItem.bind(this))}
      </List>
    )
  }

  renderItem(d) {
    return (
      <ListItem
        onTouchTap={() => this.openDefinition(d.id)}
        key={d.id}>{d.id}</ListItem>
    )
  }
}
export default connect(s => s)(Component)
