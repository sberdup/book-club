import {Outlet} from 'react-router-dom'
import {UserContext} from './UserContext'

function ContextLayout({values}) {
  return (
    <UserContext.Provider value={values}>
        <Outlet/>
    </UserContext.Provider>
  )
}

export default ContextLayout