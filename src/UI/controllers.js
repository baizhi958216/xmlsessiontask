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
        Page = Math.ceil((DOMReRender.length - 1) / Pages)
        // console.log('每页显示', Pages, ', 分', Math.ceil(Page / Pages), '页', ', 最后一页', Page - ((Math.ceil(Page / Pages) - 1) * Pages))
        t_Page = (DOMReRender.length - 1) - ((DOMReRender.length - 1) - ((Math.ceil((DOMReRender.length - 1) / Pages) - 1) * Pages))
        document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
        for (let i = DOMReRender.length - 1; i > t_Page; i--) {
          document.querySelector('#books').innerHTML += DOMReRender[i].innerHTML
        }
        break
      // 前一页
      case 2:
        if (Page > 1) {
          // 分成几页: Math.ceil((DOMReRender.length - 1) / Pages)
          Page--
          console.log('当前页: ', Page)
          document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
          // document.querySelector('#books').innerHTML += DOMReRender[Page].innerHTML
          // console.log(Page);
        }
        break
      // 后一页
      case 3:
        if (Page < Math.ceil((DOMReRender.length - 1) / Pages)) {
          Page++
          console.log('当前页: ', Page)
          document.querySelector('#books').innerHTML = TBodyTitle.outerHTML
          // document.querySelector('#books').innerHTML += DOMReRender[Page].innerHTML
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
      document.querySelector('#books').innerHTML += DOMReRender[i].innerHTML
    }
    Pages = input
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