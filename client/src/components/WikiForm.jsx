import React, { useContext, useState } from 'react'
import { BookContext } from '../context/BookContext'

function WikiForm() {
    const emptyForm = { id: 'none', name: '', description: '', aliases: '', time: '', location: '', chapter: '', page: '' }
    const addParams = { action: 'POST', message: 'Add a new entry!' }
    const deleteParams = { action: 'DELETE', message: 'Remove an entry (careful!)' }
    const editParams = { action: 'PATCH', message: "Update an entry." }

    const [mode, setMode] = useState(addParams)
    const [formData, setFormData] = useState(emptyForm)
    const [errors, setErrors] = useState([])
    const { book, setBook } = useContext(BookContext)

    function inputHandler(e) {
        if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.id]: e.target.checked })
        } else {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        }
        // may need condition for selection
    }

    async function submitHandler(e) {
        e.preventDefault()

        let endpoint
        if (mode.action === 'POST') {
            endpoint = '/club_users'
        } else {
            endpoint = `/club_users/${formData.bookPartID}`
        }
        // gets params from form to navigate delete/update

        const resp = await fetch(endpoint, {
            method: mode.action,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: formData.id,
                name: formData.name,
                description: formData.description,
                aliases: formData.aliases,
                time: formData.time,
                location: formData.location,
                chapter: formData.chapter,
                page: formData.page
            })
        })
        const data = await resp.json()
        // head: :no_content causes unexpected end of JSON here, return usable data instead
        if (resp.ok) {
            if (mode.action === 'DELETE') {
                setBook([...book].filter(bookPart => bookPart.id !== data.id))
            } else if (mode.action === 'POST') {
                setBook([...book, data])
            } else {
                setBook([...book].map(bookPart => {
                    if (bookPart.id === data.id) {
                        return data
                    }
                    return bookPart
                }))
            }
            setFormData(emptyForm)
            setErrors({ errors: ['Success!'] })
        } else {
            setErrors(data)
        }
    }
    console.log(book)
    // const sortedElements = book.sort(bookPart => bookPart.id)
    // trying to get selection box items to refresh with state

    return (
        <div className='basicborder'>
            <h4>{mode.message}</h4>
            <div className="basicborder">
                <button onClick={() => setMode(addParams)}>Add</button>
                <button onClick={() => setMode(editParams)}>Edit</button>
                <button onClick={() => setMode(deleteParams)}>Delete</button>
            </div>
            <form onSubmit={submitHandler} className="basicborder">
                {mode.action !== 'DELETE' ?
                    <div>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" value={formData.name} onChange={inputHandler}></input>
                        </div>
                        <div>

                            <label htmlFor="description">Description: </label>
                            <input type="text" id="description" value={formData.description} onChange={inputHandler}></input>
                        </div>
                        <div>
                            <label htmlFor="aliases">Aliases: </label>
                            <input type="text" id="aliases" value={formData.aliases} onChange={inputHandler}></input>
                        </div>
                        <div>
                            <label htmlFor="time">Time: </label>
                            <input type="text" id="time" value={formData.time} onChange={inputHandler}></input>
                        </div>
                        <div>
                            <label htmlFor="location">Location: </label>
                            <input type="text" id="location" value={formData.location} onChange={inputHandler}></input>
                        </div>
                        <div>
                            <label htmlFor="chapter">Chapter: </label>
                            <input type="text" id="chapter" value={formData.chapter} onChange={inputHandler}></input>
                        </div>
                        <div>
                            <label htmlFor="page">Page: </label>
                            <input type="text" id="page" value={formData.page} onChange={inputHandler}></input>
                        </div>
                    </div>
                    :
                    <div>
                        {/* <label htmlFor='bookPartID'>Select a user: </label>
                        <select id='bookPartID' onChange={inputHandler}>
                            {sortedElements.map(bookPart =>
                                <option key={bookPart.id} value={bookPart.id}>
                                    {bookPart.id}
                                </option>
                            )}
                        </select> */}
                    </div>
                }
                <input type='submit' />
            </form>
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}
        </div>
    )
}

export default WikiForm