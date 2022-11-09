import { Grid } from 'grommet'
import React from 'react'
import { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'
import UserTile from './UserTile'

function UserGrid() {
    const {club, setClub} = useContext(ClubContext)
  return (
    <Grid columns={{count:'fit', size:'large'}} rows='medium' gap='medium' margin='small' pad='small' justify='center' >
                {club.users?.length === 0 ? <h2>No clubs yet!</h2> 
                : 
                club.users.map(user => <UserTile key={user.id} user={user} />)}
            </Grid>
  )
}

export default UserGrid