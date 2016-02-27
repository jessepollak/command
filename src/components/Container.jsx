import React from 'react'
import classnames from 'classnames'

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
    return (
      <a className={styles.version} href="https://github.com/jessepollak/command/releases" target="_blank">
      Private beta v{ Extension.getVersion() }
      </a>
    )
}

let Container = (props) => {
  let style = {
    top: props.top,
    left: props.left
  }
  let classes = classnames(styles.container, props.className)

  return (
    <div className={classes} style={style}>
      { props.children }
      <Icon />
      <Version />
    </div>
  )
}
Container.propTypes = {
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  className: React.PropTypes.string
}

export default Container
