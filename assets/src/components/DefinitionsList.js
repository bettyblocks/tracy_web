import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import store from '../store'
import actions from '../actions'

class Component extends React.Component {

  componentDidMount() {
    store.dispatch(actions.getDefinitions())
  }

  openDefinition(id) {
    store.dispatch(push(`/d/${id}`))
  }

  addDefinition() {
    store.dispatch(push(`/d/add`))
  }

  render() {
    let { definitions } = this.props
    return (
      <div className="definitions-list">
        <List>
          <Subheader>Definitions</Subheader>
          {Object.values(definitions).map(this.renderItem.bind(this))}
        </List>

        <FloatingActionButton
          style={{position: 'absolute', right: 12, bottom: 12}}
          mini
          onTouchTap={::this.addDefinition}>
          <ContentAdd />
        </FloatingActionButton>

      </div>
    )
  }

  renderItem(d) {
    return (
      <ListItem
        className={d.id === this.props.activeDefinition ? "selected" : null}
        onTouchTap={() => this.openDefinition(d.id)}
        key={d.id}>{d.label || d.id}</ListItem>
    )
  }
}
export default connect(s => s)(Component)
