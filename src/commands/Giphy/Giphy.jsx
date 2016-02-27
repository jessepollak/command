import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import Spinner from 'react-spinner'
import classnames from 'classnames'
import { mountReactComponent } from 'commands/mount'

import 'react-spinner/react-spinner.css'
import styles from './Giphy.scss'
import * as Types from 'types'
import Container from 'components/Container'
import * as Search from 'components/Search'

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
      <Container isExpanded={isExpanded} className={classnames(classes)} {...this.props}>
        <Search.Input
          onSearch={this.search}
          onEsc={this.props.onDone}
        />
        { toRender }
      </Container>
    )
  }
}
Giphy.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export let match = 'giphy'
export let icon = require('./Giphy.png')
export let mount = mountReactComponent.bind(null, Giphy)
