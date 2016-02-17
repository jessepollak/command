import $ from 'jquery'
import 'vendor/jquery.atwho.js'
import 'vendor/jquery.atwho.scss'
import * as Commands from 'components/commands'

var items = _.map(Commands, (command) => {
  return command.trigger.toLowerCase()
})

export function setup($element) {
  $element.atwho({
    at: "/",
    data: items,
    displayTimeout: 0
  })
}
