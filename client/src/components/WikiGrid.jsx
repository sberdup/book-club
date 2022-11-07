import { Grid } from 'grommet'
import React from 'react'
import WikiTile from './WikiTile'
import NewWikiTile from './NewWikiTile'

function WikiGrid({bookSelection, category}) {
  return (
    <Grid columns={{count:'fit', size:'medium'}} gap='medium' margin='small' justify='center'>
      <NewWikiTile category={category}/>
      {bookSelection.length > 0 ? bookSelection.map(element => <WikiTile category={category} element={element} key={element.id}/>) : null}
    </Grid>
  )
}

export default WikiGrid