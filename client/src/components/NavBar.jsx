import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LogInOut from './LogInOut'
import { useLocation } from 'react-router'
import { Box, Header } from 'grommet'

function NavBar() {
  const location = useLocation()
  const navLinkFunction = ({ isActive }) => isActive ? 'activeLink' : 'inactiveLink'

  return (
    <>
      <Header >
        <NavLink to="homepage/clubs" className={navLinkFunction}>My Clubs</NavLink>
        <NavLink to="homepage/books" className={navLinkFunction}>My Books</NavLink>
        {(location.pathname === '/homepage') ? <LogInOut /> : <NavLink to="homepage" className='inactiveLink'>Home</NavLink>}

      </Header>
      <Outlet />
    </>
  )
}

export default NavBar