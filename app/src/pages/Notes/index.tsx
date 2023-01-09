import React, { useEffect, useState } from 'react'
import './index.scss'
import Background from '@/components/Background'
import Markdown from '@/components/Markdown'
import { getMarkdownFile } from '@/api'
// type Props = {}

export default function Notes() {
  const [markdownContent, setMarkdownContent] = useState('')
  useEffect(() => {
    getMarkdownFile<string>('c.md').then((data) => {
      setMarkdownContent(data.data)
    })
  }, [])

  return (
    <>
    <Background></Background>
    <div className='Note'>
      <div className='card left'>
        1
      </div>
      <div className='card right'>
        <Markdown content={markdownContent}></Markdown>
      </div>

    </div>

    </>
  )
}
