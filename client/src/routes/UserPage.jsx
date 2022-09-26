import React, {useContext} from 'react'
import { Outlet } from 'react-router'
import { UserContext } from '../context/UserContext'

function UserPage() {
  const {user} = useContext(UserContext)
  //need to add more elements for edit/delete user
  return (
    <div>
      <h2>{user ? `Hello ${user.first_name || user.username}!`: 'Please log in.'}</h2>
      <Outlet/>
    </div>
  )
}

export default UserPage