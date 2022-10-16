import { Button, Form, FormField, TextArea, TextInput, Text, FileInput } from 'grommet'
import React, {useState, useContext, useRef} from 'react'
import { UserContext } from '../context/UserContext'

function ClubForm({setErrors}) {
  const emptyForm = { name: '', message: ''}
  const [formData, setFormData] = useState(emptyForm)
  const {user, setUser} = useContext(UserContext)

  const fileRef = useRef(null)
  const [fileName, setFileName] = useState('')


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

      if (fileName === '') {
        setUser({...user, clubs:[...user.clubs, data]})
        setErrors({errors:['Success!']})
      } else {
        sendPic(data)
      }
    } else {
      setErrors(data)
    }
  }

  async function sendPic(club) {
    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);
    formData.append("fileName", fileName)
    formData.append("clubId", club.id)

    const resp = await fetch('/images', {method:'POST', body: formData})
    const data = await resp.json()

    if (resp.ok) {
      setUser({...user, clubs:[...user.clubs, {...club, image:data}]})
    } else {
      setUser({...user, clubs:[...user.clubs, club]})
      setErrors({errors:['Club created, picture not set.']})
    }
  }

  return (
    <div>
      <h3>Create a new Club!</h3>
      <Form onSubmit={submitHandler} className='flex-club'>
        <FormField label='Club Name'>
          <TextInput type="text" id="name" value={formData.name} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Opening Club Message'>
          <TextArea type="text" id="message" value={formData.message} onChange={inputHandler}></TextArea>
        </FormField>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignSelf: 'center', height: '10em', width: '20em' }}>
          <Text>Club Picture</Text>
          <FileInput type='file' name="clubPicture" ref={fileRef} onChange={(e) => setFileName(e.target.files[0].name)}></FileInput>
        </div>
        <Button primary type='submit' label='Create'/>
      </Form>
    </div>
  )
}

export default ClubForm