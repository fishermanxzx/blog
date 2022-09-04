import React from 'react'
import Algorithm from '@/pages/Algorithm'
import Sort from '@/pages/Algorithm/Sort'
import Notes from '@/pages/Notes'
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
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
    path: '*',
    element: <NotFound />
  }
//   {
//     path: '/',
//     element: <Navigate to="/about" />
//   }
]
