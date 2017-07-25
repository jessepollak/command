import TextareaMarkdown from 'content/fields/TextareaMarkdown'
import ContentEditableFacebook from 'content/fields/ContentEditableFacebook'
import ContentEditableUnformatted from 'content/fields/ContentEditableUnformatted'
import Unsupported from 'content/fields/Unsupported'

const MAPPING = {
  'www.messenger.com': Unsupported,
  'www.facebook.com': Unsupported,
  'twitter.com': Unsupported
}

// Consider any page with github in the hostname to be a github page.
// Adds support for GHE
const hostname = window.location.hostname
if (hostname.includes('github')) {
  MAPPING[hostname] = TextareaMarkdown
}

export default function getDomainOverriddenField($element) {
  let hostname = window.location.hostname
  return MAPPING[hostname]
}
