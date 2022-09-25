import React from 'react'
import { Outlet } from 'react-router'
import LogInOut from './LogInOut'

function NavBar() {
  return (
    <>
      <div className='NavBar'>
        <div>A</div>
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