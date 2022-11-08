import { readFile } from "node:fs"

const dom = require('xmldom').DOMParser
const goto100xpath = require('xpath')

export function XPath(req: string) {
    const xpath = req.split('=')
    if (xpath[0] != '') {
        return new Promise(resolve => {
            readFile(`${__dirname}/../../DATA/XPath.xml`, (err, data) => {
                if (err) {
                    throw err
                } else {
                    let doc = new dom().parseFromString(data.toString())
                    let nodes = goto100xpath.select(xpath[1], doc)
                    // console.log(nodes[0].localname+': '+nodes[0].firstChild.data);
                    // console.log('Node: '+nodes);
                    resolve(nodes.toString())
                }
            })
        })
    } else {
        return null
    }
}