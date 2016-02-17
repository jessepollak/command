import React from 'react'

class Help extends React.Component {
  componentDidMount() {
    window.open('https://github.com/jessepollak/slash', '_blank')
    setTimeout(this.props.onDone, 100)
  }

  render() {
    return <div></div>
  }
}
Help.regex = /\/help/
Help.trigger = "help"

export default Help
