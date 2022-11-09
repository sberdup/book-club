import { Card, Image, Paragraph, Box } from 'grommet'
import React from 'react'

function UserTile({user}) {
    console.log(user)
  return (
    <Card width='medium' alignSelf='center' align='center' background='accent-1'>
        <Box height="small" width="small" margin='small'>
          <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/149071_Dcw9gvaSe.png' />
          <Paragraph>{user.username}</Paragraph>
        </Box>
      </Card>
  )
}

export default UserTile