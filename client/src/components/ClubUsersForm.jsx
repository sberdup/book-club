import React, { useState, useEffect, useContext } from 'react'
import { ClubContext } from '../context/ClubContext'

function ClubUsersForm() {
    const emptyForm = { username: '', isAdmin: false, id: 'none', clubUserID: 'none' }
    const inviteParams = { action: 'POST', message: 'Add a new member!' }
    const kickParams = { action: 'DELETE', message: 'Remove a member.' }
    const editParams = { action: 'PATCH', message: "Change a member's admin status." }
    // stable variables

    const [mode, setMode] = useState(inviteParams)
    // splits form into 3 types of entry
    const [formData, setFormData] = useState(emptyForm)
    const [clubUsers, setClubUsers] = useState([])
    const [errors, setErrors] = useState([])
    const { club } = useContext(ClubContext)

    useEffect(() => {
        getClubUsers()
    }, [])

    async function getClubUsers() {
        console.log(club)
        const resp = await fetch(`/club_users/${club.id}`)
        const data = await resp.json()
        if (resp.ok) {
            setClubUsers(data)
            // console.log(data)
        }
    }

    function inputHandler(e) {
        if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.id]: e.target.checked })
        } else {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        }
        // needed to add condition for checkbox
    }

    async function submitHandler(e) {
        e.preventDefault()

        let endpoint
        if (mode.action === 'POST') {
            endpoint = '/club_users'
        } else {
            endpoint = `/club_users/${formData.clubUserID}`
        }
        // gets params from form to navigate delete/update

        const resp = await fetch(endpoint, {
            method: mode.action,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                is_admin: (mode.action !== 'POST') && formData.isAdmin,
                is_owner: false,
                club_id: club.id
            })
            // was going to exclude body for DELETE but need params to get club id
        })
        const data = await resp.json()
        // head: :no_content causes unexpected end of JSON here, return usable data instead
        if (resp.ok) {
            if (mode.action === 'DELETE') {
                setClubUsers([...clubUsers].filter(clubUser => clubUser.id !== data.id))
            } else if (mode.action === 'POST') {
                setClubUsers([...clubUsers, data])
            } else {
                setClubUsers([...clubUsers].map(clubUser => {
                    if (clubUser.id === data.id) {
                        return data
                    }
                    return clubUser
                }))
            }
            setFormData(emptyForm)
            setErrors({ errors: ['Success!'] })
        } else {
            setErrors(data)
        }
    }

    const sortedUsers = clubUsers.sort(clubUser => clubUser.user.username)
    // trying to get selection box items to refresh with state

    return (
        <div className='basicborder'>
            <h4>{mode.message}</h4>
            <div className="basicborder">
                <button onClick={() => setMode(inviteParams)}>Invite</button>
                <button onClick={() => setMode(editParams)}>Edit</button>
                <button onClick={() => setMode(kickParams)}>Remove</button>
            </div>
            <form onSubmit={submitHandler} className="basicborder">
                {mode.action === 'POST' ?
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" value={formData.username} onChange={inputHandler}></input>
                    </div>
                    :
                    <div>
                        <label htmlFor='clubUserID'>Select a user: </label>
                        <select id='clubUserID' onChange={inputHandler}>
                            {sortedUsers.map(clubUser =>
                                <option key={clubUser.user.id} value={clubUser.id}>
                                    {clubUser.user.username}
                                </option>
                            )}
                        </select>
                    </div>
                }
                {mode.action === 'PATCH' ?
                    <div>
                        <label htmlFor="isAdmin">Admin Status: </label>
                        <input type="checkbox" id="isAdmin" checked={formData.isAdmin} onChange={inputHandler}></input>
                    </div>
                    :
                    null
                }
                <input type='submit' />
            </form>
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}
        </div>
    )
}

export default ClubUsersForm