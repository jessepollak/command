export function isExtension() {
  return !!(window.chrome && window.chrome.runtime && window.chrome.runtime.getManifest)
}

export function getVersion() {
  if (isExtension()) {
    return chrome.runtime.getManifest().version
  }
}

export function sendMessage() {
  if (isExtension()) {
    chrome.runtime.sendMessage.apply(chrome.runtime, arguments)
  }
}
