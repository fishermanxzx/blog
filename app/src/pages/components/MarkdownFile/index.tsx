import React, { useEffect, useState, forwardRef } from 'react'
import Markdown, { Anchor } from '@/components/Markdown'
import type { MarkdownRef } from '@/components/Markdown'
import { getMarkdownFile } from '@/api'
type Props = {
  markdwonFilePath?: string | null
  complete?: (anchorTreeArray: Anchor[]) => void
}

function MarkdownFile({ markdwonFilePath, complete }: Props, ref?: React.Ref<MarkdownRef>) {
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!markdwonFilePath) return
    setLoading(true)
    getMarkdownFile<string>(`${markdwonFilePath}`).then((data) => {
      if (!data.data) {
        return
      }
      setMarkdownContent(data.data)
      setLoading(false)
    })
  }, [markdwonFilePath])
  return (
    <>
      {loading ? 'Loading' : <Markdown content={markdownContent} ref={ref} complete={complete}></Markdown>}
    </>
  )
}
export default React.memo(forwardRef(MarkdownFile))
