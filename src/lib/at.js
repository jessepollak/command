import $ from 'jquery'
import 'vendor/jquery.atwho.js'
import 'vendor/jquery.atwho.scss'
import * as Commands from 'components/commands'

export function setup($element) {
  $element.atwho({
    at: "/",
    data: Commands.MATCHES,
    displayTimeout: 0
  })
}
