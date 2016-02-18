import rangy from 'rangy/lib/rangy-selectionsaverestore.js'
import Field from './Field'

class ContentEditable extends Field {
  getText() {
    return this.$element[0].innerHTML
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
