import TextareaMarkdown from 'fields/TextareaMarkdown'
import ContentEditableFacebook from 'fields/ContentEditableFacebook'
import ContentEditableUnformatted from 'fields/ContentEditableUnformatted'
import Unsupported from 'fields/Unsupported'

const MAPPING = {
  'www.facebook.com': Unsupported,
  'github.com': TextareaMarkdown,
  'twitter.com': Unsupported
}

export default function getDomainOverriddenField($element) {
  let hostname = window.location.hostname
  return MAPPING[hostname]
}
