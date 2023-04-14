import Icon from '@/Icon'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export default function BackToHome() {
  const navigate = useNavigate()
  const toTop = useCallback(() => {
    navigate('/')
  }, [])
  return (
    <div className="BackToHome" onClick={toTop}>
      <Icon icon="home" className="icon"></Icon>
    </div>
  )
}
