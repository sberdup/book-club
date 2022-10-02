import { Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'
import { ClubContext } from './ClubContext'
import { BookContext } from './BookContext'

function ContextLayout({ values }) {
  // passing in state values from App level to context value before wrapping around Outlet
  const { user, setUser, club, setClub, book, setBook } = values
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ClubContext.Provider value={{ club, setClub }}>
        <BookContext.Provider value={{ book, setBook }}>
          <Outlet />
        </BookContext.Provider>
      </ClubContext.Provider>
    </UserContext.Provider>
  )
}

export default ContextLayout