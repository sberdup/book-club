import React, { useContext, useState } from 'react'
const api_key = process.env.REACT_APP_GBOOKS_API_KEY

function BookSearch({setBookResults, setErrors}) {
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
        setBookResults(data)
        setErrors({errors:[]})
      } else {
        console.log(data.error)
        setErrors(data.error)
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