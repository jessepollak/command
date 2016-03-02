import Field from './Field'

class Textarea extends Field {
  getText() {
    return this.$element.val()
  }

  persistSelection() {
    this.range = this.$element.getSelection()
  }

  removeCommand(match) {
    super.removeCommand()
    this.$element.deleteText(this.range.start - match.length, this.range.start, true)
    this.range = this.$element.getSelection()
  }

  insertText(text) {
    this.$element.insertText(text, this.range.start, "collapseToEnd")
  }

  focus() {
    this.$element.collapseSelection(false)
    this.$element.focus()
  }

  replaceText(find, replace) {
    return this.setText(this.getText().replace(find, replace))
  }

  setText(text) {
    return this.$element.val(text)
  }
}

export default Textarea
