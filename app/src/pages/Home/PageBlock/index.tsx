import Icon from '@/Icon'
import { random } from '@/utils'
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
  const imgSrc = `/imgs/${random(0, 127)}.jpg`
  return (
    <div className='PageBlock'>
       <div className='block_img'>
            <img src={imgSrc} loading="lazy"/>
            <h1 className='page_name'>{title}</h1>
       </div>
       <div className='introduction'>
        {children ?? <>
          </>}
       </div>
       <div className="mask">
            <span>More</span>
            <Icon icon='gengduo' className='more'></Icon>
       </div>
    </div>
  )
}
