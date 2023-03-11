import React, { useEffect, useState, useRef, useCallback } from 'react'
import './index.scss'
import Background from '@/components/Background'
import { useSearchParams, useLocation } from 'react-router-dom'
import MarkdownFlex from '../components/MarkdownFlex'
import Menus from '../components/MarkdownMenus'
export default function Notes() {
  const location = useLocation()
  return (
    <>
      <Background></Background>
      <div className='Algorithm'>
        {<Menus dir={location.pathname}/>}
      </div>
    </>
  )
}
