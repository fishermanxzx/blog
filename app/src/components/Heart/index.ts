// 鼠标点击出现爱心特效
type Heart = {
  el: HTMLDivElement
  x: number
  y: number
  scale: number
  alpha: number
  color: string
}
const hearts: Heart[] = []
const css = (css: string) => {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  document.getElementsByTagName('head')[0].appendChild(style)
}
const gameloop = () => {
  for (let i = 0; i < hearts.length; i++) {
    if (hearts[i].alpha <= 0) {
      document.body.removeChild(hearts[i].el)
      hearts.splice(i, 1)
      continue
    }
    hearts[i].y--
    hearts[i].scale += 0.005
    hearts[i].alpha -= 0.01
    hearts[i].el.style.cssText = `left:${hearts[i].x}px;top:${hearts[i].y}px;opacity:${hearts[i].alpha};transform:scale(${hearts[i].scale},${hearts[i].scale}) rotate(45deg);background:${hearts[i].color}`
  }
  window.requestAnimationFrame(gameloop)
}
const randomColor = () => {
  const [r, g, b] = new Array(3).fill(255).map(i => Math.floor(Math.random() * i))
  return `rgb(${r},${g},${b})`
}
const createHeart = (event: MouseEvent) => {
  const div = document.createElement('div')
  div.className = 'heart'
  hearts.push({
    el: div,
    x: event.clientX - 5,
    y: event.clientY - 5,
    scale: 1,
    alpha: 1,
    color: randomColor()
  })
  document.body.appendChild(div)
}
const attachClickEvent = () => {
  window.addEventListener('click', (e) => {
    createHeart(e)
  })
}
const initHeart = () => {
  css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}")
  attachClickEvent()
  gameloop()
}
export default initHeart
