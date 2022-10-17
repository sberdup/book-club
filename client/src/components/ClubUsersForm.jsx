import { Box, Button, CheckBox, Form, FormField, Heading, TextInput } from 'grommet'
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
        console.log(data)
        if (resp.ok) {
            if (mode.action === 'DELETE') {
                setClubUsers(clubUsers.filter(clubUser => clubUser.id !== parseInt(formData.clubUserID)))
            } else if (mode.action === 'POST') {
                setClubUsers([...clubUsers, data])
            } else {
                setClubUsers(clubUsers.map(clubUser => {
                    if (clubUser.id === data.id) {
                        return data
                    }
                    return clubUser
                }))
            }
            setFormData(emptyForm)
            e.target.reset()
            setErrors({ errors: ['Success!'] })
        } else {
            setErrors(data)
        }
    }

    const sortedUsers = clubUsers.sort(clubUser => clubUser.user.username)
    // trying to get selection box items to refresh with state
    // failure to change state was a result of comparing form number(actually a string) with response data(integer)

    return (
        <Box gap='small' align='center'>
            <Heading alignSelf='center' level={4}>{mode.message}</Heading>
            
            <Box direction='row' alignSelf='center' justify='center' >
                <Button primary color='accent-1' onClick={() => setMode(inviteParams)} label='Invite' />
                <Button primary color='accent-2' onClick={() => setMode(editParams)} label='Edit' />
                <Button primary color='status-critical' onClick={() => setMode(kickParams)} label='Remove' />
            </Box>
            <Form onSubmit={submitHandler}>
                {mode.action === 'POST' ?
                    <FormField label='Username' width='small' margin='medium'>
                        <TextInput type="text" id="username" textAlign='center' value={formData.username} onChange={inputHandler}></TextInput>
                    </FormField>
                    :
                    <FormField label='Select a User' width='small' alignSelf='center' justify='center' margin='medium'>
                        <select id='clubUserID' onChange={inputHandler} defaultValue='default'>
                            <option disabled value='default'>--choose a user--</option>
                            {sortedUsers.map(clubUser =>
                                <option key={clubUser.user.id} value={clubUser.id}>
                                    {clubUser.user.username}
                                </option>
                            )}
                        </select>
                    </FormField>
                }
                {mode.action === 'PATCH' ?
                    <Box align='center'>
                        <CheckBox type="checkbox" id="isAdmin" label='Admin Status' checked={formData.isAdmin} onChange={inputHandler} />
                    </Box>
                    :
                    null
                }
                <Button primary type='submit' margin={{top:'medium'}} label='Submit' />
            </Form>
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'orangered', fontSize:'25px' , fontWeight:'bolder' }}>{`${e}`}</p>)}
        </Box>
    )
}

export default ClubUsersForm