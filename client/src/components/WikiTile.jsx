import { Box, Card, CardBody, CardFooter, CardHeader, FormField, TextInput, Paragraph, Text } from 'grommet'
import WikiDeleteButton from '../subcomponents/WikiDeleteButton'
import React, { useState } from 'react'
import WikiEditButton from '../subcomponents/WikiEditButton'

function WikiTile({ element, category }) {

  const [editToggle, setEditToggle] = useState(false)
  const [formData, setFormData] = useState({
    name: element.name, description: element.description, aliases: element.aliases
    , time: element.time, location: element.location, chapter: element.chapter, page: element.page, body: element.body
  })

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <Card width={{ max: 'large' }} height={{ min: 'small' }} background='accent-5'>
      {/* {elementMap} */}
      <CardHeader justify='center' >
        {element.name !== undefined ?
          (editToggle ?
            <FormField label='Name'>
              <TextInput textAlign='center' type="text" id="name" value={formData.name} onChange={inputHandler}></TextInput>
            </FormField>
            : <Text margin='small' >{element.name}</Text>
          ) : null
        }
        {element.body !== undefined ?
          (editToggle ?
            <FormField label='Body'>
              <TextInput textAlign='center' type="text" id="body" value={formData.body} onChange={inputHandler}></TextInput>
            </FormField>
            : <Text margin='medium' >{element.body}</Text>
          ) : null
        }
      </CardHeader>

      <CardBody justify='around'>
        {element.description !== undefined ?
          (editToggle ?
            <FormField label='Description'>
              <TextInput textAlign='center' type="text" id="description" value={formData.description} onChange={inputHandler}></TextInput>
            </FormField>
            : <Text>{element.description}</Text>
          ) : null
        }
        {element.aliases !== undefined ?
          (editToggle ?
            <FormField label='Aliases'>
              <TextInput textAlign='center' type="text" id="aliases" value={formData.aliases} onChange={inputHandler}></TextInput>
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
              <TextInput textAlign='center' type="text" id="location" value={formData.location} onChange={inputHandler}></TextInput>
            </FormField>
            : <Text>{element.location}</Text>
          ) : null
        }

        <Box direction='row' justify='around'>
          {element?.chapter ? <Paragraph size='small' margin='none'>{`Chapter: ${element.chapter}`}</Paragraph> : null}
          {element.chapter !== undefined ?
            (editToggle ?
              <FormField label='Chapter'>
                <TextInput textAlign='center' type="number" id="chapter" value={formData.chapter} onChange={inputHandler}></TextInput>
              </FormField>
              : <Paragraph size='small' margin='none'>{`Chapter: ${element.chapter}`}</Paragraph>
            ) : null
          }
          {element.page !== undefined ?
            (editToggle ?
              <FormField label='Page'>
                <TextInput textAlign='center' type="number" id="page" value={formData.page} onChange={inputHandler}></TextInput>
              </FormField>
              : <Paragraph size='small' margin='none'>{`Page: ${element.page}`}</Paragraph>
            ) : null
          }
        </Box>
      </CardBody>

      <CardFooter >
        <WikiEditButton element={element} category={category} editToggle={editToggle} setEditToggle={setEditToggle} />

        {category !== 'book_elements' ?
          <Paragraph size='small'>{category.charAt(0).toUpperCase() + category.slice(1, -1)}</Paragraph>
          : <Paragraph size='small'>Misc</Paragraph>
        }
        <WikiDeleteButton element={element} category={category} />
      </CardFooter>
    </Card>
  )
}

export default WikiTile