import React, { useCallback } from 'react'
import Icon from '@/Icon'
import { message } from 'antd'
import { ChildrenProps } from '../types'
import './index.scss'
const CodeCopyBtn: React.FC<{ text: string }> = ({ text }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      messageApi.success('复制成功')
    } catch {
      messageApi.error('复制失败')
    }
  }, [])
  return (
    <>
      {contextHolder}
      <i className="code_copy_btn" onClick={copy}>
        <Icon icon="copy"></Icon>
      </i>
    </>
  )
}
const Pre: React.FC<ChildrenProps> = ({ children }) => {
  const codeText = (children[0] as React.ReactElement<ChildrenProps>).props
    .children[0] as string
  return (
    <pre className="markdown_pre">
      <CodeCopyBtn text={codeText} />
      {children}
    </pre>
  )
}
export default Pre
