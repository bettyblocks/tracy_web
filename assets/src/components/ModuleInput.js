import React from 'react';

import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete';

import debounce from 'lodash/debounce'
import { api } from '../sagas'

export default class extends React.Component {

  state = {
    completions: [],
    searchText: ''
  }

  componentWillMount() {
    this.setState({searchText: this.props.module})
  }

  handleInput = debounce((t) => {
    api.push('mod_autocomplete', {text: t})
       .receive('ok', ({completions}) => {
         this.setState({completions})
       });
  })

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Module name"
          searchText={this.state.searchText}
          onUpdateInput={::this.handleInput}
          openOnFocus={true}
          dataSource={this.state.completions}
          onNewRequest={(searchText) => this.setState({searchText})}
        />
        <IconButton><Delete /></IconButton>
      </div>
    )
  }
}
