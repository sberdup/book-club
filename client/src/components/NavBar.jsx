import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LogInOut from './LogInOut'

function NavBar() {
  return (
    <>
      <div className='NavBar'>
        <NavLink to="homepage/clubs">My Clubs</NavLink>
        <div>B</div>
        <div>
          <LogInOut/>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar