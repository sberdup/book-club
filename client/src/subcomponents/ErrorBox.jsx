import { Box } from 'grommet'
import React from 'react'

function ErrorBox() {
  return (
    <Box className='errorBox fade' id={`wikiErrorBox${element.id}`}>
        {errors.length === 0 ? null : errors.errors.map(e => <p key={e}>{`${e}`}</p>)}
      </Box>
  )
}

export default ErrorBox