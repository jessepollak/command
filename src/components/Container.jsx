import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import NativeListener from 'react-native-listener'

import * as Extension from 'lib/extension'
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
      Private beta v{ Extension.getVersion() }
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

  componentWillMount() {
    $('html').on('click', this.unmountOnClickOutside)
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
      <div className={styles.wrapper} style={style} >
        <Close onClick={this.unmount}/>
        <div className={classes}>
          { this.props.children }
          <Icon />
          <Version />
        </div>
      </div>
    )
  }
}
Container.propTypes = {
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  className: React.PropTypes.string
}

export default Container
