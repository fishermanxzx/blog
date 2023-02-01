import React, { useEffect, useState, useRef, useCallback } from 'react'
import './index.scss'
import Background from '@/components/Background'
import MarkdownFile from '@/pages/components/MarkdownFile'
import { useSearchParams } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Anchor, MarkdownRef } from '@/components/Markdown'
import AnchorsMenu from '@/components/AnchorsMenu'
import MarkdownFlex from '../components/MarkdownFlex'

export default function Notes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const markdwonFileName = searchParams.get('md')
  const a = () => {
    setSearchParams('md=text')
  }

  return (
    <>
    <div onClick={a}>1</div>
      <Background></Background>
      <div className='Project'>
       <MarkdownFlex markdwonFileName={markdwonFileName} path='/project'></MarkdownFlex>
      </div>
    </>
  )
}
