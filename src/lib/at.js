import $ from 'jquery'
import 'vendor/jquery.atwho.js'
import 'vendor/jquery.atwho.scss'
import * as Commands from 'commands'

export function setup($element) {
  $element.atwho({
    at: "/",
    data: Commands.getAtData(),
    displayTpl: "<li>${name}<img src='${icon}' /></li>",
    displayTimeout: 0
  })
}
