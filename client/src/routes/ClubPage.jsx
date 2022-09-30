import React, { useEffect, useContext } from 'react'
import { Outlet, useParams } from 'react-router'
import { ClubContext } from '../context/ClubContext'

function ClubPage() {
  const {club, setClub} = useContext(ClubContext)
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
          <Outlet/>
        </>
        : null}
    </div>
  )
}

export default ClubPage