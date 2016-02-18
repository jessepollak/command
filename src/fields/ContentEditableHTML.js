import ContentEditable from './ContentEditable'
import HTML from './HTML'

class ContentEditableHTML extends ContentEditable {
  addImage(image) {
    this.appendText(`<img src="${image.src}" alt="${image.alt}" />`)
  }
}

export default ContentEditableHTML
