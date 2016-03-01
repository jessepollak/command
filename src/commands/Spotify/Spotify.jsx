import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import classnames from 'classnames'
import { mountReactComponent } from 'commands/mount'

import styles from './Spotify.scss'
import * as Types from 'types'
import * as Search from 'components/Search'
import Container from 'components/Container'

const API_BASE = 'https://api.spotify.com/v1/search'

let search = (query, options={}) => {
  return $.get(
    API_BASE,
    {
      q: query,
      type: 'track',
      limit: 20,
      offset: options.offset
    }
  ).then((data) => {
    return data.tracks.items
  })
}

let SpotifyResult = (props) => {
  return (
    <div className={styles.result}>
      <img src={props.album.images[1].url} />
      <p className={styles.result__title}>{props.name}</p>
      <p className={styles.result__artist}>{props.artists[0].name}</p>
    </div>
  )
}

class Spotify extends React.Component {
  onSelect(result) {
    this.props.onDone(new Types.Link({
      href: result.external_urls.spotify
    }))
  }

  render() {
    return (
      <Container {...this.props}>
        <Search.Widget
          placeholder="Search Spotify..."
          onSearch={search}
          onSelect={this.onSelect.bind(this)}
          onEsc={this.props.onDone}
          ResultClass={SpotifyResult}
          columns={2}
        />
      </Container>
    )
  }
}
Spotify.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export let match = 'spotify'
export let icon = require('./Spotify.png')
export let mount = mountReactComponent.bind(null, Spotify)
