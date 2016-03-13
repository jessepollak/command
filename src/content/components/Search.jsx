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
    this.onKeyDown = this.onKeyDown.bind(this)
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

  onKeyDown(event) {
    event.stopPropagation()
    if (event.keyCode == 27) {
      return this.props.onEsc()
    }
    return true
  }

  onKeyUp(event) {
    event.stopPropagation()
    return true
  }

  onKeyPress(event) {
    event.stopPropagation()
    return true
  }

  render() {
    return (
      <NativeListener onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} onKeyPress={this.onKeyPress}>
        <input
          type='search'
          name='search'
          placeholder={this.props.placeholder}
          className={styles.input}
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

let Back = (props) => {
  let classes = classnames({
    [styles.disabled]: props.disabled
  })
  return (
      <a className={classes} onClick={props.onBack}>&larr;</a>
  )
}

let Forward = (props) => {
  let classes = classnames({
    [styles.disabled]: props.disabled
  })
  return (
    <a className={classes} onClick={props.atEnd ? null : props.onForward}>&rarr;</a>
  )
}

class Pagination extends React.Component {
  render() {
    return (
      <div className={styles.pagination}>
        <Back {...this.props} disabled={this.props.page == 0} />
        <Forward {...this.props} disabled={this.props.atEnd} />
      </div>
    )
  }
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
  constructor() {
    super()
    this.state = { atEnd: false }
  }

  componentDidUpdate() {
    if (this.state.atEnd) {
      // TODO: figure out a more elegant way to handle the situation
      // where the last child is still laying out when this check
      // is happening.
      setTimeout(this.checkForEnd.bind(this), 500)
    } else {
      this.checkForEnd()
    }
  }

  checkForEnd() {
    let last = ReactDOM.findDOMNode(this.refs.last)
    if (last) {
      let visibleWindow = this.props.width * (this.props.page + 1)
      let lastOffset = last.offsetLeft
      if (visibleWindow - lastOffset > 0) {
        if (!this.state.atEnd) {
          this.setState({ atEnd: true })
          this.props.onReachEnd()
        }
      } else {
        if (this.state.atEnd) {
          this.setState({ atEnd: false })
        }
      }
    }
  }

  getStyles() {
    return {
      left: this.props.page * - this.props.width // magic number
    }
  }

  render() {
    let children = _.map(this.props.results, (result, i) => {
      return <Result
        key={result.id}
        onClick={this.props.onSelect.bind(null, result)}
        ResultClass={this.props.ResultClass}
        ref={i == this.props.results.length - 1 ? "last" : null}
        {...result}
      />
    })

    return (
      <div className={styles.resultsContainer}>
        <div className={styles.results} style={this.getStyles()}>
          { children }
        </div>
        <Pagination {...this.props} atEnd={this.state.atEnd}/>
      </div>
    )
  }
}
Results.defaultProps = {
  width: 383
}
Results.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  onReachEnd: React.PropTypes.func.isRequired,
  width: React.PropTypes.number.isRequired
}

let NoResults = (props) => {
  return (
    <p className={styles.noResults}>No results.</p>
  )
}

export class Widget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: props.results || [],
      IS_LOADING: false,
      query: "",
      page: 0
    }

    this.search = this.search.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onForward = this.onForward.bind(this)
    this.onReachEnd = this.onReachEnd.bind(this)
  }

  componentWillUnmount() {
    if (this.pendingRequest) {
      this.cancel = true
    }
  }

  onBack() {
    this.setState({ page: Math.max(0, this.state.page - 1) })
  }

  onForward() {
    this.setState({ page: this.state.page + 1 })
  }

  onReachEnd() {
    this.doQuery(this.state.query, { append: true, offset: this.state.results.length })
  }

  doQuery(query, options={}) {
    this.pendingRequest = this.props.onSearch(query, options)
      .then((results) => {
        if (this.cancel) return
        results = options.append ? this.state.results.concat(results) : results
        this.setState({ results: results, IS_LOADING: false })
      })
      .always(() => {
        this.pendingRequest = null
      })
  }

  search(query) {
    if (query == "") {
      return this.setState({
        query: query,
        IS_LOADING: false,
        results: [],
        page: 0
      })
    }

    this.setState({ query: query, IS_LOADING: true, results: [] })
    this.doQuery(query)
  }

  onSelect(result) {
    this.props.onSelect(result)
  }

  render() {
    let classes = classnames(styles.widget, this.props.className, {
      [styles.isExpanded]: this.state.query != "" || this.props.isExpanded,
      [styles.hasResults]: this.state.results.length > 0,
      [styles.hasColumns]: this.props.columns
    })

    let toRender
    if (this.state.IS_LOADING) {
      toRender = <Spinner />
    } else {
      if (this.state.results.length > 0) {
        toRender = <Results
          ref='results'
          results={this.state.results}
          onSelect={this.onSelect}
          ResultClass={this.props.ResultClass}
          page={this.state.page}
          onBack={this.onBack}
          onForward={this.onForward}
          onReachEnd={this.onReachEnd}
        />
      } else if (this.state.query != "") {
        toRender = <NoResults />
      }
    }

    return (
      <div className={classes}>
        <Input
          placeholder={this.props.placeholder}
          onSearch={this.search}
          onEsc={this.props.onEsc}
        />
        { toRender }
      </div>
    )
  }
}
Widget.defaultProps = {
  placeholder: "Search...",
  columns: 4
}
Widget.propTypes = {
  results: React.PropTypes.array,
  columns: React.PropTypes.oneOfType([
      React.PropTypes.bool.isRequired,
      React.PropTypes.number.isRequired
  ]),
  placeholder: React.PropTypes.string,
  onSearch: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onEsc: React.PropTypes.func.isRequired,
  ResultClass: React.PropTypes.oneOfType([
    React.PropTypes.func.isRequired,
    React.PropTypes.element.isRequired,
  ])
}
