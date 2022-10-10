import { Box, Button, Form, FormField, TextInput } from 'grommet'
import React, { useContext, useState, useEffect } from 'react'
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
            endpoint = `/${fetchParams.category}`
        } else {
            endpoint = `/${fetchParams.category}/${fetchParams.id}`
        }

        const resp = await fetch(endpoint, {
            method: mode.action,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                book_id:book.id,
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
        let data
        if (mode.action !== 'DELETE'){
            data = await resp.json()
        }
        // head: :no_content can be circumvented by not resolving the response
        console.log(data)
        if (resp.ok) {
            if (mode.action === 'DELETE') {
                setBook({ ...book, [fetchParams.category]: book[fetchParams.category].filter(bookPart => bookPart.id !== parseInt(fetchParams.id)) })
            } else if (mode.action === 'POST') {
                setBook({ ...book, [fetchParams.category]: [...book[fetchParams.category], data] })
            } else {
                setBook({
                    ...book,
                    [fetchParams.category]: [...book[fetchParams.category]].map(bookPart => {
                        if (bookPart.id === data.id) {
                            return data
                        }
                        return bookPart
                    })
                })
            }
            setFormData(emptyForm)
            setErrors({ errors: ['Success!'] })
        } else {
            setErrors(data)
        }
    }
    // const sortedElements = book.sort(bookPart => bookPart.id)

    return (
        <Box border={{
            color: 'orange-1',
            size: "medium",
            style: "solid",
            side: "all"
        }} width='medium' height='20%' background='cyan-1' style={{margin:'auto', marginTop:'10px'}}>

            <h4>{mode.message}</h4>
            <Box direction='row'  alignSelf='center' justify='center' width='small' margin='xsmall'>
                <Button primary color='forestgreen' onClick={() => setMode(addParams)} label='Add' />
                <Button primary color='yellow' onClick={() => setMode(editParams)} label='Edit' />
                <Button primary color='red' onClick={() => setMode(deleteParams)} label='Delete' />
            </Box>

            <Form onSubmit={submitHandler}>

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
                        <select onChange={entrySelectHandler} defaultValue='default'>
                            <option disabled value='default'>--choose an element--</option>
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
                                <FormField label='Name'>
                                    <TextInput type="text" id="name" value={formData.name} onChange={inputHandler}></TextInput>
                                </FormField>
                                <FormField label='Description'>
                                    <TextInput type="text" id="description" value={formData.description} onChange={inputHandler}></TextInput>
                                </FormField>

                                {fetchParams.category === 'characters' ?
                                    <FormField label='Aliases'>
                                        <TextInput type="text" id="aliases" value={formData.aliases} onChange={inputHandler}></TextInput>
                                    </FormField>
                                    : null
                                }
                                {fetchParams.category === 'eras' ?
                                    <FormField label='Time'>
                                        <input type="datetime-local" id="time" value={formData.time} onChange={inputHandler}></input>
                                    </FormField>
                                    : null
                                }
                                {fetchParams.category === 'locations' ?
                                    <FormField label='Location'>
                                        <TextInput type="text" id="location" value={formData.location} onChange={inputHandler}></TextInput>
                                    </FormField>
                                    : null
                                }
                            </>
                            :
                            <>
                                <FormField label='Body'>
                                    <TextInput type="text" id="body" value={formData.body} onChange={inputHandler}></TextInput>
                                </FormField>
                                <FormField label='Chapter'>
                                    <TextInput type="number" id="chapter" value={formData.chapter} onChange={inputHandler}></TextInput>
                                </FormField>
                                <FormField label='Page'>
                                    <TextInput type="number" id="page" value={formData.page} onChange={inputHandler}></TextInput>
                                </FormField>
                            </>
                        }
                    </>
                    :
                    null
                }
                <Button primary type='submit' label='Submit' size='xsmall' margin={{top:'20px'}}/>
            </Form>
            {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}
        </Box>
    )
}

export default WikiForm