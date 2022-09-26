import React from 'react'
import { Link } from 'react-router-dom'

function BookTile({book}) {
  return (
    <div>
        <h4>{book.title}</h4>
        <li>{book.author}</li>
        <Link to={`/books/${book.id}`}>Book Page</Link>
    </div>
  )
}

export default BookTile