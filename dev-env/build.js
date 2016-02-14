// Native
import fs from 'fs-extra';
import { exec } from 'child_process'

// npm
import clc from 'cli-color';

// package
import makeWebpackConfig from './webpack/config';
import webpackBuild from './webpack/build';
import Manifest from './manifest'
import * as paths from './paths'

// Clear release direcotry
fs.removeSync(paths.release)
fs.mkdirSync(paths.release)

// Create manifest
const manifest = new Manifest({manifest: paths.manifest, build: paths.build})
manifest.run()

// Build webpack
const webpackConfig = makeWebpackConfig(manifest)
const building = webpackBuild(webpackConfig)

building.then(() => {
  console.error(clc.green("Building done"))

  // Build extension
  // TODO try detect system and Chrome path. Default is OSX :)
  const chromeBinaryPath = process.env.CHROME_BIN || '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'

  console.log(clc.yellow(`Packing extension into '${paths.build}'`))
  exec(`\$('${chromeBinaryPath}' --pack-extension=${paths.build})`, (error, stdout, stderr) => {
    console.log(clc.green('Done'));

    if(stdout)
    console.log(clc.yellow('stdout: ' + stdout));

    if(stderr)
    console.log(clc.red('stderr: ' + stderr));

    if(error !== null)
    console.log(clc.red('exec error: ' + error));
  })
}).catch((reason) => {
  console.error(clc.red("Building failed"))
  console.error(clc.red(reason.stack))
})
