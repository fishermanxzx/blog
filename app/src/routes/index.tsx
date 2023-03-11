import React from 'react'
import Algorithm from '@/pages/Algorithm'
import Sort from '@/pages/Algorithm/Sort'
import Notes from '@/pages/Notes'
import Project from '@/pages/Project'
import Interview from '@/pages/Interview'
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import MarkdownPage from '@/pages/MarkdownPage'
// import { Navigate } from 'react-router-dom'

export default [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/notes',
    element: <Notes />
  },
  {
    path: '/project',
    element: <Project />
  },
  {
    path: '/algorithm',
    element: <Algorithm />,
    children: [
      {
        path: 'sort',
        element: <Sort />
      }
    ]
  },
  {
    path: '/interview',
    element: <Interview />
  },
  {
    path: '/markdown',
    element: <MarkdownPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
//   {
//     path: '/',
//     element: <Navigate to="/about" />
//   }
]
