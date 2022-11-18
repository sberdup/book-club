import { Button } from 'grommet'
import React, { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'

function UserEditButton({ user, errorHandler, editToggle, setEditToggle }) {
    const { club, setClub } = useContext(ClubContext)

    async function editHandler() {
        const resp = await fetch(`/clubs/${club.id}/club_users/${user.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    is_admin: !user.is_admin
                })
            })
        const data = await resp.json()
        if (resp.ok) {
            setClub({
                ...club, users: club.users.map(member => {
                    if (member.id === data.id) {
                        return data
                    }
                    return member
                })
            })
            errorHandler({ errors: ['Success!'] })
            setEditToggle(false)
        } else {
            errorHandler(data)
        }
    }

    return (
        <>
            {editToggle ?
                <Button primary color='status-warning' size='xsmall' margin='xsmall' label='Confirm Change'
                    onClick={editHandler} onBlur={() => setEditToggle(false)} />
                :
                <Button primary color='status-warning' size='xsmall' margin='xsmall' label='Toggle Admin' onClick={() => setEditToggle(!editToggle)} />
            }
        </>
    )
}

export default UserEditButton