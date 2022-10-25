import http from 'node:http'
import { GetXBLXML } from './SERVER/GetXML/GetXML.service'
const hostname = '127.0.0.1'
const port = 3000

const corsMiddleware = require('cors')({
  // 处理VSCode跨域资源请求
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,POST',
  maxAge: 1728000,
  credentials: true,
});

const server = http.createServer((req, res) => {
  const next =()=> GetXBLXML().then((data) => {
    res.statusCode = 200
    // 返回xml标头使浏览器渲染xml格式
    res.setHeader('Content-Type', 'text/xml')
    res.end(data)
  })
  corsMiddleware(req, res, next);
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})