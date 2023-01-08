import React, { useEffect, useState } from 'react'
import './index.scss'
import Background from '@/components/Background'
import MarkdownFile from '@/pages/components/MarkdownFile'
import { useSearchParams } from 'react-router-dom'
// type Props = {}
export default function Notes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const markdwonFileName = searchParams.get('md')
  const a = () => {
    setSearchParams('md=a')
  }
  return (
    <>
      <Background></Background>
      <div className='Project'>
        <div className='card'>
          <MarkdownFile markdwonFileName={markdwonFileName} path="/project"></MarkdownFile>
        </div>
      </div>
    </>
  )
}
