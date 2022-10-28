import { Card, CardFooter } from 'grommet'
import WikiDeleteButton from '../subcomponents/WikiDeleteButton'
import React from 'react'

function WikiTile({ element }) {

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
            <h5 style={{margin:0}}>{key.charAt(0).toUpperCase() + key.slice(1) + ': ' + element[key]}</h5>
        )
      default:
        return (
          <>
            <h4 style={{margin:0}}>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p style={{marginTop:0, marginBottom:'10px'}}>{element[key]}</p>
          </>
        )
    }
  }

  const elementMap = objectToKeys(element).map((key, idx) => {
    let jsx = propertyToJSX(key, element)
    return (
      <div key={idx} style={{marginRight:'20px', marginLeft:'20px'}}>
        {jsx}
      </div>
    )
  })

  return (
    <Card width={{max:'large'}} height={{min:'small'}} background='accent-5'>
      {elementMap}
      <CardFooter justify='center'>
        <WikiDeleteButton element={element}/>
      </CardFooter>
    </Card>
  )
}

export default WikiTile