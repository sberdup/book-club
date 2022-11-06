import { Button, Card, CardHeader, CardBody, FormField, TextInput, Box, CardFooter, TextArea } from 'grommet'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { BookContext } from '../context/BookContext'

function NewWikiTile({ category }) {
    const [createToggle, setCreateToggle] = useState(false)
    const emptyForm = { name: '', description: '', aliases: '', time: '', location: '', chapter: '', page: '', body: '' }
    const [formData, setFormData] = useState(emptyForm)
    const errorBox = useRef(null)
    const [errors, setErrors] = useState([])
    const { book, setBook } = useContext(BookContext)

    const label = (category !== 'book_elements' ? (category.charAt(0).toUpperCase() + category.slice(1, -1)) : 'Misc')

    useEffect(() => {
        errorBox.current = document.getElementById('errorBox')
    }, [createToggle])

    function inputHandler(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    async function submitHandler() {
        const resp = await fetch(`/${category}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                book_id: book.id,
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
        if (resp.ok) {
            setBook({ ...book, [category]: [...book[category], data] })
            setFormData(emptyForm)
            setCreateToggle(false)
        } else {
            setErrors(data)
            errorBox.current.className = 'errorBox'
            setTimeout(() => errorBox.current.className = 'errorBox fade', 2000)
        }
    }
    return (
        <>
            {createToggle ?
                <Card width={{ max: 'large' }} height={{ min: 'small' }} background='accent-5' flex className='zFloor'>
                    <CardHeader justify='center' >
                        {category !== 'quotes' ?
                            <FormField label='Name'>
                                <TextInput textAlign='center' type="text" id="name" value={formData.name} onChange={inputHandler} />
                            </FormField>
                            :
                            <FormField label='Body'>
                                <TextArea id="body" value={formData.body} onChange={inputHandler} />
                            </FormField>
                        }
                    </CardHeader>

                    <CardBody justify='around'>
                        {category !== 'quotes' ?

                            <FormField label='Description'>
                                <TextArea id="description" value={formData.description} onChange={inputHandler} />
                            </FormField>
                            :
                            <Box direction='row' justify='around' height='xsmall' margin='none' >
                                <FormField label='Chapter'>
                                    <TextInput textAlign='center' type="number" id="chapter" value={formData.chapter} onChange={inputHandler} />
                                </FormField>
                                <FormField label='Page'>
                                    <TextInput textAlign='center' type="number" id="page" value={formData.page} onChange={inputHandler} />
                                </FormField>
                            </Box>
                        }
                        {category === 'characters' ?

                            <FormField label='Aliases'>
                                <TextInput textAlign='center' type="text" id="aliases" value={formData.aliases} onChange={inputHandler} />
                            </FormField>
                            : null
                        }
                        {category === 'eras' ?

                            <FormField label='Time'>
                                <input type="datetime-local" id="time" value={formData.time} onChange={inputHandler}></input>
                            </FormField>
                            : null
                        }
                        {category === 'locations' ?

                            <FormField label='Location'>
                                <TextInput textAlign='center' type="text" id="location" value={formData.location} onChange={inputHandler} />
                            </FormField>
                            : null
                        }
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => setCreateToggle(!createToggle)} primary color='status-warning' size='xsmall' margin='xsmall' label='Cancel' />
                        <Button onClick={submitHandler} primary size='xsmall' margin='xsmall' label='Submit' />
                    </CardFooter>
            <Box className='errorBox fade' id='errorBox'>
                {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'orangered', fontSize: '25px', fontWeight: 'bolder' }}>{`${e}`}</p>)}
            </Box>
                </Card>
                : <Button primary label={`New ${label}`} onClick={() => setCreateToggle(!createToggle)} />
            }
        </>
    )
}

export default NewWikiTile