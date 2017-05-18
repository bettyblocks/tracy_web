import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

import DefinitionsList from '../components/DefinitionsList'
import HorizontalContainer from '../components/HorizontalContainer'

class Page extends React.Component {
  render() {
    let definition = this.props.definitions[this.props.params.definition]
    return (
      <HorizontalContainer>
        <DefinitionsList />
        {this.renderDetail(definition)}
      </HorizontalContainer>
    )
  }

  renderDetail(d) {
    if (!d) return null;
    return (
      <div className="padding">
        <Paper className="content">
          Modules: {d.modules.join(",")}
        </Paper>
      </div>
    )
  }

}
export default connect(s => s)(Page)
