import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import BookTile from './BookTile'

function BookGrid() {
  const { user } = useContext(UserContext)
// pulling in data from user which includes books in user's collection
  return (
    <div>
      {user.books.map(book => <BookTile key={book.id} book={book} />)}
    </div>
  )
}

export default BookGrid