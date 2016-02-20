import ContentEditableFacebook from 'fields/ContentEditableFacebook'

const MAPPING = {
  'www.facebook.com': ContentEditableFacebook
}

export default function getDomainOverriddenField($element) {
  let hostname = window.location.hostname
  return MAPPING[hostname]
}
