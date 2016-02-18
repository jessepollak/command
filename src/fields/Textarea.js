import Field from './Field'

class Textarea extends Field {
  getText() {
    return this.$element.val()
  }

  replaceText(find, replace) {
    return this.setText(this.getText().replace(find, replace))
  }

  setText(text) {
    return this.$element.val(text)
  }
}

export default Textarea
