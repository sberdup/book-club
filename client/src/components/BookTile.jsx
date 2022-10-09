import React from 'react'
import { Link } from 'react-router-dom'

function BookTile({ source, book, setFormData, bookForm }) {

  function bookClickHandler(book) {
    setFormData({ title: book.title, author: book.authors.join(), pages: book.pageCount, genre: book.categories.join(), coverPicture: book.thumbnail, description: book.description})
    window.scrollTo(0, 0)
    setTimeout(() => bookForm.current.requestSubmit(), 100)
  }

  return (
    <>
      {source === 'search' ?
        (<div>
          {book.title ? <h4>{book.title}</h4> : null}
          {book.thumbnail ? <img alt='book cover' src={book.thumbnail} /> : null}
          {book.authors ? (book.authors.length > 1 ? <li>Author: {book.authors.join()}</li> : <li>Authors: {book.authors[0]}</li>) : null}
          {book.categories ? (book.categories.length > 1 ? <li>Genres: {book.categories.join()}</li> : <li>Genre: {book.categories[0]}</li>) : null}
          {book.description ? <li>Description: {book.description}</li> : null}
          {book.pages ? <li>Pages: {book.pageCount}</li> : null}
          {((book.title && book.authors) && (book.description && book.pageCount)) ? <button onClick={() => bookClickHandler(book)}>Add to Current Collection</button> : null}
        </div>)
        :
        (<div>
          <h4>{book.title}</h4>
          <li>{book.author}</li>
          <Link to={`/books/${book.id}`}>Book Page</Link>
        </div>)
      }
    </>
  )
}

export default BookTile