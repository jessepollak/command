import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-spinner'
import classnames from 'classnames'
import NativeListener from 'react-native-listener'

import 'react-spinner/react-spinner.css'
import styles from './Giphy.scss'
import * as Types from 'types'
import Container from 'components/Container'

const API_BASE = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = 'dc6zaTOxFJmzC'

function search(query) {
  return $.get(
    API_BASE,
    {
      api_key: API_KEY,
      q: query,
      limit: 20
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
    event.stopPropagation()
    if (event.keyCode == 27) {
      return this.props.onEsc()
    }
  }

  render() {
    return (
      <NativeListener onKeyDown={this.onKeyUp}>
        <input
          type='text'
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

class Result extends React.Component {
  render() {
    return (
        <div className={styles.result}>
          <img
            src={this.props.images.fixed_width_small.url}
            onClick={this.props.onClick}
          />
        </div>
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
      <div className={styles.results}>
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
      IS_LOADING: false,
      query: ""
    }

    this.search = this.search.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  componentWillUnmount() {
    if (this.pendingRequest) this.pendingRequest.cancel()
  }

  search(query) {
    if (query == "") {
      return this.setState({ query: query, IS_LOADING: false })
    }

    this.setState({ query: query, IS_LOADING: true, results: [] })

    this.pendingRequest = search(query)
      .then((results) => {
        this.setState({ results: results, IS_LOADING: false })
      })
      .always(() => {
        this.pendingRequest = null
      })
  }

  onSelect(result) {
    this.props.onDone(new Types.Image({
      src: result.images.original.url,
      alt: result.slug,
      url: result.url
    }))
  }

  getStyles() {
    return {
      top: this.props.top,
      left: this.props.left
    }
  }

  render() {
    let toRender
    if (this.state.IS_LOADING) {
      toRender = <Spinner />
    } else {
      if (this.state.results.length) {
        toRender = <Results
          results={this.state.results}
          onSelect={this.onSelect}
        />
      } else {
        toRender = <p className={styles.noResults}>No results.</p>
      }
    }

    let isExpanded = this.state.query != ""
    let classes = []
    if (isExpanded) classes.push(styles.isExpanded)

    return (
      <Container isExpanded={isExpanded} style={this.getStyles()} className={classnames(classes)}>
        <Input
          onSearch={this.search}
          onEsc={this.props.onDone}
        />
        { toRender }
      </Container>
    )
  }
}
Giphy.propTypes = {
  $element: React.PropTypes.object.isRequired,
  onDone: React.PropTypes.func.isRequired
}
Giphy.match = "giphy"

export default Giphy
