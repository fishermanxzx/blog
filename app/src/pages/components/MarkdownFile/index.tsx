import React, { useEffect, useState } from 'react'
import Markdown from '@/components/Markdown'
import { getMarkdownFile } from '@/api'
type Props = {
  markdwonFileName?: string | null
  path?: string
}

export default function MarkdownFile({ markdwonFileName = '404.md', path = '' }: Props) {
  const [markdownContent, setMarkdownContent] = useState('')
  useEffect(() => {
    getMarkdownFile<string>(`${path === '' ? path : path + '/'}${markdwonFileName ?? 404}.md`).then((data) => {
      if (!data.data) {
        getMarkdownFile<string>('404.md').then(data => setMarkdownContent(data.data))
        return
      }
      setMarkdownContent(data.data)
    })
  }, [markdwonFileName])
  return (
    <Markdown content={markdownContent}></Markdown>
  )
}
