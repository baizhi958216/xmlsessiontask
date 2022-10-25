import { readFile } from 'node:fs'
export function GetXBLXML() {
  return new Promise((resolve,reject) => {
    // 读取DATA下的xbl.xml文件
    readFile(`${__dirname}/../../DATA/xbl.xml`, (err, data) => {
      if (err) throw err
      // 将该对象转为Promise对象 返回xbl.xml文件流
      // toString()将文件流转为字符串
      resolve(data.toString())
    })
  })
}
