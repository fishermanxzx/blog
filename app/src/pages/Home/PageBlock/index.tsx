import React from 'react'
import './index.scss'
type Props = {
  children?: JSX.Element
  title?: string
}

export default function PageBlock({
  children,
  title
}: Props) {
  return (
    <div className='PageBlock'>
        {title}
       <div className='block_img'></div>
       <div className='introduction'>
        {children ?? <>
          </>}
       </div>
    </div>
  )
}
