import React, { useEffect, useContext } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ClubContext } from '../context/ClubContext'

function ClubPage() {
  const { club, setClub } = useContext(ClubContext)
  const { clubId } = useParams()
  const location = useLocation()

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
          <div className='NavBar'>
            <NavLink to="options">Club Options</NavLink>
            <NavLink to="books">Club Books</NavLink>
            {(location.pathname !== `/clubs/${clubId}`) ? <NavLink to={`/clubs/${clubId}`}>Club Home</NavLink> : <p>Link</p>}
          </div>
          <Outlet />
        </>
        : null}
    </div>
  )
}

export default ClubPage