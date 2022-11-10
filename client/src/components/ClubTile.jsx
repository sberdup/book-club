import { Card, CardFooter, CardHeader, Paragraph, Image, Box } from 'grommet'
import React from 'react'
import { Link } from 'react-router-dom'

function ClubTile({ club, home }) {
  return (
    <Card align='center' justify='between' alignSelf={home ? 'center' : 'stretch'} background='accent-3' width={home ? 'medium' : {min:'medium'}}>
      <CardHeader margin='small'>{club.name}</CardHeader>
      <Box height="small" width="small" margin={home ? 'small': 'none'}>
        <Image src={`${club.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/shape-27531_emuhhi80e.png' />
        <Paragraph>{club.message}</Paragraph>
      </Box>
      {home ? null :
      <CardFooter margin='small'>
        <Link to={`/clubs/${club.id}`}>Club Page</Link>
      </CardFooter>
      }
    </Card>
  )
}

export default ClubTile