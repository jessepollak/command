import { Redirect } from 'types'

export let mount = (field, onDone) => {
  onDone(new Redirect({
    url: 'https://github.com/jessepollak/command',
    target: '_blank'
  }))
}
export let match = "help"
export let icon = require("./Help.png")
