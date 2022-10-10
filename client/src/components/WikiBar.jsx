import { Box, Button } from 'grommet'
import React from 'react'

function WikiBar({setCategoryFilter}) {
  const categories = ['book_elements', 'characters', "eras", "events", "groups", "items", "locations", "quotes", "storylines", "themes"]
  const displayNames = ['Misc', 'Characters', "Times", "Events", "Groups", "Objects", "Places", "Quotes", "Storylines", "Themes"]
  const buttonColors = ['gray-1', 'red-1', 'yellow-1', 'green-1', 'red-1', 'cyan-1', 'blue-1', 'purple-1', 'orange-1', 'light-1']

  function clickFilterHandler(e) {
    setCategoryFilter(e.target.name)
  }

  return (
    <Box direction='row' justify='center' wrap={true}>
      {categories.map((category, idx) => (
        <Button primary color={buttonColors[idx]} key={category} name={category} onClick={clickFilterHandler} label={displayNames[idx]} />
      ))}
    </Box>
  )
}

export default WikiBar