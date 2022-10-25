import http from 'node:http'
import { route } from './SERVER/Router/Router.service'
const hostname = '127.0.0.1'
const port = 3000

const corsMiddleware = require('cors')({
  // 处理VSCode跨域资源请求
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,POST',
  maxAge: 1728000,
  credentials: true,
})

const server = http.createServer((req, res) => {
  const next = () => route(req, res)
  corsMiddleware(req, res, next)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
