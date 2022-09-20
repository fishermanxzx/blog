import React from 'react'
import beian from '@/assets/beian.png'
import './App.scss'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
function App() {
  const element = useRoutes(routes)
  return (
    <div className="App">
          {element}

          <footer className='web_info'>
            <img src={beian}/>
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44060502003107" rel="noreferrer">粤公网安备 44060502003107号</a>&emsp;
            <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">粤ICP备2022109946号-1</a>
          </footer>
    </div>
  )
}

export default App
