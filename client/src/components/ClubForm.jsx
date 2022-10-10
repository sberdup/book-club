import { Button, Form, FormField, TextArea, TextInput } from 'grommet'
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
      <Form onSubmit={submitHandler} className='flex-club'>
        <FormField label='Club Name'>
          <TextInput type="text" id="name" value={formData.name} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Club Picture'>
          <TextInput type="text" id="clubPicture" value={formData.clubPicture} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Opening Club Message'>
          <TextArea type="text" id="message" value={formData.message} onChange={inputHandler}></TextArea>
        </FormField>
        <Button primary type='submit' label='Create'/>
      </Form>
    </div>
  )
}

export default ClubForm