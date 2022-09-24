import React, { useContext, useState } from 'react'
import {UserContext} from '../context/UserContext'

function LogInOut() {
  const [user, setUser] = useContext(UserContext)
  const [formData, setFormData] = useState({ username: '', password: '' })

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
    console.log(data)
    setUser(data)
    // setFormData({username:'',password:''})
  }
  return (
    <div>
      {!!user ?

        <button>Log Out</button> :

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