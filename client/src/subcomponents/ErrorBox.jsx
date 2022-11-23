import { Box } from 'grommet'
import React from 'react'

function ErrorBox({ errorObject:{className, list} }) {
  // uses errorObject values from useErrors custom hook, affixes to element with 'zFloor' class name
  return (
    <Box className={className}>
      {list.length === 0 ? null : list.errors.map(e => <p key={e}>{`${e}`}</p>)}
    </Box>
  )
}

export default ErrorBox