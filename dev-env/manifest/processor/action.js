import html from './lib/html'

const process = function({action: {default_popup} = {}, buildPath, scripts}) {
  if(!default_popup) return

  scripts.push(html(default_popup, buildPath))

  return true
}

export default function(manifest, {buildPath}) {

  const {browser_action, page_action} = manifest

  const scripts = []

  // Browser action
  process({action: browser_action, buildPath, scripts})

  // Page action
  process({action: page_action, buildPath, scripts})

  return {scripts}
}
