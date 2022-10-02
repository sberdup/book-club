import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { UserContext } from '../context/UserContext'
import ClubForm from './ClubForm'
import ClubTile from './ClubTile'

function ClubGrid() {
    const { user } = useContext(UserContext)
    // pulling in user data from context which includes their club data
    const location = useLocation()
    const [errors, setErrors] = useState([])
    const [formToggle, setFormToggle] = useState(false)
    return (
        <>
            <button onClick={() => setFormToggle(!formToggle)}>{(formToggle) ? 'Hide Club Form' : 'New Club'}</button>
            {((location.pathname === '/homepage/clubs') && formToggle) ? <ClubForm setErrors={setErrors} /> : null}
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}
            
            <h2>Your Clubs</h2>
            <div className="tileGrid">
                {user.clubs.map(club => <ClubTile key={club.id} club={club} />)}
            </div>
        </>
    )
}

export default ClubGrid