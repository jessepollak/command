import TextareaMarkdown from 'fields/TextareaMarkdown'
import ContentEditableFacebook from 'fields/ContentEditableFacebook'

const MAPPING = {
  'www.facebook.com': ContentEditableFacebook,
  'github.com': TextareaMarkdown
}

export default function getDomainOverriddenField($element) {
  let hostname = window.location.hostname
  return MAPPING[hostname]
}
