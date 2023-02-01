import React from 'react'
import './font/iconfont.css'
type Props = {
  icon: 'dianzan' | 'wenzhang' | 'shoucang' | 'gengduo' | 'copy' | 'qq' | 'email' | 'wechat' | 'github' | 'arrow-up' | 'home'
  className?: string
}
export default function Icon({
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
