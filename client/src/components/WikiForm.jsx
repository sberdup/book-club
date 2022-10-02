import React, { useContext, useState } from 'react'
import { BookContext } from '../context/BookContext'

function WikiForm() {
    const emptyForm = { name: '', description: '', aliases: '', time: '', location: '', chapter: '', page: '', body: '' }
    const addParams = { action: 'POST', message: 'Add a new entry!' }
    const deleteParams = { action: 'DELETE', message: 'Remove an entry (careful!)' }
    const editParams = { action: 'PATCH', message: "Update an entry." }

    const categories = ['book_elements', 'characters', "eras", "events", "groups", "items", "locations", "quotes", "storylines", "themes"]
    const displayNames = ['Misc', 'Characters', "Times", "Events", "Groups", "Objects", "Places", "Quotes", "Storylines", "Themes"]


    const [mode, setMode] = useState(addParams)
    const [formData, setFormData] = useState(emptyForm)
    const [errors, setErrors] = useState([])
    const { book, setBook } = useContext(BookContext)

    const [fetchParams, setFetchParams] = useState({ category: 'book_elements', id: 'none' })

    function inputHandler(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        // if (e.target.type === 'checkbox') {
        //     setFormData({ ...formData, [e.target.id]: e.target.checked })
        // } else {
        // }

        // may need condition for selection
    }
    function categorySelectHandler(e) {
        setFetchParams({ ...fetchParams, category: e.target.value })
    }
    function entrySelectHandler(e) {
        setFetchParams({ ...fetchParams, id: e.target.value })
    }

    async function submitHandler(e) {
        e.preventDefault()

        let endpoint
        if (mode.action === 'POST') {
            endpoint = `/${fetchParams.category}/${fetchParams.id}`
        } else {
            endpoint = `/${fetchParams.category}`
        }

        const resp = await fetch(endpoint, {
            method: mode.action,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: fetchParams.id,
                name: formData.name,
                description: formData.description,
                aliases: formData.aliases,
                time: formData.time,
                location: formData.location,
                body: formData.body,
                chapter: parseInt(formData.chapter),
                page: parseInt(formData.page)
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
    console.log(formData)
    // const sortedElements = book.sort(bookPart => bookPart.id)

    return (
        <div className='basicborder'>

            <h4>{mode.message}</h4>
            <div className="basicborder">
                <button onClick={() => setMode(addParams)}>Add</button>
                <button onClick={() => setMode(editParams)}>Edit</button>
                <button onClick={() => setMode(deleteParams)}>Delete</button>
            </div>

            <form onSubmit={submitHandler} className="basicborder">

                <label htmlFor='categorySelect'>Category: </label>
                <select onChange={categorySelectHandler}>
                    {categories.map((category, idx) => (
                        <option key={category} value={category}>
                            {displayNames[idx]}
                        </option>
                    ))}
                </select>
                {/* ^ will change the select box below it to get entry for edit/delete's ID */}

                {mode.action !== 'POST' ?
                    <>
                        <label htmlFor='elementSelect'>Entry: </label>
                        <select onChange={entrySelectHandler}>
                            {book[fetchParams.category].map((element) => (
                                <option key={element.id} value={element.id}>
                                    {element.name || element.body.slice(0, 50)}
                                </option>
                            ))}
                        </select>
                    </>
                    : null
                }

                {mode.action !== 'DELETE' ?
                    <>
                        {fetchParams.category !== 'quotes' ?
                            <>
                                <div>
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" id="name" value={formData.name} onChange={inputHandler}></input>
                                </div>
                                <div>
                                    <label htmlFor="description">Description: </label>
                                    <input type="text" id="description" value={formData.description} onChange={inputHandler}></input>
                                </div>

                                {fetchParams.category === 'characters' ?
                                    <div>
                                        <label htmlFor="aliases">Aliases: </label>
                                        <input type="text" id="aliases" value={formData.aliases} onChange={inputHandler}></input>
                                    </div>
                                    : null
                                }
                                {fetchParams.category === 'eras' ?
                                    <div>
                                        <label htmlFor="time">Time: </label>
                                        <input type="datetime-local" id="time" value={formData.time} onChange={inputHandler}></input>
                                    </div>
                                    : null
                                }
                                {fetchParams.category === 'locations' ?
                                    <div>
                                        <label htmlFor="location">Location: </label>
                                        <input type="text" id="location" value={formData.location} onChange={inputHandler}></input>
                                    </div>
                                    : null
                                }
                            </>
                            :
                            <>
                                <div>
                                    <label htmlFor="body">Body: </label>
                                    <input type="text" id="body" value={formData.body} onChange={inputHandler}></input>
                                </div>
                                <div>
                                    <label htmlFor="chapter">Chapter: </label>
                                    <input type="number" id="chapter" value={formData.chapter} onChange={inputHandler}></input>
                                </div>
                                <div>
                                    <label htmlFor="page">Page: </label>
                                    <input type="number" id="page" value={formData.page} onChange={inputHandler}></input>
                                </div>
                            </>
                        }
                    </>
                    :
                    <div>delete</div>
                }
                <input type='submit' />
            </form>
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}
        </div>
    )
}

export default WikiForm