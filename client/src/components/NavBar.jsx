import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LogInOut from './LogInOut'
import {useLocation} from 'react-router'

function NavBar() {
  const location = useLocation()
  
  return (
    <>
      <div className='NavBar'>
        <NavLink to="homepage/clubs">My Clubs</NavLink>
        <NavLink to="homepage/books">My Books</NavLink>
        <div>
          {(location.pathname === '/homepage') ? <LogInOut/> : <NavLink to ="homepage">Home</NavLink>}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar