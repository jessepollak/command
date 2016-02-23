import ContentEditable from './ContentEditable'
import ContentEditableHTML from './ContentEditableHTML'
import Textarea from './Textarea'
import TextareaMarkdown from './TextareaMarkdown'

import getDomainOverriddenField from './support/domains'
import getClassOverriddenField from './support/classes'

export const SELECTOR = 'textarea, div[contenteditable="true"]'

export function getField($element) {
  let FieldType

  if (FieldType = getClassOverriddenField($element)) {
    return new FieldType($element)
  }

  if (FieldType = getDomainOverriddenField($element)) {
    return new FieldType($element)
  }

  if ($element.is('textarea, input')) {
    FieldType = TextareaMarkdown
  } else {
    FieldType = ContentEditableHTML
  }

  return new FieldType($element)
}
