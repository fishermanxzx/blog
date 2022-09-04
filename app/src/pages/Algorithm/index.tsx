import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
type Props = {}

export default function Algorithm({}: Props) {
  return (
    <div>Algorithm
        <div>
            <NavLink to="sort">排序算法</NavLink>
        </div>
        <div>
            <Outlet></Outlet>
        </div>
    </div>
  )
}
