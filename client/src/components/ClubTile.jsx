import { Card, CardFooter, CardHeader, Paragraph, Image, Box } from 'grommet'
import React from 'react'
import { Link } from 'react-router-dom'

function ClubTile({ club }) {
  return (
    <Card align='center' justify='center' background='accent-3' width={{min:'medium'}}>
      <CardHeader margin={{ top: 'small', bottom: 'large' }}>{club.name}</CardHeader>
      <Box height="small" width="small">
        <Image src={`${club.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/shape-27531_emuhhi80e.png' />
        <Paragraph>{club.message}</Paragraph>
      </Box>
      <CardFooter margin={{ top: 'large', bottom: 'small' }}>
        <Link to={`/clubs/${club.id}`}>Club Page</Link>
      </CardFooter>
    </Card>
  )
}

export default ClubTile