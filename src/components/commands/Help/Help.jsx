import React from 'react'
import { Redirect } from 'types'

class Help extends React.Component {
  componentDidMount() {
    setTimeout (
      () => {
        this.props.onDone(new Redirect({
          url: 'https://github.com/jessepollak/command',
          target: '_blank'
        }))
      },
      0
    )
  }

  render() {
    return <div></div>
  }
}
Help.match = "help"
Help.icon = require('./Help.png')

export default Help
