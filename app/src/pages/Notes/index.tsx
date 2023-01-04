import React from 'react'
import './index.scss'
import Background from '@/components/Background'
import Markdown from '@/components/Markdown'
// type Props = {}
const markdown = `Just a link: https://reactjs.com.
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

姓名|技能|排行
--|:--:|--:
刘备|哭|大哥
关羽|打|二哥
张飞|骂|三弟
~~~jsx
console.log('It works!')
function a(){
  return <Background></Background>
}
~~~
`
export default function Notes() {
  return (
    <>
    <Background></Background>
    <div className='Note'>
      <div className='card'>
        <Markdown content={markdown}></Markdown>
      </div>

    </div>

    </>
  )
}
