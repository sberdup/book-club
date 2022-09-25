import {Outlet} from 'react-router-dom'
import {UserContext} from './UserContext'

function ContextLayout({values}) {
    // passing in state values from App level to context value before wrapping around Outlet
  return (
    <UserContext.Provider value={values}>
        <Outlet/>
    </UserContext.Provider>
  )
}

export default ContextLayout