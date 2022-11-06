import { IncomingMessage } from "node:http";

type voc = {
  voc:string
}

export function GetVocabulary(req?:IncomingMessage) {
  return new Promise((resolve, reject) => {
    const vocabularyList:any={
      'A':'20211228/863412',
      'B':'20211228/863413',
      'C':'20211229/863414',
      'D':'20211229/863415',
      'E':'20211230/863416',
      'F':'20211230/863417',
      'G':'20211231/863418',
      'H':'20211231/863419',
      'I':'20220101/863420',
      'J':'20220101/863421',
      'K':'20220101/863422',
      'L':'20220102/863423',
      'M':'20220102/863424',
      'N':'20220103/863425',
      'O':'20220103/863426',
      'P':'20220104/863427',
      'Q':'20220104/863428',
      'R':'20220105/863429',
      'S':'20220105/863430',
      'T':'20220106/863431',
      'U':'20220106/863432',
      'V':'20220107/863433',
      'W':'20220107/863434',
      'X':'20220108/863435',
      'Y':'20220108/863435',
      'Z':'20220108/863435',
    }
    let str:string=''
    req?.on('data',(chunk)=>{
      str+=chunk
    })
    req?.on('end',()=>{
      let body:voc = JSON.parse(str)
      fetch(`https://cet4.koolearn.com/${vocabularyList[body.voc]}.html`)
      .then((res) => res.text())
      .then((res) => {
        resolve(res)
      })
    })
  })
}
