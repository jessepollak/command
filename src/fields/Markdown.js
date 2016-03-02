class Markdown {
  addImage(image) {
    this.insertText(`![${image.alt}](${image.src})`)
  }

  addLink(link) {
    this.insertText(`[${link.href}](${link.href})`)
  }
}

export default Markdown
