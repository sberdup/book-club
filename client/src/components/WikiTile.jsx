import { Card, CardFooter } from 'grommet'
import WikiDeleteButton from '../subcomponents/WikiDeleteButton'
import React, {useState} from 'react'
import WikiEditButton from '../subcomponents/WikiEditButton'

function WikiTile({ element, category }) {

  const [editToggle, setEditToggle] = useState(false)

  function objectToKeys(object) {
    const elKeys = Object.keys(object)
    console.log(element, elKeys)
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
      <CardFooter >
        <WikiEditButton element={element} category={category} editToggle={editToggle} setEditToggle={setEditToggle}/>
        <WikiDeleteButton element={element} category={category}/>
      </CardFooter>
    </Card>
  )
}

export default WikiTile