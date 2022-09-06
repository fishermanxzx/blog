import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import Icon from '@/Icon'
import Background from './Background'
import Title from './Title'
function Home() {
  const menus = [{
    path: '/base',
    title: '基础'
  }, {
    path: '/algorithm',
    title: '算法'
  }, {
    path: '/notes',
    title: '笔记'
  }, {
    path: '/source_code',
    title: '源码解析'
  }, {
    path: '/interview_questions',
    title: '前端每日一题'
  }]
  return (
        <main className="home">
            <Background></Background>
            <Title></Title>
            <div className='menus'>
                {menus.map(menu => <Link to={menu.path} className='menu' key={menu.path}>{menu.title}</Link>)}
            </div>
            <div className='recommend'>
              <div className='title'>
                <Icon icon='dianzan' className='icon'></Icon><span>好文推荐</span>
              </div>
            </div>
        </main>
  )
}

export default Home
