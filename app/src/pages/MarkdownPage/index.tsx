import React, { useEffect, useState, useRef, useCallback } from 'react'
import './index.scss'
import Background from '@/components/Background'
import { useSearchParams, useLocation } from 'react-router-dom'
import MarkdownFlex from '../components/MarkdownFlex'
import { mardownPaths } from '@/utils'
export default function Notes() {
  const [searchParams] = useSearchParams()
  const markdownFileName = searchParams.get('md') ?? '404'
  const markdwonFilePath =
    mardownPaths
      .find(item => item.includes(markdownFileName + '.md'))
      ?.slice(1) ?? '/404.md'
  return (
    <>
      <Background></Background>
      <div className="MarkdownPage">
        {<MarkdownFlex markdwonFilePath={markdwonFilePath} />}
      </div>
    </>
  )
}
