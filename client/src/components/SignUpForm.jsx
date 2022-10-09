import { Button, Form, FormField, TextInput } from 'grommet'
import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

function SignUpForm({setErrors}) {
  const {setUser} = useContext(UserContext)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', passwordConfirmation: '', profilePicture: '' })

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
        profile_picture: formData.profilePicture
      })
    })
    const data = await resp.json()
    console.log(data)
    if (resp.ok){
      setUser(data)
    } else {
      setErrors(data)
    }
    //passing user into context, which goes up to App state
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

        <FormField label='Profile Picture'>
          <TextInput type="text" name="profilePicture" value={formData.profilePicture} onChange={inputHandler}></TextInput>
        </FormField>

        <Button primary label='Submit' type='submit'/>
      </Form>
    </div>
  )
}
export default SignUpForm