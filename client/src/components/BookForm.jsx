import { Button, Form, FormField, TextArea, TextInput } from 'grommet'
import React, { useContext, useEffect } from 'react'
import { ClubContext } from '../context/ClubContext'
import { UserContext } from '../context/UserContext'

function BookForm({setErrors, collection, setCollection, source, formData, setFormData, bookForm}) {
  const emptyForm = { title: '', author: '', pages: '', genre:'', coverPicture:'', description:''}
  const {user} = useContext(UserContext)
  const {club} = useContext(ClubContext)

  useEffect(() => {
    bookForm.current = document.getElementById('bookform')
  }, [])

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  async function submitHandler(e) {
    e.preventDefault()
    const resp = await fetch('/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.title,
        author: formData.author,
        pages: parseInt(formData.pages),
        genre: formData.genre,
        cover_picture: formData.coverPicture,
        description: formData.description,
      })
    })
    const data = await resp.json()
    if (resp.ok){
      setFormData(emptyForm)
      setCollection({...collection, books:[...collection.books, data]})
      // replace this with setState to pass to parent to display after creation
      collectionLinker(data.id, source)
      setErrors({errors:['Success!']})
    } else {
      setErrors(data)
    }
    //passing user into context, which goes up to App state
  }

  async function collectionLinker(bookID, destination){
    let endpoint
    if (destination === 'user') {
      endpoint = '/collections'
    } else {
      endpoint = '/club_books'
    }

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        club_id: club.id,
        book_id: bookID,
        status: 'unread'
        //^ have to add input for this
      })
    })
    const data = await resp.json()
    console.log(data)
    if (resp.ok){
      setErrors({errors:['Success!']})
    } else {
      setErrors(data)
    }
  }

  return (
    <div>
      <h3>Manually Add a Book</h3>
      <Form onSubmit={submitHandler} id='bookform' className='flex-form'>
        <FormField label='Title'>
          <TextInput type="text" id="title" value={formData.title} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Author'>
          <TextInput type="text" id="author" value={formData.author} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Genre'>
          <TextInput type="text" id="genre" value={formData.genre} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Description'>
          <TextArea id="description" value={formData.description} onChange={inputHandler}></TextArea>
        </FormField>

        <FormField label='Pages'>
          <TextInput type="number" id="pages" value={formData.pages} onChange={inputHandler}></TextInput>
        </FormField>

        <FormField label='Cover Picture'>
          <TextInput type="text" id="coverPicture" value={formData.coverPicture} onChange={inputHandler}></TextInput>
        </FormField>
        
        <Button primary type='submit' label='Submit'/>
      </Form>
    </div>
  )
}


export default BookForm