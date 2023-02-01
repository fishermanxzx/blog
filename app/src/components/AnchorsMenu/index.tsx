import type { Anchor } from '../Markdown'
import React from 'react'
type Props = {
  anchors: Anchor[]
}
function transformAnchor(arr: Anchor[]) {
  if (arr.length === 0) return null
  return <ol style={{ paddingLeft: '8px', listStyleType: 'none', lineHeight: '32px', whiteSpace: 'nowrap' }}>
      {arr.map(anchor => <li key={anchor.id}><a href={'#' + anchor.id}>{anchor.content}</a>
        {transformAnchor(anchor.children)}
      </li>)}
    </ol>
}
export default function AnchorsMenu({ anchors }: Props) {
  return (
   <div>
     { transformAnchor(anchors) }
   </div>
  )
}
