import { Box, Card, CardBody, CardFooter, CardHeader, FormField, TextInput, Paragraph, Text } from 'grommet'
import WikiDeleteButton from '../subcomponents/WikiDeleteButton'
import React, { useState } from 'react'
import WikiEditButton from '../subcomponents/WikiEditButton'

function WikiTile({ element, category }) {

  const [editToggle, setEditToggle] = useState(false)
  const [formData, setFormData] = useState({
    name: element.name, description: element.description, aliases: element.aliases
    , time: (element.time || ''), location: element.location, chapter: element.chapter, page: element.page, body: element.body
  })

  function inputHandler(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <Card width={{ max: 'large' }} height={{ min: 'small' }} background='accent-5'>
      {/* {elementMap} */}
      <CardHeader justify='center' >
        {element?.name ?
          (editToggle ?
            <FormField label='Name'>
              <TextInput textAlign='center' type="text" id="name" value={formData.name} onChange={inputHandler}></TextInput>
            </FormField>
            : <Text margin='small' >{element.name}</Text>
          ) : null
        }
        {element?.body ? <Text margin='medium' >{element.body}</Text> : null}
      </CardHeader>

      <CardBody justify='around'>
        {element?.description ? <Text>{element.description}</Text> : null}
        {element?.aliases ? <Text>{element.aliases}</Text> : null}
        {element?.time || (element.time === null) ?
          (editToggle ?
            <FormField label='Time'>
              <input type="datetime-local" id="time" value={formData.time} onChange={inputHandler}></input>
            </FormField>
            : <Text>{element.time}</Text>
          ) : null
        }
        {element?.location ? <Text>{element.location}</Text> : null}

        <Box direction='row' justify='around'>
          {element?.chapter ? <Paragraph size='small' margin='none'>{`Chapter: ${element.chapter}`}</Paragraph> : null}
          {element?.page ? <Paragraph size='small' margin='none'>{`Page: ${element.page}`}</Paragraph> : null}
        </Box>
      </CardBody>

      <CardFooter >
        <WikiEditButton element={element} category={category} editToggle={editToggle} setEditToggle={setEditToggle} />

        {category !== 'book_elements' ?
          <Paragraph size='small'>{category.charAt(0).toUpperCase() + category.slice(1, -1)}</Paragraph>
          : <Paragraph size='small'>Misc</Paragraph>}

        <WikiDeleteButton element={element} category={category} />
      </CardFooter>
    </Card>
  )
}

export default WikiTile