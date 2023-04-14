import Icon from '@/Icon'
import React, { useCallback } from 'react'
import './index.scss'

export default function BackToTop() {
  const toTop = useCallback(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    document.documentElement.scrollTop = 0
    document.documentElement.style.scrollBehavior = 'auto'
  }, [])
  return (
    <div className="BackToTop" onClick={toTop}>
      <Icon icon="arrow-up" className="icon"></Icon>
    </div>
  )
}
