import { Button } from 'grommet'
import React from 'react'

function WikiEditButton({editToggle, setEditToggle}) {
  return (
    <Button label={editToggle ? 'Back' : 'Edit'} primary color='status-warning' size='xsmall' margin={{top:'small', bottom:'none'}}
    onClick={()=>setEditToggle(!editToggle)}/>
  )
}

export default WikiEditButton