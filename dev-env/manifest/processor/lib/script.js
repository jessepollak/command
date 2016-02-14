import fs from 'fs-extra'
import path from 'path'

import * as log from '../../log'
import * as Remove from '../../../util/remove';

const makeInjector = function(scriptName) {
  return (
`// Injector file for '${scriptName}'
var context = this;

// http://stackoverflow.com/questions/8403108/calling-eval-in-particular-context/25859853#25859853
function evalInContext(js, context) {
  return function() { return eval(js); }.call(context);
}

function reqListener () {
  evalInContext(this.responseText, context)
}

var request = new XMLHttpRequest();
request.onload = reqListener;
request.open("get", "https://localhost:3001/${scriptName}", true);
request.send();`
  )
}

export default function(scriptName, buildPath) {
  if(process.env.NODE_ENV == 'development') {
    log.pending(`Making injector '${scriptName}'`)

    const injectorScript = makeInjector(scriptName);
    const injectorFilepath = path.join(buildPath, scriptName);
    const injectorPath = Remove.file(injectorFilepath)

    fs.mkdirsSync(injectorPath)
    fs.writeFileSync(injectorFilepath, injectorScript, {encoding: 'utf8'})

    log.done()
  }
}
