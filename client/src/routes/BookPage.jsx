import { Spinner } from 'grommet'
import React, { useState, useEffect, useContext } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import WikiBar from '../components/WikiBar'
import WikiGrid from '../components/WikiGrid'
import { BookContext } from '../context/BookContext'

function BookPage() {
    const { book, setBook } = useContext(BookContext)
    const { bookId } = useParams()
    const [categoryFilter, setCategoryFilter] = useState('characters')
    const location = useLocation()
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
            {(location.pathname !== `/books/${bookId}`) ? <NavLink to={`/books/${bookId}`}>Back to Book</NavLink> :<NavLink to="edit">Edit BookWiki</NavLink>}
            <Outlet />
            <WikiBar setCategoryFilter={setCategoryFilter} />
            {loading ? <Spinner color='goldenrod' size='xlarge' style={{margin:'auto'}}/> : <WikiGrid bookSelection={book[categoryFilter]} />}
        </div>
    )
}

export default BookPage