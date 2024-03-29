import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/main.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import initHeart from '@/components/Heart'
initHeart()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
)
