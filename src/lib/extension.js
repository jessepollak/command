export function isExtension() {
  return !!(window.chrome && window.chrome.runtime && window.chrome.runtime.getManifest)
}
export function getVersion() {
  if (isExtension()) {
    return chrome.runtime.getManifest().version
  }
}
