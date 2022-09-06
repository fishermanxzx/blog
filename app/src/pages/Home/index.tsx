import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import Icon from '@/Icon'
import Background from './Background'
import Title from './Title'
import PageBlock from './PageBlock'
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
  const pages = [{
    title: '1',
    children: <><div>1</div></>
  }, {
    title: '2',
    children: <><div>2</div><div>2</div></>
  }, {
    title: '3',
    children: <><div>3</div><div>3</div><div>4</div></>
  }, {
    title: '4',
    children: <><div>4</div><div>4</div><div>4</div><div>4</div></>
  }, {
    title: '5',
    children: <><div>5</div><div>4</div><div>4</div></>
  }, {
    title: '6',
    children: <><div>6</div><div>4</div></>
  }, {
    title: '7',
    children: <><div>7</div><div>4</div><div>4</div></>
  }, {
    title: '8',
    children: <><div>8</div><div>4</div><div>4</div></>
  }, {
    title: '9',
    children: <><div>9</div><div>4</div><div>4</div></>
  }, {
    title: '10',
    children: <><div>10</div><div>4</div><div>4</div></>
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
              <div className='content'>
                {pages.map((page, index) => <PageBlock {...page} key={index}/>)}
              </div>
            </div>
        </main>
  )
}

export default Home
