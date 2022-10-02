import React from 'react'

function WikiBar({setCategoryFilter}) {
  const categories = ['book_elements', 'characters', "eras", "events", "groups", "items", "locations", "quotes", "storylines", "themes"]
  const displayNames = ['Misc', 'Characters', "Times", "Events", "Groups", "Objects", "Places", "Quotes", "Storylines", "Themes"]

  function clickFilterHandler(e) {
    setCategoryFilter(e.target.name)
  }

  return (
    <div widths={categories.length}>
      {categories.map((category, idx) => (
        <button key={category} name={category} onClick={clickFilterHandler}>
          {displayNames[idx]}
        </button>
      ))}
    </div>
  )
}

export default WikiBar