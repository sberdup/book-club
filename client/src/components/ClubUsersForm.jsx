import React, { useState, useEffect, useContext } from 'react'
import { ClubContext } from '../context/ClubContext'

function ClubUsersForm() {
    const emptyForm = { username: '', isAdmin: false }
    const inviteParams = { action: 'POST', endpoint: '/club_users', message: 'Add a new member!' }
    const kickParams = { action: 'DELETE', endpoint: '/club_users', message: 'Remove a member.' }
    const editParams = { action: 'PATCH', endpoint: '/club_users', message: "Change a member's admin status." }

    const [mode, setMode] = useState(inviteParams)
    const [formData, setFormData] = useState(emptyForm)
    const [clubUsers, setClubUsers] = useState([])
    const [errors, setErrors] = useState([])
    const { club } = useContext(ClubContext)

    useEffect(() => {
        getClubUsers()
    }, [])

    async function getClubUsers() {
        const resp = await fetch(`/club_users/${club.id}`)
        const data = await resp.json()
        if (resp.ok) {
            setClubUsers(data)
            console.log(data)
        }
    }

    function inputHandler(e) {
        if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.id]: e.target.checked })
        } else {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        }
        console.log(formData)
    }

    async function submitHandler(e) {
        e.preventDefault()
        const resp = await fetch(mode.endpoint, {
            method: mode.action,
            headers: { 'Content-Type': 'application/json' },
            body: (mode.action !== 'DELETE') && JSON.stringify({
                username: formData.username,
                is_admin: (mode.action !== 'POST') && formData.isAdmin,
                is_owner: false
            })
        })
        const data = await resp.json()
        console.log(data)
        if (resp.ok) {
            setFormData(emptyForm)
            setErrors({ errors: ['Success!'] })
        } else {
            setErrors(data)
        }
    }

    return (
        <div>
            <h4>{mode.message}</h4>
            <div>
                <button onClick={() => setMode(inviteParams)}>Invite</button>
                <button onClick={() => setMode(kickParams)}>Remove</button>
                <button onClick={() => setMode(editParams)}>Edit</button>
            </div>
            <form onSubmit={submitHandler}>
                {mode.action === 'POST' ?
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" value={formData.username} onChange={inputHandler}></input>
                    </div>
                    :
                    <div>
                        <label htmlFor='users'>Select a user: </label>
                        <select id='users'>
                            {clubUsers.map(user => <option key={user.id}>{user.id}</option>)}
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