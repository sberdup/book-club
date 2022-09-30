import React, { useContext } from 'react'
import { ClubContext } from '../context/ClubContext'
import { UserContext } from '../context/UserContext'
import BookTile from './BookTile'

function BookGrid({type}) {
  const { user } = useContext(UserContext)
  const { club } = useContext(ClubContext)
  // pulling in data from user which includes books in user's collection
  //also getting club
  let collection
  
 if (type === 'user') {
  collection = user
 }
 else if (type === 'club') {
  collection = club
 }
//  determining if collections originates from club or user

  return (
    <div>
      {(type === 'user') ? <h2>Your Books</h2> : <h2>Book Collection</h2>}
      {collection.books.map(book => <BookTile key={book.id} book={book} />)}
    </div>
  )
}

export default BookGrid