import rangy from 'rangy/lib/rangy-selectionsaverestore.js'
import Field from './Field'

class ContentEditable extends Field {
  getText() {
    return this.$element[0].innerHTML
  }

  persistSelection() {
    this.range = rangy.getSelection().getRangeAt(0)
  }

  removeCommand(match) {
    super.removeCommand()
    let range = this.range
    let container = range.startContainer
    if (container && container.classList && container.classList.contains("atwho-query")) {
      range.selectNode(container)
    } else {
      range.setStart(range.startContainer, range.startOffset - match.length)
    }
    range.deleteContents()

    if (range.startContainer.innerHTML == "") {
      range.selectNodeContents(range.startContainer.parentNode)
    }
  }

  insertText(text) {
    let node = document.createTextNode(text)
    this.insertNode(node)
  }

  focus() {
    this.range.select()
    this.range.collapse(false)
    this.range.select()
  }

  blur() {
    this.$element.blur()
  }

  insertNode(node) {
    this.range.insertNode(node)
    this.range.setEndAfter(node)
    this.focus()
    this.blur()
  }

  replaceText(find, replace) {
    let element = this.$element[0]
    let selection = rangy.saveSelection()
    element.innerHTML = element.innerHTML.replace(find, replace)
    rangy.restoreSelection(selection)
  }

  setText(text) {
    return this.$element[0].innerHTML = text
  }
}

export default ContentEditable
