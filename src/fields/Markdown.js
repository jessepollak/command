class Markdown {
  addImage(image) {
    this.appendText(`![${image.alt}](${image.src})`)
  }

  addLink(link) {
    this.appendText(`[${link.href}](${link.href})`)
  }
}

export default Markdown
