import { Box, Heading, Spinner} from 'grommet'
import React, { useEffect, useContext, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import ClubTile from '../components/ClubTile'
import { ClubContext } from '../context/ClubContext'
import { ClubUserContext } from '../context/ClubUserContext'
import { fetchGetter } from '../functions/commonFunctions'

function ClubPage() {
  const { club, setClub } = useContext(ClubContext)
  const { setClubUser} = useContext(ClubUserContext)
  const { clubId } = useParams()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const navLinkFunction = ({ isActive }) => isActive ? 'activeLink' : 'inactiveLink'
  // getting appropriate club based on params
  useEffect(() => {
    getClub()
  }, [])

  async function getClub() {
    setLoading(true)
    const fetch1 = await fetchGetter(`/clubs/${clubId}`)
    const fetch2 = await fetchGetter(`/perms/${clubId}`)
    if (fetch1.resp.ok && fetch2.resp.ok) {
      setClub(fetch1.data)
      setClubUser(fetch2.data[0])
      setLoading(false)
    }
  }

  return (
    <Box>
      {club.id ?
        <>
          <Heading alignSelf='center' level={2}>{`Welcome to ${club.name}!`}</Heading>
          <Box tag='header' direction='row' align='center' justify='between' margin={{bottom:'small'}} background='accent-3'>
            <NavLink to="users" className={navLinkFunction}>Club Members</NavLink>
            <NavLink to="books" className={navLinkFunction}>Club Books</NavLink>
            <NavLink to={`/clubs/${clubId}`} className={location.pathname === `/clubs/${clubId}` ? 'activeLink' : 'inactiveLink'}>Club Home</NavLink>
          </Box>
          {(location.pathname === `/clubs/${clubId}`) ?
            (loading ? <Spinner color='goldenrod' size='xlarge' style={{ margin: 'auto' }} /> : <ClubTile club={club} home={true} />)
            : null}
          <Outlet />
        </>
        : null}
    </Box>
  )
}

export default ClubPage