import React, { createElement, forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import highlighterStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015'
import './index.scss'
import Pre from './components/Pre'
import CodeWrapper from './components/CodeWrapper'
SyntaxHighlighter.registerLanguage('javascript', js)
type Props = {
  content: string
  complete?: (anchorTreeArray: Anchor[]) => void
}

export type Anchor = {
  level: number
  content: React.ReactNode & React.ReactNode[]
  children: Anchor[]
  id: string
  parent?: Anchor
}
const getAnchorObj = (level: number, id: string, content: React.ReactNode & React.ReactNode[]): Anchor => {
  return {
    level,
    content,
    id,
    children: []
  }
}

export type MarkdownRef = {anchorTreeArray: Anchor[], markdownContainer: HTMLDivElement | null} | undefined
function Markdown({ content, complete }: Props, ref?: React.Ref<MarkdownRef>) {
  const anchorTreeArray: Anchor[] = []
  const getPreAnchor = (arr: Anchor[]): Anchor => {
    const last = arr[arr.length - 1]
    if (last.children.length > 0) return getPreAnchor(last.children)
    return last
  }
  useImperativeHandle(ref, () => ({
    anchorTreeArray,
    markdownContainer: markdownRef.current
  }))
  const getIndex = (arr: Anchor[]): number => {
    return arr.reduce((length, child) => {
      length++
      return length + getIndex(child.children)
    }, 0)
  }
  const enqueueAnchorTreeArray = (level: number, content: React.ReactNode & React.ReactNode[]) => {
    const id = `title_anchor_${getIndex(anchorTreeArray) + 1}`
    const anchor = getAnchorObj(level, id, content)
    if (anchorTreeArray.length === 0) {
      anchorTreeArray.push(anchor)
      return id
    }
    let preAnchor = getPreAnchor(anchorTreeArray)
    if (preAnchor.level < anchor.level) {
      preAnchor.children.push(anchor)
      anchor.parent = preAnchor
      return id
    }
    if (preAnchor.level === anchor.level) {
      if (preAnchor.parent) {
        preAnchor.parent.children.push(anchor)
        anchor.parent = preAnchor.parent
      } else {
        anchorTreeArray.push(anchor)
      }
      return id
    }
    while (preAnchor.parent && preAnchor.parent.level >= anchor.level) {
      preAnchor = preAnchor.parent
    }
    if (!preAnchor.parent) {
      anchorTreeArray.push(anchor)
    } else {
      preAnchor.parent.children.push(anchor)
      anchor.parent = preAnchor.parent
    }
    return id
  }
  useEffect(() => {
    if (content === '') return
    complete?.(anchorTreeArray)
  }, [content])
  const markdownRef = useRef<HTMLDivElement>(null)
  return (
    <div className="Markdown"
    ref={markdownRef}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}
        components={{
          pre: Pre,
          a({ node, className, children, ...props }) {
            return <a {...props} target="_blank">{children}</a>
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className ?? '')
            return !inline && match
              ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag={CodeWrapper}
                  {...props}
                  style={highlighterStyle}
                >
                  {String(children)}
                </SyntaxHighlighter>
                )
              : (
                <code className={className} {...props}>
                  {children}
                </code>
                )
          },
          h1({ node, className, children, level, ...props }) {
            const id = enqueueAnchorTreeArray(level, children)
            return <h1 {...props} id={id}>{children}</h1>
          },
          h2({ node, className, children, level, ...props }) {
            const id = enqueueAnchorTreeArray(level, children)
            return <h2 {...props} id={id}>{children}</h2>
          },
          h3({ node, className, children, level, ...props }) {
            const id = enqueueAnchorTreeArray(level, children)
            return <h3 {...props} id={id}>{children}</h3>
          },
          h4({ node, className, children, level, ...props }) {
            const id = enqueueAnchorTreeArray(level, children)
            return <h4 {...props} id={id}>{children}</h4>
          },
          h5({ node, className, children, level, ...props }) {
            const id = enqueueAnchorTreeArray(level, children)
            return <h5 {...props} id={id}>{children}</h5>
          },
          h6({ node, className, children, level, ...props }) {
            const id = enqueueAnchorTreeArray(level, children)
            return <h6 {...props} id={id}>{children}</h6>
          }
        }}
      >{content}
      </ReactMarkdown>
    </div>
  )
}
export default forwardRef(Markdown)
