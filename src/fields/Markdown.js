class Markdown {
  addImage(image) {
    this.appendText(`![${image.alt}](${image.src})`)
  }
}

export default Markdown
