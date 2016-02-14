import fs from 'fs-extra'
import path from 'path'
import _ from 'lodash'

import * as paths from '../../paths'
import * as log from '../log'
import * as Remove from '../../util/remove';

const buildAssetsDir = "$assets"

const processAsset = function(object, key, buildPath) {
  const assetPath = object[key]

  log.pending(`Processing asset '${assetPath}'`)

  // Create directory if not exists
  const buildAssetsDirPath = path.join(buildPath, buildAssetsDir)
  try {
    const buildAssetsDirStats = fs.lstatSync(buildAssetsDirPath);

    if(!buildAssetsDirStats.isDirectory()) {
      fs.mkdirsSync(buildAssetsDirPath)
    }
  } catch(ex) {
    fs.mkdirsSync(buildAssetsDirPath)
  }

  const assetSrcPath = path.join(paths.src, assetPath)
  const buildAssetPath = path.join(buildAssetsDir, Remove.path(assetPath))
  const assetDestPath = path.join(buildPath, buildAssetPath)

  fs.copySync(assetSrcPath, assetDestPath)

  object[key] = buildAssetPath

  log.done(`Done`)

  return true
}

export default function(manifest, {buildPath}) {

  // Process icons
  if (manifest.icons && Object.keys(manifest.icons).length) {
    _.forEach(manifest.icons, (iconPath, name) => processAsset(manifest.icons, name, buildPath))
  }

  // TODO can there be more assets?

  return {manifest}
}
