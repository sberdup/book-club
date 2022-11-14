import { Button } from 'grommet'
import React, { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'

function UserRemoveButton({ user, errorHandler, deleteToggle, setDeleteToggle }) {
    const { club, setClub } = useContext(ClubContext)

    async function deleteHandler() {
        const resp = await fetch(`/${'clubuserpath'}/${user.id}`,
            { method: 'DELETE' })
        if (resp.ok) {
            setClub({ ...club, 'users': club['users'].filter(member => member.id !== parseInt(user.id)) })
        } else {
            errorHandler({errors: ['Failed to delete!']})
        }
    }
    return (
        <>
            {deleteToggle ?
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Confirm Removal' onClick={deleteHandler} />
                :
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Kick' onClick={() => setDeleteToggle(!deleteToggle)} />
            }
        </>
    )
}

export default UserRemoveButton