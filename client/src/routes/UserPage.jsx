import { Card, Box, Image, Paragraph } from 'grommet'
import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router'
import { UserContext } from '../context/UserContext'

function UserPage() {
  const { user } = useContext(UserContext)
  //need to add more elements for edit/delete user
  const location = useLocation()

  return (
    <div>
      <h2>{user ? `Hello ${user.first_name || user.username}!` : 'Please log in.'}</h2>
      <Outlet />
      {location.pathname === '/homepage' ?
      <Card align='center' justify='center' background='green-1'>
        <Box height="small" width="small">
          <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/149071_Dcw9gvaSe.png' />
          <Paragraph>{user.first_name}</Paragraph>
        </Box>
      </Card>
      : null}
    </div>
  )
}

export default UserPage