import React from 'react'
import WikiTile from './WikiTile'

function WikiGrid({bookSelection}) {
  console.log(bookSelection)
  return (
    <div className='tileGrid'>
      {bookSelection.length > 0 ? bookSelection.map(element => <WikiTile element={element} key={element.id}/>) : <h3>No entries here yet!</h3>}
    </div>
  )
}

export default WikiGrid