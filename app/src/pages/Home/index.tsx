import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import Icon from '@/Icon'
import Background from '@/components/Background'
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
    directTo: '/notes?md=wirte_promise',
    children: <>手写Promise,通过率100%</>
  }, {
    title: 'Promise相关题目',
    directTo: '/notes?md=questions_promise',
    children: <>详解面试常考的promise题目</>
  }, {
    title: 'this指向',
    directTo: '/notes?md=this',
    children: <>还在被this指向折磨，看看这篇文章</>
  }, {
    title: '排序算法',
    directTo: '/notes?md=sort',
    children: <>排序算法</>
  }, {
    title: '函数式编程及链式调用',
    directTo: '/notes?md=functional_programming',
    children: <>函数式编程及链式调用</>
  }, {
    title: 'Vue3的响应式原理',
    directTo: '/source_code?md=proxy',
    children: <>详细讲解Vue3使用Proxy时限响应式</>
  }, {
    title: 'Vite+Vue3+Element Plus 开发 Chrome extension',
    directTo: '/project?md=chrome_extension',
    children: <>Chrome插件的快捷开发</>
  }, {
    title: 'canvas实现代码雨',
    directTo: '/project?md=code_rain',
    children: <>手写实现本博客背景的代码雨功能</>
  }, {
    title: 'img自动懒加载',
    directTo: '/notes?md=img_lazy_load',
    children: <>图片懒加载的几种方式</>
  }, {
    title: '本博客搭建、部署全流程',
    directTo: '/project?md=本博客搭建、部署全流程',
    children: <>
    讲解项目搭建流程及部署，附上仓库代码。
    </>
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
          {pages.map((page, index) => <PageBlock {...page} key={index} />)}
        </div>
      </div>
    </main>
  )
}

export default Home
