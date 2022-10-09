import { Box } from 'grommet'
import React, { useEffect, useContext } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ClubContext } from '../context/ClubContext'

function ClubPage() {
  const { club, setClub } = useContext(ClubContext)
  const { clubId } = useParams()
  const location = useLocation()
  const navLinkFunction = ({isActive}) => isActive ? 'activeLink' : 'inactiveLink'

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
          <Box tag='header' direction='row' align='center' justify='between'
        background='light-2' pad={{ vertical: 'small', horizontal: 'medium' }} elevation='medium'>
            <NavLink to="options" className={navLinkFunction}>Club Options</NavLink>
            <NavLink to="books" className={navLinkFunction}>Club Books</NavLink>
            <NavLink to={`/clubs/${clubId}`} className={location.pathname === `/clubs/${clubId}` ? 'activeLink' : 'inactiveLink'}>Club Home</NavLink>
          </Box>
          <Outlet />
        </>
        : null}
    </div>
  )
}

export default ClubPage