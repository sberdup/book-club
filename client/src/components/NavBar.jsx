import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LogInOut from './LogInOut'
import { useLocation } from 'react-router'

function NavBar() {
  const location = useLocation()
  const navLinkFunction = ({isActive}) => isActive ? 'activeLink' : 'inactiveLink'

  return (
    <>
        <div className='NavBar'>
          <NavLink to="homepage/clubs" className={navLinkFunction}>My Clubs</NavLink>
          <NavLink to="homepage/books" className={navLinkFunction}>My Books</NavLink>
          {(location.pathname === '/homepage') ? <LogInOut /> : <NavLink to="homepage" className={navLinkFunction}>Home</NavLink>}
        </div> 
      <Outlet />
    </>
  )
}

export default NavBar