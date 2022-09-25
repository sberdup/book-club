import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

function UserPage() {
  const {user} = useContext(UserContext)
  return (
    <div>
      <h2>{user ? `Hello ${user.first_name || user.username}!`: 'Please log in.'}</h2>
    </div>
  )
}

export default UserPage