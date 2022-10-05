import React, { useContext, useState } from 'react'
import { ClubContext } from '../context/ClubContext'
import { UserContext } from '../context/UserContext'
import BookForm from './BookForm'
import BookSearch from './BookSearch'
import BookTile from './BookTile'

function BookGrid({ source }) {
  const { user, setUser } = useContext(UserContext)
  const { club, setClub } = useContext(ClubContext)
  // pulling in data from user which includes books in user's collection
  //also getting club
  const [errors, setErrors] = useState([])
  const [formToggle, setFormToggle] = useState(false)
  const [bookResults, setBookResults] = useState({items:[]})

  let collection
  let setCollection
  // if (!formToggle) {
    // ^^^ Doing this makes it impossible to load the collection data from user/club fast enough to avoid null.map
    if (source === 'user') {
      collection = user
      setCollection = setUser
    }
    else if (source === 'club') {
      collection = club
      setCollection = setClub
    }
  // } 

  //  determining if collections originates from club or user, prop from App.js level
  return (
    <>
      <button onClick={() => setFormToggle(!formToggle)}>{(formToggle) ? 'Hide Book Form' : 'Add Book'}</button>
      {(formToggle) ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BookForm setErrors={setErrors} setCollection={setCollection} collection={collection} source={source} />
          <h2 style={{padding:'5%'}}> OR </h2>
          <BookSearch setBookResults={setBookResults} setErrors={setErrors}/>
        </div>
        : null}

      {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}

      {formToggle ? <h2>Book Results</h2> : ((source === 'user') ? <h2>Your Books</h2> : <h2>Book Collection</h2>)}

      <div className="tileGrid">
        {
        (formToggle && (bookResults.items.length !== 0)) ? bookResults.items.map((item, idx) => <BookTile key={idx} book={item} source={'search'}/>)
        :

        (((collection.books.length === 0) || formToggle) ? null 
        : 
        collection.books.map(book => <BookTile key={book.id} book={book} source={'collection'}/>))
        }
      </div>
    </>
  )
}

export default BookGrid