/*
Pages: 页面大小/每页显示行数
Page: 当前页数
*/
let DOMReRender, TBodyTitle, Pages, Page, t_Page
new Promise(() => {
  GetXMLs('http://localhost:3000/studentxml', 'GET').then((res) => {
    // 解析器
    const xmlParser = new DOMParser()
    const xmldoc = xmlParser.parseFromString(res, 'text/xml')
    // 标题添加升序/降序按钮
    DOMReRender = Array.from(xmldoc.children[0].children)
    TBodyTitle = DOMReRender[0]
    TBodyTitle.children.age.innerHTML += '<button onclick="trsort(1)">升序</button><button onclick="trsort(0)">降序</button>'
    DOMReRender.map((ele, index) => {
      ele.id = index
    })
    // 初始页面完整渲染XML
    for (let index = 0; index < DOMReRender.length; index++) {
      document.querySelector('#books').innerHTML += DOMReRender[index].outerHTML
    }
    // 页面大小初始化
    Pages = DOMReRender.length - 1
  })
})

pageController = (e) => {
  if (Page != undefined)
    switch (e) {
      // 最前页
      case 0:
        Page = 1
        document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
        for (let i = 1; i <= Pages; i++) {
          document.querySelector('#books').innerHTML += DOMReRender[i].outerHTML
        }
        break
      // 最后页
      case 1:
        for (let index = 0; index < DOMReRender.length; index++) {
          pageController(3)
        }
        break
      // 前一页
      case 2:
        if (Page > 1) {
          // trs 当前页最小id
          let trs = DOMReRender.length
          document.querySelectorAll('tr').forEach(ele=>{
            if(ele.id<trs&&ele.id>0){
                trs = parseInt(ele.id)
            }
          })
          Page--
          document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
          for (let index = trs; index < trs + Pages; index++) {
            document.querySelector('#books').innerHTML += DOMReRender[index-Pages].outerHTML
          }
        }
        break
      // 后一页
      case 3:
        // trs 当前页最大id
        if (Page < Math.ceil((DOMReRender.length - 1) / Pages)) {
            let trs=0
            document.querySelectorAll('tr').forEach(ele=>{
                if(ele.id>=trs){
                    trs = parseInt(ele.id)
                }
            })
          Page++
          document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
          for (let index = trs + 1; index <= trs + Pages; index++) {
            if (DOMReRender[index]) {
              document.querySelector('#books').innerHTML += DOMReRender[index].outerHTML
            } else {
              document.querySelector('#books').innerHTML += `<tr id=${index}></tr>`
            }
          }
        }
        break
      default:
        break
    }
}

trsort = (method) => {
  let tr = document.querySelectorAll('tr')
  let asctr = []
  for (let index = 1; index < tr.length; index++) {
    asctr.push(tr[index])
  }
  asctr.sort((tr1, tr2) => {
    let n1, n2
    if (tr1.cells[2] && tr2.cells[2]) {
      n1 = parseInt(tr1.cells[2].innerHTML)
      n2 = parseInt(tr2.cells[2].innerHTML)
    }
    return n1 - n2
  })
  switch (method) {
    // 降序
    case 0:
      asctr.reverse()
      for (let index = 0; index < asctr.length; index++) {
        document.querySelector('#books').appendChild(asctr[index])
      }
      break
    // 升序
    case 1:
      for (let index = 0; index < asctr.length; index++) {
        document.querySelector('#books').appendChild(asctr[index])
      }
      break
    default:
      break
  }
}

// 自定义浏览页面
customPage = (c_page) => {
  let input
  if (c_page) {
    input = c_page
    document.querySelector('input').value = c_page
  } else if (c_page == 0) {
    input = DOMReRender.length - 1
    document.querySelector('input').value = input
  }
  else {
    input = document.querySelector('input').value.replace(/\D/g, '')
  }
  if (input > 0 && input < DOMReRender.length) {
    document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
    for (let i = 1; i <= input; i++) {
      document.querySelector('#books').innerHTML += DOMReRender[i].outerHTML
    }
    Pages = +input
    Page = 1
  } else if (input = 0) {
    document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
    for (let index = 0; index < DOMReRender.length; index++) {
      document.querySelector('#books').innerHTML += DOMReRender[index].outerHTML
    }
    Pages = DOMReRender.length - 1
    Page = 1
  } else {
    alert('页面大小错误, 请填写正确的页面大小')
  }
}
