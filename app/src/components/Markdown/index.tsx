import React, { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import Icon from '@/Icon'
import remarkGfm from 'remark-gfm'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import highlighterStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015'
import { message } from 'antd'
import './index.scss'
SyntaxHighlighter.registerLanguage('javascript', js)
type Props = {
  content: string
}
type ChildrenProps = {
  children: React.ReactNode & React.ReactNode[]
}
const CodeCopyBtn: React.FC<{text: string} > = ({ text }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      messageApi.success('复制成功')
    } catch {
      messageApi.error('复制失败')
    }
  }
  return (
    <>
    {contextHolder}
    <i className="code_copy_btn" onClick={handleClick}>
      <Icon icon='copy'></Icon>
    </i>
    </>
  )
}
const Pre: React.FC<ChildrenProps> = ({ children }) => {
  const codeText = ((children[0] as React.ReactElement<ChildrenProps>).props.children[0]) as string
  return <pre className="markdown_pre">
    <CodeCopyBtn text={codeText} />
    {children}
  </pre>
}
const CodeWrapper: React.FC<ChildrenProps> = ({ children }) => {
  return <div className='code_wrapper'>{children}</div>
}
export default function Markdown({ content }: Props) {
  return (
    <div className="Markdown"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}
          components={{
            pre: Pre,
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
            }
          }}
      >{content}
      </ReactMarkdown>
    </div>
  )
}
