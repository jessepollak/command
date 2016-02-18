import indexBy from 'lodash.indexBy'
import pluck from 'lodash.pluck'

import Giphy from './Giphy/Giphy'
import Help from './Help/Help'

const COMMANDS = {
  Giphy,
  Help
}

export let MATCHES = pluck(COMMANDS, 'match')
export let MATCH_TO_COMMAND = indexBy(COMMANDS, 'match')
export let MATCH_REGEX = new RegExp(`(?:^|\\s)\/(${MATCHES.join("|")})`)

export function match(text) {
  let match = text.match(MATCH_REGEX)
  if (match) {
    return {
      command: MATCH_TO_COMMAND[match[1]],
      match: match[0]
    }
  } else {
    return {}
  }
}
