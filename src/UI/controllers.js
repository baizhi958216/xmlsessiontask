/*
Pages: 页面大小
Page: 当前页数
*/
let DOMReRender, TBodyTitle, Pages, Page, t_Page
new Promise(() => {
  GetXMLs('http://localhost:3000/studentxml', 'GET').then((res) => {
    // 解析器
    const xmlParser = new DOMParser()
    const xmldoc = xmlParser.parseFromString(res, 'text/xml')
    // 标题添加升序/降序按钮
    DOMReRender = xmldoc.children[0].children
    TBodyTitle = DOMReRender[0]
    TBodyTitle.children.age.innerHTML += '<button onclick="asc()">升序</button><button onclick="des()">降序</button>'
    // 初始页面完整渲染XML
    for (let index = 0; index < DOMReRender.length; index++) {
      document.querySelector('#books').innerHTML += DOMReRender[index].outerHTML
    }
    // 页面大小初始化
    Pages = DOMReRender.length - 1
  })
})

pageOption = (e) => {
  console.log(Page)
}
pageController = (e) => {
  if (Page != undefined)
    switch (e) {
      // 最前页
      case 0:
        Page = 1
        document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
        for (let i = 1; i <= Pages; i++) {
          document.querySelector('#books').innerHTML += DOMReRender[i].innerHTML
        }
        break
      // 最后页
      case 1:
        Page = DOMReRender.length - 1// 总页数
        document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
        Array.from(DOMReRender).map((element, index) => {
          if (index > 0 && index > 6) {
            document.querySelector('#books').innerHTML += element.innerHTML
          }
        })
        break
      // 前一页
      case 2:
        if (Page > 1) {
          Page--
          document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
          document.querySelector('#books').innerHTML += DOMReRender[Page].innerHTML
        }
        break
      // 后一页
      case 3:
        if (Page < DOMReRender.length - 1) {
          Page++
          document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
          document.querySelector('#books').innerHTML += DOMReRender[Page].innerHTML
        }
        break
      default:
        break
    }
}
// 升序
asc = () => { }
// 降序
des = () => { }
// 自定义浏览页面
customPage = () => {
  const input = document.querySelector('input').value.replace(/\D/g, '')
  if (input > 0 && input < DOMReRender.length) {
    document.querySelector('#books').innerHTML = TBodyTitle.outerHTML

    for (let i = 1; i <= input; i++) {
      document.querySelector('#books').innerHTML += DOMReRender[i].innerHTML
    }
    Pages = input
    Page = 1
  } else {
    alert('页面大小错误, 请填写正确的页面大小')
  }
}