import React, { useContext, useState } from 'react'
import {UserContext} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'

function LogInOut({setErrors}) {
  const {user, setUser} = useContext(UserContext)
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
    if (resp.ok){
      setUser(data)
      //passing user into context, which goes up to App state
    } else {
      setErrors(data)
    }
  }
  async function logoutHandler(){
    const resp = await fetch('/logout', {
      method:'DELETE'
    })
    if (resp.ok) {
      setUser({id:false})
      navigate('/')
      // go back to landing page after successful logout
    }
  }
  return (
    <div>
      {user.id ?

        <button onClick={logoutHandler}>Log Out</button> :

        <form onSubmit={submitHandler} className='basicborder'>
          <label htmlFor='username'>Username: </label>
          <input type="text" name="username" value={formData.username} onChange={inputHandler}></input>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={formData.password} onChange={inputHandler}></input>
          <input type='submit'/>
        </form>
      }
    </div>
  )
}

export default LogInOut