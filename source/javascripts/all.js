// Check if browser supports
var isSupported = !!(window.chrome && !navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i))

if (!isSupported) {
  var body = document.querySelector('body')
  body.className += " unsupported"
}
