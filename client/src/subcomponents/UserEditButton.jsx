import { Button } from 'grommet'
import React, { useContext } from 'react'

function UserEditButton({ user, member, club, setClub, errorHandler, editToggle, setEditToggle }) {
    async function editHandler() {
        const resp = await fetch(`/clubs/${club.id}/club_users/${user.id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    is_admin: !member.is_admin
                })
            })
        const data = await resp.json()
        if (resp.ok) {
            console.log('return edit data', data)
            setClub({
                ...club, club_users: club.club_users.map(member => {
                    if (member.user.id === data.id) {
                        return {...data, user:user}
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