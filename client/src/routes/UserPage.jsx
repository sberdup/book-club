import { Card, Box, Image, Paragraph, Heading } from 'grommet'
import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router'
import { UserContext } from '../context/UserContext'

function UserPage() {
  const { user } = useContext(UserContext)
  //need to add more elements for edit/delete user
  const location = useLocation()

  return (
    <Box>
      <Heading alignSelf='center' level={2}>{user ? `Hello ${user.first_name || user.username}!` : 'Please log in.'}</Heading>
      <Outlet />
      {location.pathname === '/homepage' ?
      <Card width='medium' alignSelf='center' align='center' background='accent-1'>
        <Box height="small" width="small" margin='small'>
          <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/149071_Dcw9gvaSe.png' />
          <Paragraph>{user.first_name + ' ' + user.last_name}</Paragraph>
        </Box>
      </Card>
      : null}
    </Box>
  )
}

export default UserPage