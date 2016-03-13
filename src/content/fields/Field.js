import $ from 'jquery'
import rangy from 'rangy'
import 'content/vendor/jquery.rangyinputs'
import 'content/vendor/jquery.caret'

import caretToEnd from 'caret-to-end'
import * as At from 'content/lib/at'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Types from 'content/types'
import * as Commands from 'content/commands'
import * as Analytics from 'content/lib/analytics'

class Field {

  constructor($element) {
    this.$element = $element
    this.listen = this.listen.bind(this)
  }

  observe() {
    this.setupQuickSelect()
    this.$element.on('keyup inserted.atwho', this.listen)
  }

  listen(e) {
    let { command, match } = Commands.match(this.getText())
    if (command) {
      this.mount(command, match)
    }
  }

  setupQuickSelect() {
    At.setup(this.$element)
    this.$element.on('reposition.atwho', (e, offset) => {
      this.offset = offset
    })
  }

  getText() {
    throw new Error('Not implemented')
  }

  replaceText(text) {
    throw new Error('Not implemented')
  }

  setText(text) {
    throw new Error('Not implemented')
  }

  getCaretOffset() {
    return this.offset || this.$element.caret('offset')
  }

  onBlur() {
    this.$element.off('keyup', this.listen)
  }

  onDone(result) {
    if (result) {
      this.insert(result)
    }
    this.focus()
  }

  removeCommand() {
    this.$element.atwho('hide')
  }

  mount(Component, match) {
    this.persistSelection()
    this.removeCommand(match)
    Component.mount(this, this.onDone.bind(this), this.insert.bind(this))
    Analytics.sendEvent('command', 'mount', Component.match)
  }


  insert(type) {
    if (!type) return

    switch (type.constructor) {
      case Types.Image:
        return this.insertImage(type)
      case Types.Redirect:
        return this.insertRedirect(type)
      case Types.Link:
        return this.insertLink(type)
      default:
        return this.insertText(type)
    }
  }

  insertImage(image) {
    throw new Error('Not implemented')
  }

  insertLink(link) {
    throw new Error('Not implemented')
  }

  insertRedirect(redirect) {
    window.open(redirect.url, redirect.target)
  }
}

export default Field
