class HTML {
  addImage(image) {
    this.appendText(`<img src="${image.src}" alt="${image.alt}" />`)
  }
}

export default HTML
