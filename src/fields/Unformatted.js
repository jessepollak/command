class HTML {
  addImage(image) {
    this.insertText(image.src)
  }

  addLink(link) {
    this.insertText(link.href)
  }
}

export default HTML
