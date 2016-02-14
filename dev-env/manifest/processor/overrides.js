import html from './lib/html'

const process = function({page, buildPath, scripts}) {
  if(!page) return

  scripts.push(html(page, buildPath))

  return true
}

export default function(manifest, {buildPath}) {

  if(!manifest.chrome_url_overrides)
    return

  const {bookmarks, history, newtab} = manifest.chrome_url_overrides

  const scripts = []

  // Bookmarks page
  process({page: bookmarks, buildPath, scripts})

  // History page
  process({page: history, buildPath, scripts})

  // New tab page
  process({page: newtab, buildPath, scripts})

  return {scripts}
}
