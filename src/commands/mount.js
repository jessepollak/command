import $ from 'jquery'
import ReactDOM from 'react-dom'
import React from 'react'

function getContainer() {
  let $container = $('.command__container')
  if (!$container.length) {
    $container = $('<div>')
      .addClass('command__container')
      .appendTo('body')
  }
  return $container[0]
}

export function mountReactComponent(Component, field, onDone, onInsert) {
  let caretOffset = field.getCaretOffset()
  let container = getContainer()
  let _onDone = (result) => {
    ReactDOM.unmountComponentAtNode(container)
    onDone(result)
  }

  ReactDOM.render(
    <Component
      field={field}
      top={caretOffset.top}
      left={caretOffset.left}
      onInsert={onInsert}
      onDone={_onDone}
    />,
    getContainer()
  )
}
