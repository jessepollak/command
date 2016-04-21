import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import NativeListener from 'react-native-listener'
import Draggable from 'react-draggable'

import * as Extension from 'content/lib/extension'
import styles from './Container.scss'

let Icon = (props) => {
  return (
    <a className={styles.icon} href="https://github.com/jessepollak/command" target="_blank">
      <img src={require('icons/command.png')} />
    </a>
  )
}

let Version = (props) => {
    if (!Extension.isExtension()) return <span />
    return (
      <a className={styles.version} href="https://github.com/jessepollak/command/releases" target="_blank">
      v{ Extension.getVersion() }
      </a>
    )
}

let Close = (props) => {
  return (
    <a className={styles.close} onClick={props.onClick}>dismiss</a>
  )
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.unmountOnClickOutside = this.unmountOnClickOutside.bind(this)
    this.unmount = this.unmount.bind(this)
  }

  componentDidMount() {
    // we add this event listener in a callback because
    // without the jump to the back of the event loop, this
    // listener picks up the "click" event when a user clicks
    // the at.js dropdown to select a command
    setTimeout(() => {
      $('html').on('click', this.unmountOnClickOutside)
    }, 0)
  }

  componentWillUnmount() {
    $('html').off('click', this.unmountOnClickOutside)
  }

  unmountOnClickOutside(evt) {
    if (!this.props.container.contains(evt.target)) {
      this.unmount()
    }
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.props.container)
  }

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left
    }
    let classes = classnames(styles.container, this.props.className)

    return (
      <Draggable>
      <div className={styles.wrapper} style={style} >
        <Close onClick={this.unmount}/>
        <div className={classes}>
          { this.props.children }
          <Icon />
          <Version />
        </div>
      </div>
      </Draggable>
    )
  }
}
Container.propTypes = {
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  className: React.PropTypes.string
}

export default Container
