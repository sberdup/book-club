import { Button, FileInput, Form, FormField, TextInput, Text, Box } from 'grommet'
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
    formData.append("userId", user.id)

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
    <Box width={{max:'50vw'}} fill>
      <Form onSubmit={submitHandler}>
        <FormField label='First Name'>
          <TextInput textAlign='center' type="text" name="firstName" value={formData.firstName} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Last Name'>
          <TextInput textAlign='center' type="text" name="lastName" value={formData.lastName} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Username'>
          <TextInput textAlign='center' type="text" name="username" required value={formData.username} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Password'>
          <TextInput textAlign='center' type="password" name="password" required value={formData.password} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Confirm Password'>
          <TextInput textAlign='center' type="password" name="passwordConfirmation" required value={formData.passwordConfirmation} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Email'>
          <TextInput textAlign='center' type="text" name="email" required value={formData.email} onChange={inputHandler}></TextInput>
        </FormField>

        <Box gap='small'>
          <Text>Profile Picture</Text>
          <FileInput type='file' name="profilePicture" ref={fileRef} onChange={(e) => setFileName(e.target.files[0].name)}></FileInput>
        </Box>

        <Button primary label='Submit' type='submit' margin='xsmall'/>
      </Form>
    </Box>
  )
}
export default SignUpForm