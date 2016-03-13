class Markdown {
  insertImage(image) {
    this.insertText(`![${image.alt}](${image.src})`)
  }

  insertLink(link) {
    this.insertText(`[${link.href}](${link.href})`)
  }
}

export default Markdown
