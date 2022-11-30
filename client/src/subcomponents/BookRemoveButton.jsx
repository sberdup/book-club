import { Button } from 'grommet'
import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function BookRemoveButton({bookID, errorHandler, deleteToggle, setDeleteToggle}) {
    const {user, setUser} = useContext(UserContext)
    
    async function deleteHandler() {
        const resp = await fetch(`/users/${user.id}/collections/${bookID}`,
            { method: 'DELETE' })
        const data = await resp.json()
        if (resp.ok) {
            setUser({ ...user, books: user.books.filter(book => book.id !== parseInt(bookID)) })
        } else {
            errorHandler(data)
        }
    }
   
    return (
        <>
            {deleteToggle ?
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Confirm Removal'
                    onClick={deleteHandler} onBlur={() => setDeleteToggle(false)} />
                :
                <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Remove from Collection' onClick={() => setDeleteToggle(!deleteToggle)} />
            }
        </>
    )
}

export default BookRemoveButton