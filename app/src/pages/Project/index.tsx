import React, { useEffect, useState, useRef, useCallback } from 'react'
import './index.scss'
import Background from '@/components/Background'
import { useSearchParams } from 'react-router-dom'
import MarkdownFlex from '../components/MarkdownFlex'
import Menus from '../components/MarkdownMenus'
export default function Notes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const markdwonFileName = searchParams.get('md')

  const a = () => {
    setSearchParams('md=text')
  }

  return (
    <>
      <Background></Background>
      <div className='Project'>
        {markdwonFileName ? <MarkdownFlex markdwonFileName={markdwonFileName} dir='project'></MarkdownFlex> : <Menus dir='project'/>}
      </div>
    </>
  )
}
