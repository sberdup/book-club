import { Grid } from 'grommet'
import React from 'react'
import WikiTile from './WikiTile'

function WikiGrid({bookSelection}) {
  return (
    <Grid columns={{count:'fill', size:'medium'}} rows='medium' gap='medium' border={true}  alignContent='center' margin='small' pad='small'>
      {bookSelection.length > 0 ? bookSelection.map(element => <WikiTile element={element} key={element.id}/>) : <h3>No entries here yet!</h3>}
    </Grid>
  )
}

export default WikiGrid