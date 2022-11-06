import { Box, Card, CardBody, CardFooter, CardHeader, FormField, TextInput, Paragraph, Text, TextArea, Button } from 'grommet'
import WikiDeleteButton from '../subcomponents/WikiDeleteButton'
import React, { useState } from 'react'
import WikiEditButton from '../subcomponents/WikiEditButton'
import { useContext } from 'react'
import { BookContext } from '../context/BookContext'

function WikiTile({ element, category }) {
  const {book, setBook} = useContext(BookContext)
  const [errors, setErrors] = useState([])
  const [editToggle, setEditToggle] = useState(false)
  const [formData, setFormData] = useState({
    name: element.name, description: element.description, aliases: element.aliases
    , time: element.time, location: element.location, chapter: element.chapter, page: element.page, body: element.body
  })

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  async function submitHandler() {
    const resp = await fetch(`/${category}/${element.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        aliases: formData.aliases,
        time: formData.time,
        location: formData.location,
        body: formData.body,
        chapter: parseInt(formData.chapter),
        page: parseInt(formData.page)
      })
    })
    const data = await resp.json()
    if (resp.ok) {
      setBook({...book,
        [category]: [...book[category]].map(bookPart => {
          if (bookPart.id === data.id) {
            return data
          }
          return bookPart
        })
      })
      setErrors({ errors: ['Success!'] })
      setEditToggle(false)
    } else {
      setErrors(data)
    }
  }

  return (
    <Card width={{ max: 'large' }} height={{ min: 'small' }} background='accent-5' flex>
      {/* {elementMap} */}
      <CardHeader justify='center' >
        {element.name !== undefined ?
          (editToggle ?
            <FormField label='Name'>
              <TextInput textAlign='center' type="text" id="name" value={formData.name} onChange={inputHandler}/>
            </FormField>
            : <Text margin='small' >{element.name}</Text>
          ) : null
        }
        {element.body !== undefined ?
          (editToggle ?
            <FormField label='Body'>
              <TextArea id="body" value={formData.body} onChange={inputHandler}/>
            </FormField>
            : <Text margin='medium' >{element.body}</Text>
          ) : null
        }
      </CardHeader>

      <CardBody justify='around'>
        {element.description !== undefined ?
          (editToggle ?
            <FormField label='Description'>
              <TextArea id="description" value={formData.description} onChange={inputHandler}/>
            </FormField>
            : <Text>{element.description}</Text>
          ) : null
        }
        {element.aliases !== undefined ?
          (editToggle ?
            <FormField label='Aliases'>
              <TextInput textAlign='center' type="text" id="aliases" value={formData.aliases} onChange={inputHandler}/>
            </FormField>
            : <Text>{element.aliases}</Text>
          ) : null
        }
        {element.time !== undefined ?
          (editToggle ?
            <FormField label='Time'>
              <input type="datetime-local" id="time" value={formData.time} onChange={inputHandler}></input>
            </FormField>
            : <Text>{element.time}</Text>
          ) : null
        }
        {element.location !== undefined ?
          (editToggle ?
            <FormField label='Location'>
              <TextInput textAlign='center' type="text" id="location" value={formData.location} onChange={inputHandler}/>
            </FormField>
            : <Text>{element.location}</Text>
          ) : null
        }

        <Box direction='row' justify='around'>
          {element.chapter !== undefined ?
            (editToggle ?
              <FormField label='Chapter'>
                <TextInput textAlign='center' type="number" id="chapter" value={formData.chapter} onChange={inputHandler}/>
              </FormField>
              : <Paragraph size='small' margin='none'>{`Chapter: ${element.chapter}`}</Paragraph>
            ) : null
          }
          {element.page !== undefined ?
            (editToggle ?
              <FormField label='Page'>
                <TextInput textAlign='center' type="number" id="page" value={formData.page} onChange={inputHandler}/>
              </FormField>
              : <Paragraph size='small' margin='none'>{`Page: ${element.page}`}</Paragraph>
            ) : null
          }
        </Box>
      </CardBody>

      <CardFooter>
        <WikiEditButton editToggle={editToggle} setEditToggle={setEditToggle} />

          {category !== 'book_elements' ?
            <Paragraph size='small'>{category.charAt(0).toUpperCase() + category.slice(1, -1)}</Paragraph>
            : <Paragraph size='small'>Misc</Paragraph>}
        
        {editToggle ? <Button onClick={submitHandler} primary size='xsmall' label='Submit' margin='xsmall'/> 
        :<WikiDeleteButton element={element} category={category} />}
      </CardFooter>
    </Card>
  )
}

export default WikiTile