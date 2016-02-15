import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Giphy.scss'
import * as Editable from 'lib/editable'

const API_BASE = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = 'dc6zaTOxFJmzC'

function search(query) {
  return $.get(
    API_BASE,
    {
      api_key: API_KEY,
      q: query,
      limit: 5
    }
  ).then((data) => {
    return data.data
  })
}

class Input extends React.Component {
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
    if (event.keyCode == 27) {
      return this.props.onEsc()
    }
  }

  render() {
    return (
      <input
        type='text'
        name='search'
        className={styles.input}
        onKeyUp={this.onKeyUp}
        onChange={this.onChange}
      />
    )
  }
}
Input.propTypes = {
  onEsc: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired
}

class Result extends React.Component {
  render() {
    return (
      <img
        src={this.props.images.fixed_width_small.url}
        onClick={this.props.onClick}
      />
    )
  }
}
Result.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

class Results extends React.Component {
  render() {
    let children = _.map(this.props.results, (result) => {
      return <Result
        key={result.id}
        onClick={this.props.onSelect.bind(null, result)}
        {...result}
      />
    })

    return (
      <div>
        { children }
      </div>
    )
  }
}
Results.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

class Giphy extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      IS_LOADING: false
    }

    this.search = this.search.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  componentWillUnmount() {
    if (this.pendingRequest) this.pendingRequest.cancel()
  }

  search(query) {
    this.setState({ IS_LOADING: true })
    this.pendingRequest = search(query)
      .then((results) => {
        this.pendingRequest = null
        this.setState({ results: results })
      })
  }

  onSelect(result) {
    Editable.appendText(
      this.props.$element,
      `![${result.slug}](${result.images.fixed_width.url})`
    )

    this.props.onDone()
  }

  getStyles() {
    return {
      top: this.props.top,
      left: this.props.left
    }
  }

  render() {
    return (
      <div className={styles.container} style={this.getStyles()}>
        <Input
          onSearch={this.search}
          onEsc={this.props.onDone}
        />
        <Results
          results={this.state.results}
          onSelect={this.onSelect}
        />
      </div>
    )
  }
}
Giphy.propTypes = {
  $element: React.PropTypes.object.isRequired,
  onDone: React.PropTypes.func.isRequired
}
Giphy.regex = /\/giphy$/

export default Giphy
