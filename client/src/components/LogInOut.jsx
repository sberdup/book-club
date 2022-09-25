import React, { useContext, useState } from 'react'
import {UserContext} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'

function LogInOut({setErrors}) {
  const {user, setUser} = useContext(UserContext)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
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
    } else {
      setErrors(data)
    }
    //passing user into context, which goes up to App state
  }
  async function logoutHandler(){
    const resp = await fetch('/logout', {
      method:'DELETE'
    })
    if (resp.ok) {
      setUser({id:false})
      console.log('logged out')
      navigate('/')
    }
  }
  return (
    <div>
      {user.id ?

        <button onClick={logoutHandler}>Log Out</button> :

        <form onSubmit={submitHandler}>
          <label htmlFor='username'>Username: </label>
          <input type="text" id="username" value={formData.username} onChange={inputHandler}></input>
          <label htmlFor="password">Password: </label>
          <input type="text" id="password" value={formData.password} onChange={inputHandler}></input>
          <input type='submit'/>
        </form>
      }
    </div>
  )
}

export default LogInOut