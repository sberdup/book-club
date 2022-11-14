import { Button } from 'grommet'
import React, { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'

function UserRemoveButton({ user, errorHandler, deleteToggle, setDeleteToggle }) {
    const { club, setClub } = useContext(ClubContext)

    async function deleteHandler() {
        const resp = await fetch(`/clubs/${club.id}/club_users/${user.id}`,
            { method: 'DELETE' })
        const data = await resp.json()
        if (resp.ok) {
            setClub({ ...club, users: club.users.filter(member => member.id !== parseInt(user.id)) })
        } else {
            errorHandler(data)
        }
    }
    return (
        <>
            {deleteToggle ?
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Confirm Removal'
                    onClick={deleteHandler} onBlur={() => setDeleteToggle(false)} />
                :
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Kick' onClick={() => setDeleteToggle(!deleteToggle)} />
            }
        </>
    )
}

export default UserRemoveButton