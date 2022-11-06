import { Button } from 'grommet'
import React, { useContext } from 'react'
import { BookContext } from '../context/BookContext'

function WikiDeleteButton({ element, category, errorHandler, deleteToggle, setDeleteToggle }) {
    const { book, setBook } = useContext(BookContext)

    async function deleteHandler() {
        const resp = await fetch(`/${category}/${element.id}`,
            { method: 'DELETE' })
        if (resp.ok) {
            setBook({ ...book, [category]: book[category].filter(bookPart => bookPart.id !== parseInt(element.id)) })
        } else {
            errorHandler({errors: ['Failed to delete!']})
        }
    }
    return (
        <>
            {deleteToggle ?
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Confirm Delete' onClick={deleteHandler} />
                :
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Delete?' onClick={() => setDeleteToggle(!deleteToggle)} />
            }
        </>
    )
}

export default WikiDeleteButton