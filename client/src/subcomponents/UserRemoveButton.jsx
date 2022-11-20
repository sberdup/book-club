import { Button } from 'grommet'

function UserRemoveButton({ user, club, setClub, errorHandler, deleteToggle, setDeleteToggle }) {
    async function deleteHandler() {
        const resp = await fetch(`/clubs/${club.id}/club_users/${user.id}`,
            { method: 'DELETE' })
        const data = await resp.json()
        if (resp.ok) {
            setClub({ ...club, club_users: club.club_users.filter(member => member.user.id !== parseInt(user.id)) })
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