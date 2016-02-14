import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Giphy.scss'

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

  render() {
    return (
      <input
        type='text'
        name='search'
        className={styles.input}
        onChange={this.onChange}
      />
    )
  }
}
Input.propTypes = {
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

  search(query) {
    this.setState({ IS_LOADING: true })
    search(query)
      .then((results) => {
        console.log(results)
        this.setState({ results: results })
      })
  }

  onSelect(result) {
    console.log("selected", result)

    var value = this.props.element.value
    value += `![${result.slug}](${result.images.fixed_width.url})`

    this.props.element.value = value
    this.props.onDone()
  }

  getStyles() {
    let absolutePosition = $(this.props.element).offset()
    return {
      top: absolutePosition.top,
      left: absolutePosition.left
    }
  }

  render() {
    return (
      <div className={styles.container} style={this.getStyles()}>
        <Input onSearch={this.search} />
        <Results
          results={this.state.results}
          onSelect={this.onSelect}
        />
      </div>
    )
  }
}
Giphy.propTypes = {
  element: React.PropTypes.object.isRequired,
  onDone: React.PropTypes.func.isRequired
}
Giphy.regex = /\/giphy$/

export default Giphy
