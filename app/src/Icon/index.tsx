import React from 'react'
import './font/iconfont.css'
type Props = {
  icon: 'dianzan' | 'wenzhang' | 'shoucang'
  className?: string
}
export default function index({
  icon,
  className
}: Props) {
  let IconClassName = `iconfont icon-${icon}`
  if (className) {
    IconClassName += ` ${className}`
  }
  return (
        <i className={IconClassName}></i>
  )
}
