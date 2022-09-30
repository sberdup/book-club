import { Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'
import { ClubContext } from './ClubContext'

function ContextLayout({values}) {
    // passing in state values from App level to context value before wrapping around Outlet
    const {user, setUser, club, setClub} = values
    return (
      <UserContext.Provider value={{user, setUser}}>
        <ClubContext.Provider value={{club, setClub}}>
          <Outlet />
        </ClubContext.Provider>
      </UserContext.Provider>
    )
  }

export default ContextLayout