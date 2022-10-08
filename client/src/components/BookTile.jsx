import React from 'react'
import { Link } from 'react-router-dom'

function BookTile({ source, book }) {
  // let volumeInfo, authors, categories, description, pageCount, title, imageLinks, thumbnail 
  // if (source === 'search'){
  //   ({volumeInfo:{authors, categories, description, pageCount, title, imageLinks:{thumbnail}}} = book)
  // }

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