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

/**
 * mountReactComponent
 *
 * This function is a helper that makes it easy to mount a
 * command that displays a React component.
 *
 * @param {React.Component} Component - the React component to mount
 * @param {Field} field - the field to mount on
 * @param {function} onDone - completed callback
 * @param {fucntion} onInsert - a callback to insert Types to the Field
 *
 * Usage:
 *
 * export let mount = mountReactComponent.bind(null, Component)
 */
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
      container={container}
    />,
    container
  )
}
