import React from 'react';

import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete';

import debounce from 'lodash/debounce'
import { api } from '../sagas'

export default class extends React.Component {

  state = {
    modules: [],
    searchText: ''
  }

  componentWillMount() {
    this.setState({searchText: this.props.module})
    api.push('get_modules', {})
       .receive('ok', ({modules}) => {
         this.setState({modules})
       })
  }

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Module name"
          searchText={this.state.searchText}
          openOnFocus={true}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={20}
          dataSource={this.state.modules}
          onNewRequest={(searchText) => this.setState({searchText})}
        />
        <IconButton><Delete /></IconButton>
      </div>
    )
  }
}
