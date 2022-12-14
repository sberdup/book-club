import { Button, Card, CardFooter, Heading, Image, Paragraph, Box } from 'grommet'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useErrors from '../functions/useErrors'
import BookRemoveButton from '../subcomponents/BookRemoveButton'

function BookTile({ source, book, setFormData, bookForm }) {
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [errors, setErrors] = useErrors()

  function bookClickHandler(book) {
    setFormData({ title: book.title, author: book.authors.join(), pages: book.pageCount, genre: book.categories.join(), coverPicture: book.thumbnail, description: book.description })
    window.scrollTo(0, 0)
    setTimeout(() => bookForm.current.requestSubmit(), 100)
  }

  return (
    <>
      {source === 'search' ?
        (<Card align='center' justify='center' background='accent-2' flex={true} width={{ min: 'medium' }}>
          {book.title ? <Heading margin={{ top: 'small', bottom: 'large' }}>{book.title}</Heading> : null}
          {book.thumbnail ? <Image alt='book cover' src={book.thumbnail} /> : null}
          {book.authors ? (book.authors.length > 1 ? <p>Author: {book.authors.join()}</p> : <p>Authors: {book.authors[0]}</p>) : null}
          {book.categories ? (book.categories.length > 1 ? <p>Genres: {book.categories.join()}</p> : <p>Genre: {book.categories[0]}</p>) : null}
          {book.description ? <p>Description: {book.description}</p> : null}
          {book.pages ? <p>Pages: {book.pageCount}</p> : null}
          <CardFooter margin={{ top: 'large', bottom: 'small' }}>
            {((book.title && book.authors) && (book.description && book.pageCount)) ? <Button primary color='accent-3' label='Add to Current Collection' onClick={() => bookClickHandler(book)} /> : null}
          </CardFooter>
        </Card>)
        :
        (<Card align='center' justify='center' background='accent-2' width={{ min: 'medium' }} >
          <Heading level={3} margin={{ top: 'small', bottom: 'large' }}>{book.title}</Heading>
          <Box height="small" width="small">
            <Image src={`${book.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/depositphotos_63590137-stock-illustration-blue-book-logo-vector_xkPW5oumg.jpg' />
            <Paragraph>By: {book.author.split(',').join(', ')}</Paragraph>
          </Box>
          <CardFooter margin={{ top: 'large', bottom: 'small' }}>
            <Link to={`/books/${book.id}`}>Book Page</Link>
          </CardFooter>
            {source === 'user' ? <BookRemoveButton deleteToggle={deleteToggle} setDeleteToggle={setDeleteToggle} errorHandler={setErrors} bookID={book.id} /> : null}
        </Card>)
      }
    </>
  )
}

export default BookTile