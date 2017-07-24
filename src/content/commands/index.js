import indexBy from 'lodash.indexby'
import pluck from 'lodash.pluck'

// need this import for global spinners to work
import 'react-spinner/react-spinner.css'

let COMMANDS = []
let requirer = require.context('./', true, /(\.js|\.jsx)$/)
for (let key of requirer.keys()) {
  let maybeCommand = requirer(key)
  if (maybeCommand.match && maybeCommand.mount) {
    COMMANDS.push(maybeCommand)
  }
}

export let MATCHES = pluck(COMMANDS, 'match')
export let MATCH_TO_COMMAND = indexBy(COMMANDS, 'match')
export let MATCH_REGEX = new RegExp(`(?:^|\\s|>)\/(${MATCHES.join("|")})`)

export function match(text) {
  let match = text.match(MATCH_REGEX)
  if (match) {
    return {
      command: MATCH_TO_COMMAND[match[1]],
      match: '/' + match[1]
    }
  } else {
    return {}
  }
}

export function getAtData() {
  return _.map(COMMANDS, (command) => {
    return {
      name: command.match,
      icon: command.icon
    }
  })
}
