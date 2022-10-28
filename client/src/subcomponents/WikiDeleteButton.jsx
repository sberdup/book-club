import { Button } from 'grommet'
import React from 'react'

function WikiDeleteButton({element}) {
    function deleteHandler(){
        console.log(element)
    }
  return (
    <Button primary color='status-critical' size='xsmall' margin={{top:'small', bottom:'none'}} label='Delete' onClick={deleteHandler}/>
  )
}

export default WikiDeleteButton