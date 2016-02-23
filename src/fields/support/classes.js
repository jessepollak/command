import TextareaUnformatted from 'fields/TextareaUnformatted'

const MAPPING = {
  'uiTextareaNoResize': TextareaUnformatted
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
