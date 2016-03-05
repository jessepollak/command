import $ from 'jquery'
import rangy from 'rangy'
import 'vendor/jquery.rangyinputs'
import 'vendor/jquery.caret'

import caretToEnd from 'caret-to-end'
import * as At from 'lib/at'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Types from 'types'
import * as Commands from 'commands'

class Field {

  constructor($element) {
    this.$element = $element
    this.listen = this.listen.bind(this)
  }

  observe() {
    this.setupQuickSelect()
    this.$element.on('keyup', this.listen)
  }

  listen() {
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
    this.add(result)
    this.focus()
  }

  removeCommand() {}

  mount(Component, match) {
    this.persistSelection()
    this.removeCommand(match)
    Component.mount(this, this.onDone.bind(this))
  }


  add(type) {
    if (!type) return

    switch (type.constructor) {
      case Types.Image:
        return this.addImage(type)
      case Types.Redirect:
        return this.addRedirect(type)
      case Types.Link:
        return this.addLink(type)
      default:
        return this.insertText(type)
    }
  }

  addImage(image) {
    throw new Error('Not implemented')
  }

  addLink(link) {
    throw new Error('Not implemented')
  }

  addRedirect(redirect) {
    window.open(redirect.url, redirect.target)
  }
}

export default Field
