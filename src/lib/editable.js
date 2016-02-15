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
    element.innerHTML = element.innerHTML.replace(find, replace)
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

export function focus($element) {
  if ($element.is('textarea, input')) {
    return $element.focus()
  } else {
    let element = $element.get(0)
    var range = document.createRange()
    var selection = window.getSelection()
    range.setStart(element, 1)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
  }
}
