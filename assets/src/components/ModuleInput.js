import React from 'react';

import AutoComplete from 'material-ui/AutoComplete'
import FlatButton from 'material-ui/FlatButton'

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
      <div className="module-input--wrapper">
        <AutoComplete
          hintText="Module name"
          searchText={this.state.searchText}
          openOnFocus={true}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={20}
          dataSource={this.state.modules}
          onUpdateInput={(searchText) => this.props.onUpdate(this.props.index, searchText)}
          onNewRequest={(searchText) => this.setState({searchText})}
        />
        <FlatButton label='remove' onTouchTap={() => this.props.onDelete(this.props.index)} />
      </div>
    )
  }
}
