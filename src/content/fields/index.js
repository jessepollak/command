import ContentEditable from './ContentEditable'
import ContentEditableHTML from './ContentEditableHTML'
import Textarea from './Textarea'
import TextareaUnformatted from './TextareaUnformatted'

import getDomainOverriddenField from './support/domains'
import getClassOverriddenField from './support/classes'

export const SELECTOR = 'textarea, div[contenteditable="true"]'

function getFieldType($element) {
  let FieldType

  if (FieldType = getClassOverriddenField($element)) {
    return new FieldType($element)
  }

  if (FieldType = getDomainOverriddenField($element)) {
    return new FieldType($element)
  }

  if ($element.is('textarea, input')) {
    FieldType = TextareaUnformatted
  } else {
    FieldType = ContentEditableHTML
  }

  return new FieldType($element)
}
export function setup($element) {
  if ($element.data('___command_setup')) {
    return
  }

  let field = new getFieldType($element)
  field.observe()
  $element.data('___command_setup', true)
}
