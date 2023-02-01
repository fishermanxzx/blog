import React, { useEffect, useState, forwardRef } from 'react'
import Markdown, { Anchor } from '@/components/Markdown'
import type { MarkdownRef } from '@/components/Markdown'
import { getMarkdownFile } from '@/api'
type Props = {
  markdwonFileName?: string | null
  path?: string
  complete?: (anchorTreeArray: Anchor[]) => void
}

function MarkdownFile({ markdwonFileName = '404.md', path = '', complete }: Props, ref?: React.Ref<MarkdownRef>) {
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
    <Markdown content={markdownContent} ref={ref} complete={complete}></Markdown>
  )
}
export default React.memo(forwardRef(MarkdownFile))
