import TextareaMarkdown from 'content/fields/TextareaMarkdown'
import ContentEditableFacebook from 'content/fields/ContentEditableFacebook'
import ContentEditableUnformatted from 'content/fields/ContentEditableUnformatted'
import Unsupported from 'content/fields/Unsupported'

const MAPPING = {
  'www.messenger.com': Unsupported,
  'www.facebook.com': Unsupported,
  'github.com': TextareaMarkdown,
  'twitter.com': Unsupported
}

export default function getDomainOverriddenField($element) {
  let hostname = window.location.hostname
  return MAPPING[hostname]
}
