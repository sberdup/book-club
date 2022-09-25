import React from 'react'
import { Link } from 'react-router-dom'

function ClubTile({club}) {
  return (
    <div>
        <h4>{club.name}</h4>
        <li>{club.message}</li>
        <Link to={`/clubs/${club.id}`}>Club Page</Link>
    </div>
  )
}

export default ClubTile