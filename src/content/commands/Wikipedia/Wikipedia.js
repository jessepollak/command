import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import classnames from 'classnames'
import { mountReactComponent } from 'content/commands/mount'

import styles from './Wikipedia.scss'
import * as Types from 'content/types'
import * as Search from 'content/components/Search'
import Container from 'content/components/Container'

const API_BASE = 'https://wikipedia.org/w/api.php'

var items = []

let search = (query, options={}) => {

  return $.ajax({
    url: API_BASE,
    data: {
      action: 'opensearch',
      search: query,
      format: 'json',
      limit: '5',
      offset: options.offset
    }
  }).then((data) => {
    for (var i = 0; i < data[1].length; i++) {
      var item = {id: i, title: data[1][i], excerpt: data[2][i], url: data[3][i]}
      items[i] = item
    }

    return items
  })
}

let WikipediaResult = (props) => {
  return (
    <div className={styles.result}>
        {props.title}
    </div>
  )
}

class Wikipedia extends React.Component {
  onSelect(result) {
    this.props.onDone(new Types.Link({
      href: result.url
    }))
  }

  render() {
    return (
      <Container {...this.props}>
        <Search.Widget
          placeholder="Search Wikipedia..."
          onSearch={search}
          onSelect={this.onSelect.bind(this)}
          onEsc={this.props.onDone}
          ResultClass={WikipediaResult}
          columns={1}
        />
      </Container>
    )
  }
}
Wikipedia.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export let match = "wiki"
export let icon = require("./Wikipedia.png")
export let mount = mountReactComponent.bind(null, Wikipedia)
