import { transformMenus } from '@/utils'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
type Props = {
  dir: string
}

function MarkdownMenus({ dir }: Props) {
  const menus = transformMenus(dir)
  return (
    <>
      <div className="MarkdownMenus">
        {menus.map((menu, index) => (
          <Link
            to={`/markdownPage?md=${menu.fileName}`}
            className="menu_item"
            key={index}
          >
            {menu.fileName}
          </Link>
        ))}
      </div>
    </>
  )
}
export default MarkdownMenus
