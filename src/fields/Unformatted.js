class HTML {
  insertImage(image) {
    this.insertText(image.src)
  }

  insertLink(link) {
    this.insertText(link.href)
  }
}

export default HTML
