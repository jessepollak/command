import $ from 'jquery'
import 'content/vendor/jquery.atwho.js'
import 'content/vendor/jquery.atwho.scss'
import * as Commands from 'content/commands'

export function setup($element) {
  $element.atwho({
    at: "/",
    data: Commands.getAtData(),
    displayTpl: "<li>${name}<img src='${icon}' /></li>",
    insertTpl: "/${name}",
    displayTimeout: 300,
    suffix: ""
  })
}
