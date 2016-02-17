import $ from 'jquery'
import * as At from 'lib/at'
import * as Editable from 'lib/editable'
import React from 'react'
import ReactDOM from 'react-dom'

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

import * as Commands from 'components/commands'

function listen(e) {
  let $element = $(e.target)
  let text = Editable.getText($element)
  if (text.match(Commands.Giphy.regex)) {
    mount(Commands.Giphy, $element)
  } else if (text.match(Commands.Help.regex)) {
    mount(Commands.Help, $element)
  }
}

const SELECTOR = 'textarea, div[contenteditable="true"]'
$(document).on('focus', SELECTOR, (e) => {
  At.setup($(e.target))
  $(e.target).on('keyup', listen)
})
$(document).on('blur', SELECTOR, (e) => {
  $(e.target).off('keyup', listen)
})
