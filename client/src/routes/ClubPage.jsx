import { Box, Image, Card, Paragraph, Heading} from 'grommet'
import React, { useEffect, useContext } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ClubContext } from '../context/ClubContext'

function ClubPage() {
  const { club, setClub } = useContext(ClubContext)
  const { clubId } = useParams()
  const location = useLocation()
  const navLinkFunction = ({ isActive }) => isActive ? 'activeLink' : 'inactiveLink'
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
    <Box>
      {club.id ?
        <>
          <Heading alignSelf='center' level={2}>{`Welcome to ${club.name}!`}</Heading>
          <Box tag='header' direction='row' align='center' justify='between' margin={{bottom:'small'}} background='accent-3'>
            <NavLink to="users" className={navLinkFunction}>Club Members</NavLink>
            <NavLink to="books" className={navLinkFunction}>Club Books</NavLink>
            <NavLink to={`/clubs/${clubId}`} className={location.pathname === `/clubs/${clubId}` ? 'activeLink' : 'inactiveLink'}>Club Home</NavLink>
          </Box>
          {location.pathname === `/clubs/${clubId}` ?
            <Card background='accent-3' width='medium' alignSelf='center' align='center' margin='small'>
              <Box height="small" width="small" margin='small'>
                <Image src={`${club.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/shape-27531_emuhhi80e.png' />
                <Paragraph>{club.message}</Paragraph>
              </Box>
            </Card>
            : null}
          <Outlet />
        </>
        : null}
    </Box>
  )
}

export default ClubPage