import $ from 'jquery'
window.jQuery = $

import 'textarea-helper'
import 'vendor/jquery.caret'
import * as Editable from 'lib/editable'
import React from 'react'
import ReactDOM from 'react-dom'
import { Giphy } from 'components'

function cleanupCommand(Component, $element) {
  if ($element.is('textarea, input')) {
    $element.val($element.val().replace(Component.regex, ""))
  } else {
    let element = $element[0]
    element.innerHTML = element.innerHTML.replace(Component.regex, "")
  }
}


function mount(Component, $element) {
    var $container = $('.slash__container')
    if (!$container.length) {
      $container = $('<div>')
        .addClass('slash__container')
        .appendTo('body')
    }

    Editable.replaceText($element, Component.regex, "")
    let caretOffset = Editable.getCaretOffset($element)
    let unmount = () => {
      ReactDOM.unmountComponentAtNode($container[0])
      Editable.focus($element)
    }

    ReactDOM.render(
      <Component
        $element={$element}
        top={caretOffset.top}
        left={caretOffset.left}
        onDone={unmount}
      />,
      $container[0]
    )
}

$('textarea.comment-form-textarea').on('keyup', (e) => {
  let $element = $(e.target)
  let text = Editable.getText($element)
  if (text.match(Giphy.regex)) {
    mount(Giphy, $element)
  }
})

