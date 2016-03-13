class HTML {
  insertImage(image) {
    let img = document.createElement('img')
    img.src = image.src
    img.alt = image.alt
    this.insertNode(img)
  }

  insertLink(link) {
    let a = document.createElement('a')
    a.href = link.href
    a.appendChild(document.createTextNode(link.href))
    this.insertNode(a)
  }
}

export default HTML
