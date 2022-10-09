import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormField, TextInput } from 'grommet'

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
    const resp = await fetch('/logout', {
      method: 'DELETE'
    })
    if (resp.ok) {
      setUser({ id: false })
      navigate('/')
      // go back to landing page after successful logout
    }
  }
  return (
    <>
      {user.id ?
        <div className='activeLink'>
          <Button primary color='green' label='Log Out' size='small' margin='none' onClick={logoutHandler}/>
        </div> :

        <Form onSubmit={submitHandler} className='flex-login'>
          <FormField label='Username' margin='small'>
            <TextInput type="text" name="username" label='Username:' value={formData.username} onChange={inputHandler}></TextInput>
          </FormField>
          <FormField label='Password' margin='small'>
            <TextInput type="password" name="password" value={formData.password} onChange={inputHandler}></TextInput>
          </FormField>
          <Button label='Log In' type='submit' primary color='#45BF3A' size='medium' margin={{vertical:'medium'}} />
        </Form>
      }
    </>
  )
}

export default LogInOut