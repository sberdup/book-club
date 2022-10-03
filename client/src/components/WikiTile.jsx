import React from 'react'

function WikiTile({ element }) {

  function objectToKeys(object) {
    const elKeys = Object.keys(object)
    return elKeys
  }
  function propertyToJSX(key, element) {
    if (key === 'id' || element[key] === null) {
      return <span style={{ display: 'none' }}></span>
    }
    // Not displaying ID or fields with no information
    switch (key) {
      case 'chapter':
      case 'page':
        return (
            <h6>{key.charAt(0).toUpperCase() + key.slice(1) + ': ' + element[key]}</h6>
        )
      default:
        return (
          <>
            <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p>{element[key]}</p>
          </>
        )
    }

  }

  const elementMap = objectToKeys(element).map((key, idx) => {
    let jsx = propertyToJSX(key, element)
    return (
      <div key={idx}>
        {jsx}
      </div>
    )
  })

  return (
    <div>
      {elementMap}
    </div>
  )
}

export default WikiTile