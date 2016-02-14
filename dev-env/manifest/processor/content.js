import _ from 'lodash'

import script from './lib/script'

export default function(manifest, {buildPath}) {
  const {content_scripts} = manifest

  if(!content_scripts) return

  const scripts = []

  _.each(content_scripts, (content_script) => {
    // TODO content_script can contain css too.
    // Maybe we can be strict, throw error and tell user to add css into scripts and leave it on webpack too
    _.each(content_script.js, (scriptPath) => {
      script(scriptPath, buildPath)
      scripts.push(scriptPath)
    })
  })

  return {scripts}
}
