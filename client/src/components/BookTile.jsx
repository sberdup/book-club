import { Button, Card, CardFooter, Heading, Image, Paragraph, Box } from 'grommet'
import React from 'react'
import { Link } from 'react-router-dom'

function BookTile({ source, book, setFormData, bookForm }) {

  function bookClickHandler(book) {
    setFormData({ title: book.title, author: book.authors.join(), pages: book.pageCount, genre: book.categories.join(), coverPicture: book.thumbnail, description: book.description })
    window.scrollTo(0, 0)
    setTimeout(() => bookForm.current.requestSubmit(), 100)
  }

  return (
    <>
      {source === 'search' ?
        (<Card align='center' justify='center' background='purple-1' flex={true}>
          {book.title ? <Heading margin={{ top: 'small', bottom: 'large' }}>{book.title}</Heading> : null}
          {book.thumbnail ? <Image alt='book cover' src={book.thumbnail} /> : null}
          {book.authors ? (book.authors.length > 1 ? <p>Author: {book.authors.join()}</p> : <p>Authors: {book.authors[0]}</p>) : null}
          {book.categories ? (book.categories.length > 1 ? <p>Genres: {book.categories.join()}</p> : <p>Genre: {book.categories[0]}</p>) : null}
          {book.description ? <p>Description: {book.description}</p> : null}
          {book.pages ? <p>Pages: {book.pageCount}</p> : null}
          <CardFooter margin={{ top: 'large', bottom: 'small' }}>
            {((book.title && book.authors) && (book.description && book.pageCount)) ? <Button primary color='orange-1' label='Add to Current Collection' onClick={() => bookClickHandler(book)} /> : null}
          </CardFooter>
        </Card>)
        :
        (<Card align='center' justify='center' background='accent-2'>
          <Heading level={3} margin={{ top: 'small', bottom: 'large' }}>{book.title}</Heading>
          <Box height="small" width="small">
            <Image src={`${book.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/depositphotos_63590137-stock-illustration-blue-book-logo-vector_xkPW5oumg.jpg' />
            <Paragraph>By: {book.author.split(',').join(', ')}</Paragraph>
          </Box>
          <CardFooter margin={{ top: 'large', bottom: 'small' }}>
            <Link to={`/books/${book.id}`}>Book Page</Link>
          </CardFooter>
        </Card>)
      }
    </>
  )
}

export default BookTile