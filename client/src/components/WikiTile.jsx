import { Box, Card, CardBody, CardFooter, CardHeader, Heading, Paragraph, Text } from 'grommet'
import WikiDeleteButton from '../subcomponents/WikiDeleteButton'
import React, { useState } from 'react'
import WikiEditButton from '../subcomponents/WikiEditButton'

function WikiTile({ element, category }) {

  const [editToggle, setEditToggle] = useState(false)

  function objectToKeys(object) {
    const elKeys = Object.keys(object)
    return elKeys
  }
  function propertyToJSX(key, element) {
    if (key === 'id' || element[key] === null || element[key] === '') {
      return <span style={{ display: 'none' }}></span>
    }
    // Not displaying ID or fields with no information
    switch (key) {
      case 'chapter':
      case 'page':
        return (
          <h5 style={{ margin: 0 }}>{key.charAt(0).toUpperCase() + key.slice(1) + ': ' + element[key]}</h5>
        )
      default:
        return (
          <>
            <h4 style={{ margin: 0 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p style={{ marginTop: 0, marginBottom: '10px' }}>{element[key]}</p>
          </>
        )
    }
  }

  const elementMap = objectToKeys(element).map((key, idx) => {
    let jsx = propertyToJSX(key, element)
    return (
      <div key={idx} style={{ marginRight: '20px', marginLeft: '20px' }}>
        {jsx}
      </div>
    )
  })


  return (
    <Card width={{ max: 'large' }} height={{ min: 'small' }} background='accent-5'>
      {/* {elementMap} */}
      <CardHeader justify='center' >
        {element?.name ? <Text margin='small' >{element.name}</Text> : null}
        {element?.body ? <Text margin='medium' >{element.body}</Text> : null}
      </CardHeader>

      <CardBody justify='around'>
        {element?.description ? <Text>{element.description}</Text> : null}
        {element?.aliases ? <Text>{element.aliases}</Text> : null}
        {element?.time ? <Text>{element.time}</Text> : null}
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