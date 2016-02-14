import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { Giphy } from 'components'

function mount(Component, element) {
    var $container = $('.slash__container')
    if (!$container.length) {
      $container = $('<div>')
        .addClass('slash__container')
        .appendTo('body')
    }

    element.value = element.value.replace(Component.regex, "")

    ReactDOM.render(
      <Component
        element={element}
        onDone={() => {
          ReactDOM.unmountComponentAtNode($container[0])
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
