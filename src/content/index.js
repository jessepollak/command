import $ from 'jquery'
window.jQuery = $

import 'textarea-helper'
import React from 'react'
import ReactDOM from 'react-dom'
import { Giphy } from 'components'

function mount(Component, element) {
    console.log('mounting')
    var $container = $('.slash__container')
    if (!$container.length) {
      $container = $('<div>')
        .addClass('slash__container')
        .appendTo('body')
    }

    let $element = $(element)
    $element.val($element.val().replace(Component.regex, ""))
    let caretPos = $element.textareaHelper('caretPos')
    let elementPos = $element.offset()

    ReactDOM.render(
      <Component
        element={element}
        top={elementPos.top + caretPos.top}
        left={elementPos.left + caretPos.left}
        onDone={() => {
          ReactDOM.unmountComponentAtNode($container[0])
          $(element).focus()
        }}
      />,
      $container[0]
    )
}

$('textarea').on('keyup', (e) => {
  var text = e.target.value
  if (text.match(Giphy.regex)) {
    mount(Giphy, e.target)
  }
})
