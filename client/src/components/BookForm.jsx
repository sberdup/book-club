import React, { useState, useContext } from 'react'
import { ClubContext } from '../context/ClubContext'
import { UserContext } from '../context/UserContext'

function BookForm({setErrors, collection, setCollection, source}) {
  const emptyForm = { title: '', author: '', pages: '', genre:'', coverPicture:'', description:''}
  const [formData, setFormData] = useState(emptyForm)
  const {user} = useContext(UserContext)
  const {club} = useContext(ClubContext)

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
    console.log(data)
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
      <h3>Add a book to this collection!</h3>
      <form onSubmit={submitHandler} className='basicborder'>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={formData.title} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input type="text" id="author" value={formData.author} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="genre">Genre: </label>
          <input type="text" id="genre" value={formData.genre} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input type="text" id="description" value={formData.description} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="pages">Pages: </label>
          <input type="number" id="pages" value={formData.pages} onChange={inputHandler}></input>
        </div>
        <div>
          <label htmlFor="coverPicture">Cover Picture: </label>
          <input type="text" id="coverPicture" value={formData.coverPicture} onChange={inputHandler}></input>
        </div>
        <input type='submit' />
      </form>
    </div>
  )
}


export default BookForm