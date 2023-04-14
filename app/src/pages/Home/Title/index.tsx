import React, { useEffect, useRef } from 'react'
import './index.scss'
type Props = {}

export default function Title({}: Props) {
  const titleRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const content = '欢迎来到谢梓炫的个人博客'
  useEffect(() => {
    const title = titleRef.current
    const cursor = cursorRef.current
    let i = 0
    if (title != null && cursor !== null) {
      cursor.classList.add('typing')
      const typing = () => {
        title.innerHTML += content.charAt(i)
        i++
        if (i > content.length) {
          setTimeout(() => {
            cursor.classList.remove('typing')
            cursor.style.visibility = 'hidden'
          }, 1500)
          return
        }
        setTimeout(typing, 150)
      }
      typing()
    }
  }, [])
  return (
    <div className="title">
      <div className="img_logo"></div>
      <div className="text_wrapper">
        <span className="tetyped_cursor">|</span>
        <span className="text" ref={titleRef}></span>
        <span className="tetyped_cursor" ref={cursorRef}>
          |
        </span>
      </div>
    </div>
  )
}
