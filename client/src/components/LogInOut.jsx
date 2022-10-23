import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Form, FormField, TextInput, Box } from 'grommet'

function LogInOut({ setErrors }) {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  // fills out the state for the form
  function inputHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function submitHandler(e) {
    e.preventDefault()
    const resp = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: formData.username, password: formData.password })
    })
    const data = await resp.json()
    if (resp.ok) {
      setUser(data)
      //passing user into context, which goes up to App state
    } else {
      setErrors(data)
    }
  }
  async function logoutHandler() {
    const resp = await fetch('/logout', {method: 'DELETE'})
    if (resp.ok) {
      setUser({ id: false })
      navigate('/')
      // go back to landing page after successful logout
    }
  }
  return (
    <>
      {user.id ?
          <NavLink className='activeLink' onClick={logoutHandler}>Log Out</NavLink>
        :
        <Box width={{ max: '60vw' }} fill>
          <Form onSubmit={submitHandler} align='center' >
            <FormField label='Username' margin='small'>
              <TextInput textAlign='center' type="text" name="username" required value={formData.username} onChange={inputHandler}></TextInput>
            </FormField>
            <FormField label='Password' margin='small'>
              <TextInput textAlign='center' type="password" name="password" required value={formData.password} onChange={inputHandler}></TextInput>
            </FormField>
            <Button label='Log In' type='submit' primary color='accent-1' size='medium' style={{ maxWidth: '30vw' }} margin={{ vertical: 'medium' }} fill />
          </Form>
        </Box>
      }
    </>
  )
}

export default LogInOut