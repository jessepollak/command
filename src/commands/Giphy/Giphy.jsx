import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import classnames from 'classnames'
import { mountReactComponent } from 'commands/mount'

import 'react-spinner/react-spinner.css'
import styles from './Giphy.scss'
import * as Types from 'types'
import * as Search from 'components/Search'
import Container from 'components/Container'

const API_BASE = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = 'dc6zaTOxFJmzC'

let search(query) => {
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

let GiphyResult = (props) => {
  return (
    <img
      src={props.images.fixed_width_small.url}
    />
  )
}

class Giphy extends React.Component {
  onSelect(result) {
    this.props.onDone(new Types.Image({
      src: result.images.original.url,
      alt: result.slug,
      url: result.url
    }))
  }

  render() {
    return (
      <Container {...this.props}>
        <Search.Widget
          onSearch={search}
          onSelect={this.onSelect.bind(this)}
          onEsc={this.props.onDone}
          ResultClass={GiphyResult}
        />
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
