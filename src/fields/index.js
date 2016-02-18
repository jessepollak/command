import ContentEditable from './ContentEditable'
import ContentEditableHTML from './ContentEditableHTML'
import Textarea from './Textarea'
import TextareaMarkdown from './TextareaMarkdown'

export const SELECTOR = 'textarea, div[contenteditable="true"]'

export function getField($element) {
  let FieldType

  if ($element.is('textarea, input')) {
    FieldType = TextareaMarkdown
  } else {
    FieldType = ContentEditableHTML
  }

  return new FieldType($element)
}
