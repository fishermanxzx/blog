import { random } from '@/utils'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
type Props = {}
export default function index({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas != null) {
      const ctx = canvas.getContext('2d')!
      let width = document.documentElement.scrollWidth
      let height = document.documentElement.scrollHeight
      canvas.width = width
      canvas.height = height
      const stars: Star[] = []
      let count = 0
      const maxStars = 5000
      const starCanvas = document.createElement('canvas')
      const starCanvasCtx = starCanvas.getContext('2d')!
      starCanvas.width = 100
      starCanvas.height = 100
      const half = starCanvas.width / 2
      const startGradient = starCanvasCtx.createRadialGradient(half, half, 0, half, half, half)
      startGradient.addColorStop(0.025, '#fff')
      startGradient.addColorStop(0.15, 'rgb(33,72,135)')
      startGradient.addColorStop(0.3, 'rgb(6,13,25)')
      startGradient.addColorStop(1, 'transparent')
      starCanvasCtx.fillStyle = startGradient
      starCanvasCtx.beginPath()
      starCanvasCtx.arc(half, half, half, 0, Math.PI * 2)
      starCanvasCtx.fill()

      // End cache

      const maxOrbit = (x: number, y: number) => {
        const max = Math.max(x, y)
        const diameter = Math.round(Math.sqrt(max * max + max * max))
        return diameter / 2
      }
      class Star {
        orbitRadius
        radius
        orbitX
        orbitY
        timePassed
        speed
        alpha
        constructor() {
          this.orbitRadius = random(maxOrbit(width, height))
          this.radius = random(60, this.orbitRadius) / 12
          this.orbitX = width / 2
          this.orbitY = height / 2
          this.timePassed = random(0, maxStars)
          this.speed = random(this.orbitRadius) / 30000
          this.alpha = random(2, 10) / 10
          count++
          stars[count] = this
        }

        draw() {
          const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
          const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
          const twinkle = random(10)

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05
          }

          ctx.globalAlpha = this.alpha
          ctx.drawImage(starCanvas, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
          this.timePassed += this.speed
        }
      }

      for (let i = 0; i < maxStars; i++) {
        new Star()
      }
      let timer: null | number = null
      const animation = () => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 0.8
        ctx.fillStyle = '#060e1b'
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 1, l = stars.length; i < l; i++) {
          stars[i].draw()
        };
        timer = window.requestAnimationFrame(animation)
      }
      animation()
      const resize = () => {
        width = document.documentElement.scrollWidth
        height = document.documentElement.scrollHeight
        canvas.width = width
        canvas.height = height
      }
      window.addEventListener('resize', resize)
      return () => {
        if (timer != null) {
          cancelAnimationFrame(timer)
        }
        window.removeEventListener('resize', resize)
      }
    }
  }, [])
  const backToHome = () => {
    navigate('/')
  }
  return (
<div className='NotFound'>
        <div className="wrapper">
            <div className="four first">4</div>
            <div className="four second">4</div>
            <div className="center">
                <div className="astronaut">
                    <div className="backpack"></div>
                    <div className="astronaut-antena antena--left">
                        <div className="ear-down"></div>
                        <div className="ear-up"></div>
                        <div className="antena"></div>
                        <div className="antena-tip"></div>
                    </div>
                    <div className="astronaut-antena antena--right">
                        <div className="ear-down"></div>
                        <div className="ear-up"></div>
                        <div className="antena"></div>
                        <div className="antena-tip"></div>
                    </div>
                    <div className="astronaut-helmet">
                        <div className="astronaut-glass"></div>
                        <div className="glow glow--1"></div>
                        <div className="glow glow--2"></div>
                    </div>
                    <div className="astronaut-body"></div>
                </div>
                <div className="planet">
                    <div className="craters">
                        <div className="crater crater--1"></div>
                        <div className="crater crater--2"></div>
                        <div className="crater crater--3"></div>
                        <div className="crater crater--4"></div>
                        <div className="crater crater--5"></div>
                        <div className="crater crater--6"></div>
                    </div>
                </div>
                <div className="astronaut-hands">
                    <div className="astronaut-hand hand--left">
                        <svg width="35" height="75">
                            <path
                                d="M30.23 17.209c-7.925 5.118-11.657 12.786-11.226 22.975-7.113.934-12.948 4.345-18.44 5.117C-1.951 26.539 3.92 9.346 18.635 1.369 30.66-4.39 39.53 9.398 30.23 17.209z"
                                fill="#D2D2D2"></path>
                            <g fill="none" stroke="#999" strokeLinecap="round">
                                <path
                                    d="M11.78 6.977c7.983.129 13.547 3.968 16.308 11.111M4.67 17.161c7.307-.379 13.1 1.924 17.93 6.94">
                                </path>
                                <path d="M.816 31.334c6.439-2.441 12.295-1.746 18.149 2.488" strokeLinejoin="round">
                                </path>
                            </g>
                            <g fill="#fff">
                                <path
                                    d="M7.721 37.171c5.875-1.994 12.264 1.156 14.258 7.031l1.218 3.588c1.995 5.875-1.156 12.264-7.03 14.258-5.875 1.995-12.264-1.156-14.259-7.031L.69 51.429c-1.994-5.875 1.156-12.263 7.031-14.258z">
                                </path>
                                <path
                                    d="M7.829 38.159c5.794-1.967 12.094 1.14 14.061 6.934l5.044 14.855c1.967 5.794-1.14 12.095-6.934 14.062-5.794 1.967-12.095-1.14-14.062-6.934L.895 52.221c-1.967-5.794 1.14-12.095 6.934-14.062z">
                                </path>
                                <path
                                    d="M16.863 39.472l12.879 7.384a3.876 3.876 0 0 1 1.433 5.287 3.875 3.875 0 0 1-5.286 1.433l-12.878-7.384a3.874 3.874 0 0 1-1.434-5.286 3.874 3.874 0 0 1 5.286-1.434z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div className="astronaut-hand hand--right">
                        <svg width="35" height="75">
                            <path
                                d="M30.23 17.209c-7.925 5.118-11.657 12.786-11.226 22.975-7.113.934-12.948 4.345-18.44 5.117C-1.951 26.539 3.92 9.346 18.635 1.369 30.66-4.39 39.53 9.398 30.23 17.209z"
                                fill="#D2D2D2"></path>
                            <g fill="none" stroke="#999" strokeLinecap="round">
                                <path
                                    d="M11.78 6.977c7.983.129 13.547 3.968 16.308 11.111M4.67 17.161c7.307-.379 13.1 1.924 17.93 6.94">
                                </path>
                                <path d="M.816 31.334c6.439-2.441 12.295-1.746 18.149 2.488" strokeLinejoin="round">
                                </path>
                            </g>
                            <g fill="#fff">
                                <path
                                    d="M7.721 37.171c5.875-1.994 12.264 1.156 14.258 7.031l1.218 3.588c1.995 5.875-1.156 12.264-7.03 14.258-5.875 1.995-12.264-1.156-14.259-7.031L.69 51.429c-1.994-5.875 1.156-12.263 7.031-14.258z">
                                </path>
                                <path
                                    d="M7.829 38.159c5.794-1.967 12.094 1.14 14.061 6.934l5.044 14.855c1.967 5.794-1.14 12.095-6.934 14.062-5.794 1.967-12.095-1.14-14.062-6.934L.895 52.221c-1.967-5.794 1.14-12.095 6.934-14.062z">
                                </path>
                                <path
                                    d="M16.863 39.472l12.879 7.384a3.876 3.876 0 0 1 1.433 5.287 3.875 3.875 0 0 1-5.286 1.433l-12.878-7.384a3.874 3.874 0 0 1-1.434-5.286 3.874 3.874 0 0 1 5.286-1.434z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="back" onClick={backToHome}>TAKE ME BACK</div>
            <div className="sorry">You're lost.&ensp; Page not found.</div>
        </div>
    <canvas ref={canvasRef}></canvas>
</div>
  )
}
