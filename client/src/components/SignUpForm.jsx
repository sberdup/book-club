import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

function SignUpForm({setErrors}) {
  const {setUser} = useContext(UserContext)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', passwordConfirmation: '', profilePicture: '' })

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
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
      <h3>Sign Up for a New Account</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" id="firstName" value={formData.firstName} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" id="lastName" value={formData.lastName} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor='username'>Username: </label>
          <input type="text" id="username" value={formData.username} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={formData.password} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password: </label>
          <input type="password" id="passwordConfirmation" value={formData.passwordConfirmation} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" value={formData.email} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture: </label>
          <input type="text" id="profilePicture" value={formData.profilePicture} onChange={inputHandler}></input>
        </div>
        <input type='submit' />
      </form>
    </div>
  )
}
export default SignUpForm