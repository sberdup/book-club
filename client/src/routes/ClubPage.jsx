import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function ClubPage() {
  const [club, setClub] = useState({id: false })
  const { clubId } = useParams()

  // getting appropriate club based on params
  useEffect(() => {
    // console.log(club)
    getClub()
  }, [])
  async function getClub() {
    const resp = await fetch(`/clubs/${clubId}`)
    const data = await resp.json()
    if (resp.ok) {
      setClub(data)
    }
  }
  return (
    <div>
      {club.id ?
        <>
          <h2>{`Welcome to ${club.name}!`}</h2>
          <p>{club.message}</p>
        </>
        : null}
    </div>
  )
}

export default ClubPage