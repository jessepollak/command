import $ from 'jquery'
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
    this.$element.on('blur', (e) => {
      this.$element.off('keup', this.listen)
    })
  }

  listen() {
    let { command, match } = Commands.match(this.getText())
    if (command) {
      this.mount(command, match)
    }
  }

  setupQuickSelect() {
    At.setup(this.$element)
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

  appendText(text) {
    this.setText(this.getText() + text)
  }

  getCaretOffset() {
    return this.$element.caret('offset')
  }

  focus() {
    caretToEnd(this.$element[0])
  }

  onBlur() {
    this.$element.off('keyup', this.listen)
  }

  mount(Component, match) {
      this.replaceText(match, "")

      let onDone = (result) => {
        this.add(result)
        this.focus()
      }

      Component.mount(this, onDone)
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
        throw new Error("Not implemented error")
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
