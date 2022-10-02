import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import WikiBar from '../components/WikiBar'
import WikiGrid from '../components/WikiGrid'

function BookPage() {
    const [book, setBook] = useState({id: false })
    const { bookId } = useParams()
    const [categoryFilter, setCategoryFilter] = useState('characters')
    const [loading, setLoading] = useState(true)
    // too much data, need a loader to prevent accessing non-existent data
  
    // getting appropriate book based on address params
    useEffect(() => {
        //console.logs can ruin useEffects with asynchronous parts
      getBook()
    }, [])
    async function getBook() {
        setLoading(true)
      const resp = await fetch(`/books/${bookId}`)
      const data = await resp.json()
      if (resp.ok) {
        setBook(data)
        setLoading(false)
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
          <WikiBar setCategoryFilter={setCategoryFilter}/>
          {loading ? <h1>One moment...</h1> : <WikiGrid bookSelection={book[categoryFilter]}/>}
      </div>
    )
  }

export default BookPage