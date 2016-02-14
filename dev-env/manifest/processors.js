import Csp         from './processor/csp'
import PackageJson from './processor/package_json'
import Assets      from './processor/assets'
import Action      from './processor/action'
import Background  from './processor/background'
import Content     from './processor/content'
import Overrides   from './processor/overrides'


const processors = [
  // Fix csp for devel
  Csp,
  // Mege package.json
  PackageJson,
  // Process assets
  Assets,
  // Process action (browse, or page)
  Action,
  // Process background script
  Background,
  // Process content script
  Content,
  // Process overrides
  Overrides
]

export default processors
