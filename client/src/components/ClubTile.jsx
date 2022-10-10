import { Card, CardFooter, CardHeader, Paragraph } from 'grommet'
import React from 'react'
import { Link } from 'react-router-dom'

function ClubTile({ club }) {
  return (
    <Card align='center' justify='center' background='orange-1'>
      <CardHeader margin={{top: 'small', bottom:'large'}}>{club.name}</CardHeader>
        <Paragraph>{club.message}</Paragraph>
      <CardFooter margin={{top:'large', bottom:'small'}}>
        <Link to={`/clubs/${club.id}`}>Club Page</Link>
      </CardFooter>
    </Card>
  )
}

export default ClubTile