function GetXMLs (url, method) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.response)
            }
        }
    })
}

function GetXPath(url,xpath){
    return new Promise(resolve=>{
        const xhr = new XMLHttpRequest()
        xhr.open('POST',url,true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(`XPath=${xpath}`)
        xhr.onreadystatechange=()=>{
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.response)
            }
        }
    })
}

function PagesSelect(url,data){
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.send(data)

        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.response)
            }
        }
    })
}