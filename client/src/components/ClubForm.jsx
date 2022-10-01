import React, {useState, useContext} from 'react'
import { UserContext } from '../context/UserContext'

function ClubForm({setErrors}) {
  const emptyForm = { name: '', clubPicture: '', message: ''}
  const [formData, setFormData] = useState(emptyForm)
  const {user, setUser} = useContext(UserContext)

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  async function submitHandler(e) {
    e.preventDefault()
    const resp = await fetch('/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        club_picture: formData.clubPicture,
        message: formData.message,
      })
    })
    const data = await resp.json()
    console.log(data)
    if (resp.ok){
      setFormData(emptyForm)
      setUser({...user, clubs:[...user.clubs, data]})
      setErrors({errors:['Success!']})
    } else {
      setErrors(data)
    }
    //passing user into context, which goes up to App state
  }

  return (
    <div>
      <h3>Create a new Club!</h3>
      <form onSubmit={submitHandler} className='basicborder'>
        <div>
          <label htmlFor="name">Club Name: </label>
          <input type="text" id="name" value={formData.name} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="clubPicture">Club Picture: </label>
          <input type="text" id="clubPicture" value={formData.clubPicture} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="message">Opening Club Message: </label>
          <input type="text" id="message" value={formData.message} onChange={inputHandler}></input>
        </div>
        <input type='submit' />
      </form>
    </div>
  )
}

export default ClubForm