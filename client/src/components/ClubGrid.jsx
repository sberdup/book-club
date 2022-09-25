import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import ClubTile from './ClubTile'

function ClubGrid() {
    const {user} = useContext(UserContext)
    console.log(user)
  return (
    <div>
        {user.clubs.map(club => <ClubTile key={club.id} club={club}/>)}
    </div>
  )
}

export default ClubGrid