import Textarea from './Textarea'
import Markdown from './Markdown'

class TextareaMarkdown extends Textarea {
  addImage(image) {
    this.appendText(`![${image.alt}](${image.src})`)
  }
}

export default TextareaMarkdown
