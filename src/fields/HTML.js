class HTML {
  addImage(image) {
    this.appendText(`<img src="${image.src}" alt="${image.alt}" />`)
  }

  addLink(link) {
    this.appendText(`<a href="${link.href}">${link.href}</a>`)
  }
}

export default HTML
