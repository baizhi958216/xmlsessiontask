import { IncomingMessage, ServerResponse } from 'node:http'
import { GetVocabulary } from '../CET4/GetCET4.service'
import { GetStudentXML, GetXBLXML } from '../GetXML/GetXML.service'

export function route(req: IncomingMessage, res: ServerResponse) {
  return new Promise((resolve, reject) => {
    switch (req.url) {
      case '/':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css;charset=utf8')
        res.end('😄~~~')
        break
      case '/xblxml':
        GetXBLXML().then((data) => {
          res.statusCode = 200
          // 返回xml标头使浏览器渲染xml格式
          res.setHeader('Content-Type', 'text/xml')
          res.end(data)
          resolve(res)
        })
        break
      case '/studentxml':
        GetStudentXML(req).then((data) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/xml')
          res.end(data)
          resolve(res)
        })
        break
      case '/cet4':
        GetVocabulary(req).then(data=>{
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          res.end(data)
          resolve(res)
        })
        break
      default:
        console.log(`用户访问${req.url}`)
        res.writeHead(404, { 'Content-Type': 'text/css;charset=utf8' })
        res.end(`你正在访问${req.url}, 但这个网页还没写..., 所以404 NOT FOUND😋`)
        break
    }
  })
}
