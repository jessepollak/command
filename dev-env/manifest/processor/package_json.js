import fs from 'fs'
import _ from 'lodash'

import * as paths from '../../paths'

//////////
// Merge manifest.json with name, description and version from package.json
export default function(manifest) {
  const packageConfig = JSON.parse(fs.readFileSync(paths.packageJson, 'utf8'))

  manifest = _.merge({}, manifest, _.pick(packageConfig, 'name', 'description', 'version'));

  return {manifest}
}
