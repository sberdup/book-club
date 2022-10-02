import React, { useContext, useState } from 'react'
import { ClubContext } from '../context/ClubContext'
import { UserContext } from '../context/UserContext'
import BookForm from './BookForm'
import BookTile from './BookTile'

function BookGrid({ type }) {
  const { user } = useContext(UserContext)
  const { club } = useContext(ClubContext)
  // pulling in data from user which includes books in user's collection
  //also getting club
  const [errors, setErrors] = useState([])
  const [formToggle, setFormToggle] = useState(false)

  let collection

  if (type === 'user') {
    collection = user
  }
  else if (type === 'club') {
    collection = club
  }
  //  determining if collections originates from club or user

  return (
    <>
      <button onClick={() => setFormToggle(!formToggle)}>{(formToggle) ? 'Hide Book Form' : 'Add Book'}</button>
      {(formToggle) ? <BookForm setErrors={setErrors}/> : null}
      {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}

      {(type === 'user') ? <h2>Your Books</h2> : <h2>Book Collection</h2>}
      <div className="tileGrid">
        {collection.books.map(book => <BookTile key={book.id} book={book} />)}
      </div>
    </>
  )
}

export default BookGrid