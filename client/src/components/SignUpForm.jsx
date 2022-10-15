import { Button, FileInput, Form, FormField, TextInput, Text } from 'grommet'
import React, { useState, useContext, useRef } from 'react'
import { UserContext } from '../context/UserContext'

function SignUpForm({ setErrors }) {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', passwordConfirmation: ''})
  const fileRef = useRef(null)
  const [fileName, setFileName] = useState('')

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function submitHandler(e) {
    e.preventDefault()
    const resp = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      })
    })
    const data = await resp.json()
    
    if (resp.ok && fileName === '') {
      setUser(data)
    } else if (resp.ok) {
      sendPic(data)
    } else {
      setErrors(data)
    }
    //passing user into context, which goes up to App state
  }

  async function sendPic(user) {
    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);
    formData.append("fileName", fileName)
    formData.append("userId", parseInt(user.id))

    const resp = await fetch('/images', {method:'POST', body: formData})
    const data = await resp.json()

    if (resp.ok) {
      setUser({...user, image:data})
    } else {
      setErrors(data)
      setTimeout(setUser(user), 2000)
    }
  }

  return (
    <div>
      <Form onSubmit={submitHandler} className='flex-login'>
        <h2>Sign Up for a New Account</h2>
        <FormField label='First Name'>
          <TextInput type="text" name="firstName" value={formData.firstName} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Last Name'>
          <TextInput type="text" name="lastName" value={formData.lastName} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Username'>
          <TextInput type="text" name="username" value={formData.username} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Password'>
          <TextInput type="password" name="password" value={formData.password} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Confirm Password'>
          <TextInput type="password" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Email'>
          <TextInput type="text" name="email" value={formData.email} onChange={inputHandler}></TextInput>
        </FormField>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignSelf: 'center', height: '10em', width: '20em' }}>
          <Text>Profile Picture</Text>
          <FileInput type='file' name="profilePicture" ref={fileRef} onChange={(e) => setFileName(e.target.files[0].name)}></FileInput>
        </div>

        <Button primary label='Submit' type='submit' />
      </Form>
    </div>
  )
}
export default SignUpForm