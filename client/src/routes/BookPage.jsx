import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import WikiBar from '../components/WikiBar'
import WikiGrid from '../components/WikiGrid'

function BookPage() {
    const [book, setBook] = useState({id: false })
    const { bookId } = useParams()
  
    // getting appropriate book based on address params
    useEffect(() => {
    //   console.log(book)
      getBook()
    }, [])
    async function getBook() {
      const resp = await fetch(`/books/${bookId}`)
      const data = await resp.json()
      if (resp.ok) {
        setBook(data)
      }
    }

    return (
      <div>
        {book.id ?
          <>
            <h2>{`${book.title} by ${book.author}`}</h2>
            <p>{book.description}</p>
          </>
          : null}
          <WikiBar/>
          <WikiGrid/>
      </div>
    )
  }

export default BookPage