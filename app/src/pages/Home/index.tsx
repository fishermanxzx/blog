import React, { useEffect, useRef } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const menus = [{
    path: '/base',
    title: '基础'
  }, {
    path: '/algorithm',
    title: '算法'
  }, {
    path: '/notes',
    title: '笔记'
  }, {
    path: '/source_code',
    title: '源码解析'
  }, {
    path: '/interview_questions',
    title: '前端每日一题'
  }]
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas != null) {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      const columnWidth = 20
      const columnCount = Math.floor(window.innerWidth / columnWidth)
      const columnNextIndexes = new Array(columnCount).fill(1)
      const draw = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0, 0, width, height)
        const fz = 20
        ctx.fillStyle = getRandomColor()
        ctx.font = `${fz}px`
        for (let i = 0; i < columnCount; i++) {
          const x = i * columnWidth
          const y = fz * columnNextIndexes[i]
          ctx.fillText(gerRandomChar(), x, y)
          columnNextIndexes[i]++
          if (y > height && Math.random() > 0.99) {
            columnNextIndexes[i] = 0
          }
        }
      }
      const getRandomColor = () => {
        const colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33',
          '#FF8800', '#FF4444', '#CC0000'
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }
      const gerRandomChar = () => {
        const str = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+123456789'
        return str[Math.floor(Math.random() * str.length)]
      }
      let timer: null | number = null
      const startDraw = () => {
        draw()
        timer = window.requestAnimationFrame(startDraw)
      }
      startDraw()
      return () => {
        if (timer != null) {
          cancelAnimationFrame(timer)
        }
      }
    }
  }, [])
  return (
    <main className="home">
        <div className='block'>
            <div className='title'>
                <div className='img_logo'></div>
                <div className='text_wrapper'>
                    <span className='text'>欢迎来到谢梓炫的个人博客</span>
                </div>
            </div>
            <div className='menus'>
                {menus.map(menu => <Link to={menu.path} className='menu' key={menu.path}>{menu.title}</Link>)}
            </div>
        </div>
        <canvas ref={canvasRef}></canvas>
    </main>
  )
}

export default Home
