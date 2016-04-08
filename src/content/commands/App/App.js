import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import classnames from 'classnames'
import { mountReactComponent } from 'content/commands/mount'

import styles from './App.scss'
import * as Types from 'content/types'
import * as Search from 'content/components/Search'
import Container from 'content/components/Container'

const API_BASE = 'https://itunes.apple.com/search'

let search = (query, options={}) => {

  console.log("search")

  return $.getJSON({
    url: API_BASE,
    data: {
      term: query,
      media: 'software',
      limit: '16',
      format: 'json'
    }
  }).then((data) => {
    console.log("Done!")
    return data.results
  })
}

let AppResult = (props) => {
  console.log("App Result")
  return (
    <div className={styles.result}>
      <img src={props.artworkUrl100} />
      <p className={styles.result__title}>{props.trackName}</p>
      <p className={styles.result__artist}>{props.formattedPrice}</p>
    </div>
  )
}

class App extends React.Component {
  onSelect(result) {
    console.log("Result")
    console.log(result)
    this.props.onDone(new Types.Link({
      href: result.trackViewUrl
    }))
  }

  render() {
    return (
      <Container {...this.props}>
        <Search.Widget
          placeholder="Search App Store..."
          onSearch={search}
          onSelect={this.onSelect.bind(this)}
          onEsc={this.props.onDone}
          ResultClass={AppResult}
          columns={1}
        />
      </Container>
    )
  }
}
App.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export let match = 'app'
export let icon = require('./App.png')
export let mount = mountReactComponent.bind(null, App)
