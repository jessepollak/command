import './vendor/google-analytics-bundle'

var tracker

function shouldSend() {
  return (process.env.NODE_ENV == 'production' || process.env.ENABLE_ANALYTICS)
}

function addListener() {
  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method == 'sendEvent') {
      sendEvent(request.category, request.action, request.label, request.value)
    }
  });
}

function configureGA() {
  let service = analytics.getService('command')
  tracker = service.getTracker('UA-75050322-1')
  sendEvent('initialize')
  sendView('Background Page')
}

function sendView(view) {
  if (!shouldSend()) return
  tracker.sendAppView(view)
}

function sendEvent(category, action, label, value) {
  if (!shouldSend()) return
  console.log('send event', [].slice.call(arguments))
  tracker.sendEvent(category, action, label, value)
}

export function setup() {
  if (!shouldSend()) return

  configureGA()
  addListener()
}

