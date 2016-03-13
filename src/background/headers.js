export function setup() {
  // Listens when new request
  chrome.webRequest.onHeadersReceived.addListener(function(details) {
    for (let i = 0; i < details.responseHeaders.length; i++) {

      if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
        var csp = details.responseHeaders[i].value;
        csp = csp.replace('media-src', "media-src blob:");
        details.responseHeaders[i].value = csp;
      }
    }

    return { // Return the new HTTP header
      responseHeaders: details.responseHeaders
    };
  }, {
    urls: ["https://github.com/*"],
    types: ["main_frame"]
  }, ["blocking", "responseHeaders"]);
}

function isCSPHeader(headerName) {
  return (headerName == 'CONTENT-SECURITY-POLICY') || (headerName == 'X-WEBKIT-CSP');
}
