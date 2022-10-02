import React from 'react'
import WikiTile from './WikiTile'

function WikiGrid({bookSelection}) {
  console.log(bookSelection)
  return (
    <div className='tileGrid'>
      {bookSelection.map(element => <WikiTile element={element} key={element.id}/>)}
    </div>
  )
}

export default WikiGrid