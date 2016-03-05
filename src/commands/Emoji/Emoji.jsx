import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import classnames from 'classnames'
import { mountReactComponent } from 'commands/mount'
import * as Emojilib from 'emojilib'

import 'react-spinner/react-spinner.css'
import styles from './Emoji.scss'
import * as Types from 'types'
import * as Search from 'components/Search'
import Container from 'components/Container'

// set IDs for keys
_.map(Emojilib.lib, (v, k) => {
  v.id = k
  return v
})

let doesSupportEmoji = () => {
  if (!document.createElement('canvas').getContext) return
  var context = document.createElement('canvas').getContext('2d')
  if (typeof context.fillText != 'function') return
  // :smile: String.fromCharCode(55357) + String.fromCharCode(56835)
  let smile = String.fromCodePoint(0x1F604)

  context.textBaseline = "top"
  context.font = "32px Arial"
  context.fillText(smile, 0, 0)
  return context.getImageData(16, 16, 1, 1).data[0] !== 0
}

let EMOJIS_BY_CATEGORY = _.reduce(Emojilib.lib, (memo, v, k) => {
  let category = v.category
  if (!memo[category]) {
    memo[category] = []
  }
  memo[category].push(v)
  return memo
}, {})

let EmojiItem = (props) => {
  return (
    <div className={styles.emojiItem} onClick={props.onClick}>
      <span className={styles.emojiChar}>
        {props.char}
      </span>
    </div>
  )
}

let EmojiCategoriesHeaderItem = (props) => {
  let classes = classnames(styles.emojiCategoriesHeaderItem, {
    [styles['isActive']]: props.active == props.type
  })
  return (
    <div className={classes} onClick={props.onSelect.bind(null, props.type)} >
      <img src={require(`./icons/${props.type}.png`)} />
    </div>
  )
}

let EmojiCategoriesHeader = (props) => {
  var oldProps = props
  return (
    <div className={styles.emojiCategoriesHeader}>
      <EmojiCategoriesHeaderItem type="people" {...props} />
      <EmojiCategoriesHeaderItem type="animals_and_nature" {...props} />
      <EmojiCategoriesHeaderItem type="food_and_drink" {...props} />
      <EmojiCategoriesHeaderItem type="activity" {...props} />
      <EmojiCategoriesHeaderItem type="travel_and_places" {...props} />
      <EmojiCategoriesHeaderItem type="objects" {...props} />
      <EmojiCategoriesHeaderItem type="symbols" {...props} />
      <EmojiCategoriesHeaderItem type="flags" {...props} />
    </div>
  )
}

let EmojiContainer = (props) => {
  let items = _.map(props.items, (v) => {
    return (
      <EmojiItem
        onClick={props.onSelect.bind(null, v)}
        key={v.id}
        {...v}
      />
    )
  })
  return (
    <div className={styles.emojiContainer}>
      { items }
    </div>
  )
}

class EmojiCategories extends React.Component {
  constructor() {
    super()
    this.state = { active: 'people' }
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  onSelectCategory(category) {
    this.setState({ active: category })
  }

  render() {

    return (
      <div className={styles.emojiCategories}>
        <EmojiCategoriesHeader
          items={this.props.items}
          active={this.state.active}
          onSelect={this.onSelectCategory}
        />
        <EmojiContainer
          items={EMOJIS_BY_CATEGORY[this.state.active]}
          onSelect={this.props.onSelect}
        />
      </div>
    )
  }
}
EmojiCategories.defaultProps = {
  items: EMOJIS_BY_CATEGORY
}

let EmojiSearch = (props) => {
  let items = _.reduce(Emojilib.lib, (memo, v, k) => {
    if (k.indexOf(props.query) > -1) {
      memo.push(v)
    }
    return memo
  }, [])

  return (
    <div className={styles.emojiSearch}>
      <EmojiContainer
        items={items}
        onSelect={props.onSelect}
      />
    </div>
  )
}

class Emoji extends React.Component {
  constructor() {
    super()
    this.state = { query: "" }
    this.onSelect = this.onSelect.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onSelect(result) {
    this.props.onDone(result.char)
  }

  onSearch(query) {
    this.setState({ query: query })
  }

  render() {
    let render
    if (this.props.doesSupportEmoji) {
      if (this.state.query != "") {
        render = <EmojiSearch query={this.state.query} onSelect={this.onSelect}/>
      } else {
        render = <EmojiCategories onSelect={this.onSelect}/>
      }
    } else {
      render = <p className={styles.noSupport}>Your browser does not support emoji.</p>
    }

    return (
      <Container className={styles.emoji} {...this.props}>
        <Search.Input onEsc={this.props.onDone} onSearch={this.onSearch}/>
        { render }
      </Container>
    )
  }
}
Emoji.defaultProps = {
  doesSupportEmoji: doesSupportEmoji()
}
Emoji.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export let match = 'emoji'
export let icon = require('./Emoji.png')
export let mount = mountReactComponent.bind(null, Emoji)
