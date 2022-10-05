import React, { useContext, useState } from 'react'
const api_key = process.env.REACT_APP_GBOOKS_API_KEY

function BookSearch({collection, setCollection, errors, setErrors}) {
    const emptyForm = { title: '', author: '', keywords:''}
    const [formData, setFormData] = useState(emptyForm)

    const author = (formData.author === '' ? '' : `+inauthor:${formData.author.split(' ').join(' ', '+')}`)
    const title = (formData.title === '' ? '' : `+intitle:${formData.title.split(' ').join(' ', '+')}`)
    const keywords = (formData.keywords === '' ? '' : `${formData.keywords.split(' ').join(' ', '+')}`)
    const fields = '&fields=items/volumeInfo(authors,categories,description,imageLinks/thumbnail,pageCount,title)'
    function inputHandler(e) {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  
    async function submitHandler(e) {
      e.preventDefault()
      const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keywords}${author}${title}${fields}&key=${api_key}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await resp.json()
      console.log(data)
      if (resp.ok){
        setFormData(emptyForm)
        setCollection({books:[data]})
        // replace this with setState to pass to parent to display after creation
        setErrors({errors:[]})
      } else {
        console.log(data.error.errors)
        setErrors(data.error.errors)
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
        <h3>Search via Google Books API!</h3>
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
            <label htmlFor="keywords">Keywords: </label>
            <input type="text" id="keywords" value={formData.keywords} onChange={inputHandler}></input>
          </div>
          <input type='submit' />
        </form>
      </div>
    )
  }

export default BookSearch