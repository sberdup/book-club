import { Box, Button } from 'grommet'
import React from 'react'

function WikiBar({setCategoryFilter}) {
  const categories = ['book_elements', 'characters', "eras", "events", "groups", "items", "locations", "quotes", "storylines", "themes"]
  const displayNames = ['Misc', 'Characters', "Times", "Events", "Groups", "Objects", "Places", "Quotes", "Storylines", "Themes"]
  const buttonColors = ['dark-3', 'accent-6', 'accent-5', 'accent-1', 'neutral-3', 'accent-4', 'neutral-4', 'accent-2', 'accent-3', 'light-1']

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