class HTML {
  addImage(image) {
    this.appendText(image.src)
  }

  addLink(link) {
    this.appendText(link.href)
  }
}

export default HTML
