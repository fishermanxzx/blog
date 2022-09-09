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
            <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">粤ICP备2022109946号-1</a>
          </footer>
    </div>
  )
}

export default App
