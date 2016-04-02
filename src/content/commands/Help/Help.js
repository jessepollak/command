import { Redirect } from 'content/types'

export let mount = (field, onDone) => {
  onDone(new Redirect({
    url: 'https://github.com/jessepollak/command/wiki/Getting-started',
    target: '_blank'
  }))
}
export let match = "help"
export let icon = require("./Help.png")
