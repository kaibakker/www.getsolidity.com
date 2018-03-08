const glob = require('glob-promise')

module.exports = {
  exportPathMap: async function() {
    const paths = await glob('pages/**')
    const pages = paths
      .map(path => {
        path = path.replace(/^pages/, '')
        // path = path.replace(/^abi/, '')

        path = path.replace('index.js', '')
        path = path.replace('.js', '')


        if (path === '/_document') return
        if (path === '/') return path

        path = path.replace(/\/$/, '')
        return path
      })
      .filter(Boolean)

    const pageMap = pages.reduce((map, page) => {
      map[page] = { page }
      return map
    }, {})

    return pageMap
  },

  // By default we don't have any assetPrefix.
  // This is because we need to support PR based static deployments
  // But for multi-zones suppport we are running a custom proxy which adds
  // multi-zones support.
  assetPrefix: ''
}
