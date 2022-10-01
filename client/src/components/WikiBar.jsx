import React from 'react'

function WikiBar() {
  const categories = ['book_elements', 'characters', "eras", "events", "groups", "items", "locations", "quotes", "storylines", "themes"]
  const displayNames = ['Misc', 'Characters', "Times", "Events", "Groups", "Objects", "Places", "Quotes", "Storylines", "Themes"]

  function clickFilterHandler() {
    setActiveFilter(this.name)
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