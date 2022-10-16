import { Button, Form, FormField, TextInput } from 'grommet'
import React, { useState } from 'react'
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
    //   console.log(data)
      if (resp.ok){
        setFormData(emptyForm)
        setBookResults(data)
        setErrors({errors:[]})
      } else {
        // console.log(data.error)
        setErrors({errors: [data.error.errors[0].message]})
      }
    }
  
    return (
      <div>
        <h3>Search</h3>
        <Form onSubmit={submitHandler} className='flex-form'>
          <FormField label='Title'>
            <TextInput type="text" id="title" value={formData.title} onChange={inputHandler}></TextInput>
          </FormField>
          <FormField label='Author'>
            <TextInput type="text" id="author" value={formData.author} onChange={inputHandler}></TextInput>
          </FormField>
          <FormField label='Keywords'>
            <TextInput type="text" id="keywords" value={formData.keywords} onChange={inputHandler}></TextInput>
          </FormField>
          <Button primary color='orange-1' type='submit' label='Search'/>
        </Form>
      </div>
    )
  }

export default BookSearch