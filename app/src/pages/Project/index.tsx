import React, { useEffect, useState } from 'react'
import './index.scss'
import Background from '@/components/Background'
import MarkdownFile from '@/pages/components/MarkdownFile'
import { useSearchParams } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
// type Props = {}
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  const item = {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
  return item
}

const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', null, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4')
  ]),

  getItem('Navigation Two', 'sub2', null, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')])
  ]),

  getItem('Navigation Three', 'sub4', null, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ])
]
export default function Notes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const markdwonFileName = searchParams.get('md')
  const a = () => {
    setSearchParams('md=a')
  }
  const [current, setCurrent] = useState('1')
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <>
      <Background></Background>
      <div className='Project'>
        <div className='card left'>
        <Menu
        theme='dark'
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
        </div>
        <div className='card right'>
          <MarkdownFile markdwonFileName={markdwonFileName} path="/project"></MarkdownFile>
        </div>
      </div>
    </>
  )
}
