import React from 'react'
import { Redirect } from 'types'

class Help extends React.Component {
  componentDidMount() {
    setTimeout (
      () => {
        this.props.onDone(new Redirect({
          url: 'https://github.com/jessepollak/slash',
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

export default Help
