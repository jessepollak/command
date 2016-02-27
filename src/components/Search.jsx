import $ from 'jquery'
import React from 'react'
import NativeListener from 'react-native-listener'
import ReactDOM from 'react-dom'

import styles from './Search.scss'

export class Input extends React.Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onSearch = _.debounce(this.onSearch.bind(this), 300)
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).focus()
  }

  onSearch(query) {
    this.props.onSearch(query)
  }

  onChange(event) {
    this.onSearch(event.target.value)
  }

  onKeyUp(event) {
    event.stopPropagation()
    if (event.keyCode == 27) {
      return this.props.onEsc()
    }
  }

  render() {
    return (
      <NativeListener onKeyDown={this.onKeyUp}>
        <input
          type='search'
          name='search'
          placeholder="Search GIFs..."
          className={styles.input}
          onKeyDown={this.onKeyUp}
          onChange={this.onChange}
        />
      </NativeListener>
    )
  }
}
Input.propTypes = {
  onEsc: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired
}
