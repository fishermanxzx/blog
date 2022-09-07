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
  }, {
    path: '/project',
    title: '项目实战'
  }]
  const pages = [{
    title: '手写Promise',
    children: <><div>1</div></>
  }, {
    title: 'Promise相关题目',
    children: <><div>2</div><div>2</div></>
  }, {
    title: 'this指向',
    children: <><div>3</div><div>3</div><div>4</div></>
  }, {
    title: '排序算法',
    children: <><div>4</div><div>4</div><div>4</div><div>4</div></>
  }, {
    title: '函数式编程及链式调用',
    children: <><div>5</div><div>4</div><div>4</div></>
  }, {
    title: 'Vue的响应式原理',
    children: <><div>6</div><div>4</div></>
  }, {
    title: 'Vite+Vue3+Element Plus 开发 Chrome extension',
    children: <><div>7</div><div>4</div><div>4</div></>
  }, {
    title: 'canvas实现代码雨',
    children: <><div>8</div><div>4</div><div>4</div></>
  }, {
    title: 'img自动懒加载',
    children: <><div>9</div><div>4</div><div>4</div></>
  }, {
    title: '本博客搭建、部署全流程',
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
