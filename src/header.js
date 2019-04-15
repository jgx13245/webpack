function Header() {
  var dom = document.getElementById('app')
  var header = document.createElement('div')
  header.innerText = '头部'
  dom.appendChild(header)
} 

export default Header