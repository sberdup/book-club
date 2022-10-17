import { Spinner, Card, Box, Paragraph, Image, Heading, Grid } from 'grommet'
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
        <Box>
            {(book.id && location.pathname !== `/books/${bookId}/edit`) ?
                <Card background='accent-2' alignSelf='center' margin='medium' width='xlarge'>
                    <Heading level={3} alignSelf='center' margin={{ top: 'small', bottom: 'large' }}>{`${book.title} by ${book.author}`}</Heading>
                    <Grid columns={{ count: 'fit', size: 'small' }} justify='center' gap='medium' margin='small' >
                        <Image src={`${book.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-200,h-200/depositphotos_63590137-stock-illustration-blue-book-logo-vector_xkPW5oumg.jpg' />
                        <Paragraph>{book.description}</Paragraph>
                    </Grid>
                </Card>
                : null}
            <Outlet />

            {(location.pathname !== `/books/${bookId}`) ? <NavLink to={`/books/${bookId}`}>Back to Book</NavLink> : <NavLink to="edit">Edit BookWiki</NavLink>}
            <WikiBar setCategoryFilter={setCategoryFilter} />
            {loading ? <Spinner color='goldenrod' size='xlarge' style={{ margin: 'auto' }} /> : <WikiGrid bookSelection={book[categoryFilter]} />}
        </Box>
    )
}

export default BookPage