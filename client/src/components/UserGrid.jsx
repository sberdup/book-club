import { Grid } from 'grommet'
import React from 'react'
import { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'
import UserTile from './UserTile'

function UserGrid({source}) {
    const {club} = useContext(ClubContext)
  return (
    <Grid columns={{count:'fit', size:'medium'}}  gap='medium' margin='small' justify='center' >
                {club.club_users?.length === 0 ? <h2>No clubs yet!</h2> 
                : 
                club.club_users.map(member => <UserTile source={source} key={member.id} member={member} user={member.user}/>)}
            </Grid>
  )
}

export default UserGrid