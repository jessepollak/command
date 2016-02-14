import * as log from '../log'

//////////
// CSP. Fix Content security policy to allow eval webpack scripts in development mode
export default function(manifest) {
  log.pending("Processing CSP")

  if(process.env.NODE_ENV == 'development') {

    let csp = manifest["content_security_policy"] || ""

    const objectSrc = "object-src 'self'"

    if(~csp.indexOf('object-src')) {
      csp = csp.replace('object-src', objectSrc)
    } else {
      csp = `${objectSrc}; ${csp}`
    }

    // TODO add host into some config
    const scriptSrc = "script-src 'self' 'unsafe-eval' https://localhost:3001"

    if(~csp.indexOf('script-src')) {
      csp = csp.replace('script-src', scriptSrc)
    } else {
      csp = `${scriptSrc}; ${csp}`
    }

    manifest["content_security_policy"] = csp

    log.done("Done")
  } else {
    log.done("Skipped in production environment")
  }

  return {manifest}
}
