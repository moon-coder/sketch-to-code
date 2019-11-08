const express = require('express')
//代理配置
const proxyConfig = require('../config/proxy.config')
const app = express()
const proxy = require('http-proxy-middleware')

Object.keys(proxyConfig).forEach((key) => {
  app.use(key, proxy(proxyConfig[key]))
})

app.listen(3000, function() {
  console.log('Listening on port 3000!')
})
