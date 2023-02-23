import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
type Props = {
  dir: string
}
const requireMarkdownContext = require.context('/public/markdown', true, /\.md$/)
const mardownPaths = requireMarkdownContext.keys()
const transformMenuItem = (path: string) => {
  const [filePath, fileName] = path.split('/').slice(1)
  return {
    filePath,
    fileName: fileName.replace('.md', '')
  }
}
const transformMenus = (dir: string) => {
  const menus = mardownPaths.filter(path => {
    const pathArr = path.split('/')
    return pathArr.length === 3 && pathArr.includes(dir)
  }).map(transformMenuItem)
  return menus
}

function MarkdownMenus({ dir }: Props) {
  const menus = transformMenus(dir)
  return <>
    <div className='MarkdownMenus'>
      {menus.map((menu, index) => <Link to={`/${menu.filePath}?md=${menu.fileName}`} className='menu_item' key={index} target='_blank'>{menu.fileName}</Link>)}
    </div></>
}
export default MarkdownMenus
