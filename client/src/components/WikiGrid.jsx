import { Grid } from 'grommet'
import React from 'react'
import WikiTile from './WikiTile'

function WikiGrid({bookSelection}) {
  return (
    <Grid columns={{count:'fit', size:'medium'}} gap='medium' margin='small' >
      {bookSelection.length > 0 ? bookSelection.map(element => <WikiTile element={element} key={element.id}/>) : <h3 style={{width:'auto', margin:'auto'}}>No entries here yet!</h3>}
    </Grid>
  )
}

export default WikiGrid