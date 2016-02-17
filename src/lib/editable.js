import 'vendor/jquery.caret'
import 'textarea-helper'
import rangy from 'rangy/lib/rangy-selectionsaverestore.js'
import caretToEnd from 'caret-to-end'

export function getText($element) {
  if ($element.is('textarea, input')) {
    return $element.val()
  } else {
    return $element[0].innerHTML
  }
}

export function getCaretOffset($element) {
  return $element.caret('offset')
}

export function replaceText($element, find, replace) {
  if ($element.is('textarea, input')) {
    $element.val($element.val().replace(find, replace))
  } else {
    let element = $element[0]
    let selection = rangy.saveSelection()
    element.innerHTML = element.innerHTML.replace(find, replace)
    rangy.restoreSelection(selection)
  }
}

export function setText($element, text) {
  if ($element.is('textarea, input')) {
    return $element.val(text)
  } else {
    return $element[0].innerHTML = text
  }
}

export function appendText($element, text) {
  setText($element, getText($element) + text)
}

export function appendImage($element, options) {
  let text
  if ($element.is('textarea, input')) {
    text = `![${options.alt}](${options.src})`
  } else {
    text = `<img src="${options.src}" alt="${options.alt}" />`
  }

  appendText(
    $element,
    text
  )
}

export function focus($element) {
  caretToEnd($element[0])
}
