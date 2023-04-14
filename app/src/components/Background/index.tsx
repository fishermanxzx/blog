import React, { useEffect, useRef } from 'react'
import './index.scss'
type Props = {}
const gerRandomChar = () => {
  const str = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+123456789'
  return str[Math.floor(Math.random() * str.length)]
}
const getRandomColor = () => {
  const colors = [
    '#33B5E5',
    '#0099CC',
    '#AA66CC',
    '#9933CC',
    '#99CC00',
    '#669900',
    '#FFBB33',
    '#FF8800',
    '#FF4444',
    '#CC0000'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
const initCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')!
}
const getParamsObj = () => {
  let width = 0
  let height = 0
  let columnCount = 0
  return {
    get width() {
      if (this.isDirty) {
        width = document.documentElement.scrollWidth
      }
      return width
    },
    get height() {
      if (this.isDirty) {
        height = document.documentElement.scrollHeight
      }
      return height
    },
    get columnCount() {
      if (this.isDirty) {
        columnCount = Math.floor(window.innerWidth / this.columnWidth)
      }
      return columnCount
    },
    columnWidth: 20,
    isDirty: true
  }
}
export default function Background({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    const paramsObj = getParamsObj()
    const ctx = initCanvas(canvas, paramsObj.width, paramsObj.height)
    const columnNextIndexes = new Array(paramsObj.width).fill(1)
    let time = 1
    const draw = () => {
      // 防止第一次绘制闪烁
      ctx.fillStyle = time === 1 ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.1)'
      time++
      ctx.fillRect(0, 0, paramsObj.width, paramsObj.height)
      const fz = 20
      ctx.fillStyle = getRandomColor()
      ctx.font = `${fz}px`
      for (let i = 0; i < paramsObj.columnCount; i++) {
        const x = i * paramsObj.columnWidth
        const y = fz * columnNextIndexes[i]
        ctx.fillText(gerRandomChar(), x, y)
        columnNextIndexes[i]++
        if (y > paramsObj.height && Math.random() > 0.99) {
          columnNextIndexes[i] = 0
        }
      }
    }
    let timer: null | number = null
    const startDraw = () => {
      draw()
      paramsObj.isDirty = false
      timer = window.requestAnimationFrame(startDraw)
    }
    const handleResize = () => {
      time = 1
      paramsObj.isDirty = true
      canvas.width = paramsObj.width
      canvas.height = paramsObj.height
    }
    window.addEventListener('resize', handleResize)
    startDraw()
    return () => {
      if (timer != null) {
        cancelAnimationFrame(timer)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return <canvas ref={canvasRef}></canvas>
}
