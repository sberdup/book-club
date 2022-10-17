import { Button, Grid, Heading } from 'grommet'
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
            <Button secondary fill color='accent-4' alignSelf='center' style={{maxWidth:'25%'}} margin={{bottom:'small'}} onClick={() => setFormToggle(!formToggle)} label={(formToggle) ? 'Hide Club Form' : 'New Club'}/>
            
            {((location.pathname === '/homepage/clubs') && formToggle) ? <ClubForm setErrors={setErrors} /> : null}
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}

            <Heading level={2} alignSelf='center' margin={{bottom:'none'}}>Your Clubs</Heading>
            <Grid columns={{count:'fit', size:'medium'}} rows='medium' gap='medium' border={true}  alignContent='center' margin='small' pad='small'>
                {user?.clubs?.length === 0 ? <h2>No clubs yet!</h2> 
                : 
                user.clubs.map(club => <ClubTile key={club.id} club={club} />)}
            </Grid>
        </>
    )
}

export default ClubGrid