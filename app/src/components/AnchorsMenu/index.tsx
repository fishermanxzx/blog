import type { Anchor } from '../Markdown'
import React from 'react'
import './index.scss'
type Props = {
  anchors: Anchor[]
}
function transformAnchor(arr: Anchor[]) {
  if (arr.length === 0) return null
  return <ol className='Anchors'>
      {arr.map(anchor => <li key={anchor.id}><a href={'#' + anchor.id}>{anchor.content}</a>
        {transformAnchor(anchor.children)}
      </li>)}
    </ol>
}
export default function AnchorsMenu({ anchors }: Props) {
  return (
   <div>
     { anchors.length > 0 ? transformAnchor(anchors) : null }
   </div>
  )
}
