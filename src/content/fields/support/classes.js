import TextareaUnformatted from 'content/fields/TextareaUnformatted'
import TextareaMarkdown from 'content/fields/TextareaMarkdown'

const MAPPING = {
  'uiTextareaNoResize': TextareaUnformatted,
  'markdown-area': TextareaMarkdown
}

export default function getClassOverriddenField($element) {
  let override
  let classes = $element[0].className.split(/\s+/)
  for (let cls of classes) {
    if (override = MAPPING[cls]) {
      return override
    }
  }
}
