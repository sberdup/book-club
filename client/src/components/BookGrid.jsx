import { Button, Grid } from 'grommet'
import React, { useContext, useState, useRef } from 'react'
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
  const [bookResults, setBookResults] = useState({ items: [] })

  const [formData, setFormData] = useState({ title: '', author: '', pages: '', genre: '', coverPicture: '', description: '' })
  // lifted state from BookForm
  const bookForm = useRef(null)

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
  //  determining if collections originates from club or user, prop from App.js level
  // } 

  // vvv This will only fill in the returned fields from the search data and pass along everything else as false to BookTile so it doesn't break
  function searchDataPopulator(bookData) {
    const standardReturn = { authors: false, categories: false, description: false, pageCount: false, title: false, thumbnail: false }

    const volumeData = Object.keys(bookData.volumeInfo)
    volumeData.forEach(key => {
      if (key === 'imageLinks') {
        standardReturn.thumbnail = bookData.volumeInfo.imageLinks.thumbnail
      } else {
        standardReturn[key] = bookData.volumeInfo[key]
      }
    })
    return standardReturn
  }


  return (
    <>
      <Button margin={{top:'small'}} onClick={() => setFormToggle(!formToggle)} label={(formToggle) ? 'Hide Book Form' : 'Add Book'}/>
      {(formToggle) ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BookForm setErrors={setErrors} setCollection={setCollection} collection={collection} source={source} formData={formData} setFormData={setFormData} bookForm={bookForm}/>
          <h2 style={{ padding: '5%' }}> OR </h2>
          <BookSearch setBookResults={setBookResults} setErrors={setErrors} />
        </div>
        : null}

      {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}

      {formToggle ? <h2>Book Results</h2> : ((source === 'user') ? <h2>Your Books</h2> : <h2>Book Collection</h2>)}

      <Grid columns={{count:'fit', size:'medium'}} rows={{count:'fit', size:[['small', 'xlarge']]}} gap='medium' border={true}  alignContent='center' margin='small' pad='small'>
        {
          (formToggle && (bookResults.items !== undefined)) ? bookResults.items.map((item, idx) => <BookTile key={idx} book={searchDataPopulator(item)} source={'search'} setFormData={setFormData} bookForm={bookForm}/>)
            :

            (((collection.books === undefined) || formToggle) ? null
              :
              collection.books.map(book => <BookTile key={book.id} book={book} source={'collection'} />))
        }
      </Grid>
    </>
  )
}

export default BookGrid