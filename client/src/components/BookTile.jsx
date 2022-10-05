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
          {book.volumeInfo.imageLinks !== undefined ? <img src={book.volumeInfo.imageLinks.thumbnail} /> : null}
          <h4>{book.volumeInfo.title}</h4>
          {book.volumeInfo.authors.length > 1 ? <li>Author: {book.volumeInfo.authors.join()}</li> : <li>Authors: {book.volumeInfo.authors[0]}</li>}
          {(book.volumeInfo.categories === undefined) ? null
            : (book.volumeInfo.categories.length > 1 ? <li>Genres: {book.volumeInfo.categories.join()}</li>
              : <li>Genre: {book.volumeInfo.categories[0]}</li>)}
          <li>Description: {book.volumeInfo.description}</li>
          <li>Pages: {book.volumeInfo.pageCount}</li>
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