import { Box, Button, Card, Form, FormField, TextInput, Image, Paragraph, CardFooter } from 'grommet'
import React, { useState, useEffect, useRef } from 'react'
import { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'

function NewClubUser() {
    const [createToggle, setCreateToggle] = useState(false)
    const [user, setUser] = useState({})
    const [userConfirmToggle, setUserConfirmToggle] = useState(false)
    const [formData, setFormData] = useState({ username: '' })
    const [errors, setErrors] = useState([])
    const errorBox = useRef(null)
    const { club, setClub } = useContext(ClubContext)

    useEffect(() => {
        errorBox.current = document.getElementById('errorBox')
    }, [createToggle])

    function errorHandler(errors) {
        setErrors(errors)
        errorBox.current.className = 'errorBox'
        setTimeout(() => errorBox.current.className = 'errorBox fade', 2000)
    }

    function inputHandler(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    async function addUserHandler(e) {
        e.preventDefault()

        const resp = await fetch(`/clubs/${club.id}/club_users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user.username,
                club_id: club.id
            })
        })
        const data = await resp.json()
        if (resp.ok) {
            setClub({ ...club, club_users: [{...data, user:user}, ...club.club_users] })
            setFormData({ username: '' })
            setUserConfirmToggle(false)
            setCreateToggle(false)
            errorHandler({ errors: ['Success!'] })
        } else {
            errorHandler(data)
        }
    }

    async function submitHandler() {
        const resp = await fetch(`/users_search/${formData.username}`)
        const data = await resp.json()
        if (resp.ok) {
            setUser(data)
            setUserConfirmToggle(true)
        } else {
            errorHandler(data)
        }
    }

    return (
        <Box className='zFloor'>
            <Button secondary color='accent-4' label={createToggle ? "Cancel" : "Add User"} alignSelf='center' fill style={{ maxWidth: '25%' }} onClick={() => setCreateToggle(!createToggle)} />
            <Box className='errorBox fade' id='errorBox'>
                {errors.length === 0 ? null : errors.errors.map(e => <p key={e}>{`${e}`}</p>)}
            </Box>
            {createToggle ?

                (userConfirmToggle ?
                    <Card width='medium' alignSelf='center' align='center' background='accent-1' margin='small'>
                        <Box height="small" width="small" >
                            <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/149071_Dcw9gvaSe.png' />
                            <Paragraph>{user.username}</Paragraph>
                        </Box>
                        <CardFooter gap='none' alignSelf='stretch' margin='xsmall'>
                            <Button primary color='dark-3' size='small' label='Back' onClick={() => setUserConfirmToggle(false)} />
                            <Button primary color='accent-2' size='small' label='Add this User' onClick={addUserHandler} />
                        </CardFooter>
                    </Card>
                    :
                    <Box gap='small' align='center'>
                        <Form onSubmit={submitHandler}>
                            <FormField label='Search Username' width='small' margin='medium'>
                                <TextInput type="text" id="username" textAlign='center' value={formData.username} onChange={inputHandler}></TextInput>
                            </FormField>
                        </Form>
                    </Box>
                )
                : null
            }
        </Box>
    )
}

export default NewClubUser