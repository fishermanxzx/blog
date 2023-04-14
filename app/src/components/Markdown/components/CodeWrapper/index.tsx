import React from 'react'
import { ChildrenProps } from '../types'
import './index.scss'
const CodeWrapper: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="code_wrapper">{children}</div>
}
export default CodeWrapper
