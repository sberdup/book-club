import React from 'react'

function WikiTile({ element }) {

  function objectToKeys(object) {
    const elKeys = Object.keys(object)
    console.log(elKeys)
    return elKeys
  }
  function propertyToJSX(key, element) {
    return (
      <>
        <h4>{key}</h4>
        <li>{element[key]}</li>
      </>
    )
  }

  const elementMap = objectToKeys(element).map((key) => {
    let jsx = propertyToJSX(key, element)
    return (
      <>
        {jsx}
      </>
    )
  })

  return (
    <div>
      {elementMap}
    </div>
  )
}

export default WikiTile