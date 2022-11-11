import { Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'
import { ClubContext } from './ClubContext'
import { BookContext } from './BookContext'
import { ClubUserContext } from './ClubUserContext'

function ContextLayout({ values }) {
  // passing in state values from App level to context value before wrapping around Outlet
  const { user, setUser, club, setClub, book, setBook, clubUser, setClubUser } = values
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ClubContext.Provider value={{ club, setClub }}>
        <ClubUserContext.Provider value={{ clubUser, setClubUser }}>
          <BookContext.Provider value={{ book, setBook }}>
            <Outlet />
          </BookContext.Provider>
        </ClubUserContext.Provider>
      </ClubContext.Provider>
    </UserContext.Provider>
  )
}

export default ContextLayout