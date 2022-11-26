import { Button, Form, FormField, TextInput, Box } from 'grommet'
import React, { useState } from 'react'
import { fetchGetter } from '../functions/commonFunctions'
const api_key = process.env.REACT_APP_GBOOKS_API_KEY

function BookSearch({setBookResults, setErrors, searchToggle}) {
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
      const fetch = await fetchGetter(`https://www.googleapis.com/books/v1/volumes?q=${keywords}${author}${title}${fields}&key=${api_key}`)
      if (fetch.resp.ok){
        setFormData(emptyForm)
        setBookResults(fetch.data)
      } else {
        setErrors({errors: [fetch.data.error.errors[0].message]})
      }
    }
    const hiddenStyle = (searchToggle ? {} : {display:'none'})

    return (
      <Box style={hiddenStyle} width={{max:'50vw'}} alignSelf='center' fill>
        <Form onSubmit={submitHandler}>
          <FormField label='Title'>
            <TextInput textAlign='center' type="text" id="title" value={formData.title} onChange={inputHandler}></TextInput>
          </FormField>
          <FormField label='Author'>
            <TextInput textAlign='center' type="text" id="author" value={formData.author} onChange={inputHandler}></TextInput>
          </FormField>
          <FormField label='Keywords'>
            <TextInput textAlign='center' type="text" id="keywords" value={formData.keywords} onChange={inputHandler}></TextInput>
          </FormField>
          <Button margin={{top:'small'}} style={{maxWidth:'65%'}} primary color='accent-1' type='submit' label='Search' fill/>
        </Form>
      </Box>
    )
  }

export default BookSearch