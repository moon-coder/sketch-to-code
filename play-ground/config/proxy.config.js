const basePath = 'http://172.23.188.102:9910'
const Proxy = {
  '/mg': {
    target: basePath,
    changeOrigin: true,
    pathRewrite: { '^/mg': '/api/mgbox/mg' }
  },
  '/biz': {
    target: basePath,
    changeOrigin: true,
    pathRewrite: { '^/biz': '/api/cping/biz' }
  }
}

module.exports = Proxy
