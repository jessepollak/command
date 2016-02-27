import $ from 'jquery'
import React from 'react'
import NativeListener from 'react-native-listener'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Spinner from 'react-spinner'

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

class Result extends React.Component {
  render() {
    return (
        <div className={styles.result} onClick={this.props.onClick}>
          { <this.props.ResultClass {...this.props} /> }
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
        ResultClass={this.props.ResultClass}
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

let NoResults = (props) => {
  return (
    <p className={styles.noResults}>No results.</p>
  )
}

export class Widget extends React.Component {
  constructor() {
    super()

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
      return this.setState({
        query: query,
        IS_LOADING: false,
        results: []
      })
    }

    this.setState({ query: query, IS_LOADING: true, results: [] })

    this.pendingRequest = this.props.onSearch(query)
      .then((results) => {
        this.setState({ results: results, IS_LOADING: false })
      })
      .always(() => {
        this.pendingRequest = null
      })
  }

  onSelect(result) {
    this.props.onSelect(result)
  }

  render() {
    let classes = classnames(styles.widget, this.props.className, {
      [styles.isExpanded]: this.state.query != "",
      [styles.hasResults]: this.state.results.length > 0
    })

    let toRender
    if (this.state.IS_LOADING) {
      toRender = <Spinner />
    } else {
      if (this.state.results.length > 0) {
        toRender = <Results
          results={this.state.results}
          onSelect={this.onSelect}
          ResultClass={this.props.ResultClass}
        />
      } else if (this.state.query != "") {
        toRender = <NoResults />
      }
    }

    return (
      <div className={classes}>
        <Input
          onSearch={this.search}
          onEsc={this.props.onEsc}
        />
        { toRender }
      </div>
    )
  }
}
Widget.propTypes = {
  onSearch: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onEsc: React.PropTypes.func.isRequired,
  ResultClass: React.PropTypes.oneOfType([
    React.PropTypes.func.isRequired,
    React.PropTypes.element.isRequired,
  ])
}
