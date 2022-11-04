import { Button, Card, CardHeader, CardBody, FormField, TextInput, Box, CardFooter } from 'grommet'
import React, { useState } from 'react'

function NewWikiTile({ category }) {
    const [createToggle, setCreateToggle] = useState(false)
    const [formData, setFormData] = useState({ name: '', description: '', aliases: '', time: '', location: '', chapter: '', page: '', body: '' })
    const label = (category !== 'book_elements' ? (category.charAt(0).toUpperCase() + category.slice(1, -1)) : 'Misc')
    function inputHandler(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    async function submitHandler() {
        console.log(formData)
    }
    return (
        <>
            {createToggle ?
                <Card width={{ max: 'large' }} height={{ min: 'small' }} background='accent-5' flex>
                    <CardHeader justify='center' >
                        {category !== 'quotes' ?
                            <FormField label='Name'>
                                <TextInput textAlign='center' type="text" id="name" value={formData.name} onChange={inputHandler}></TextInput>
                            </FormField>
                            :
                            <FormField label='Body'>
                                <TextInput textAlign='center' type="text" id="body" value={formData.body} onChange={inputHandler}></TextInput>
                            </FormField>
                        }
                    </CardHeader>

                    <CardBody justify='around'>
                        {category !== 'quotes' ?

                            <FormField label='Description'>
                                <TextInput textAlign='center' type="text" id="description" value={formData.description} onChange={inputHandler}></TextInput>
                            </FormField>
                            : null
                        }
                        {category === 'characters' ?

                            <FormField label='Aliases'>
                                <TextInput textAlign='center' type="text" id="aliases" value={formData.aliases} onChange={inputHandler}></TextInput>
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
                                <TextInput textAlign='center' type="text" id="location" value={formData.location} onChange={inputHandler}></TextInput>
                            </FormField>
                            : null
                        }

                        <Box direction='row' justify='around'>
                            {category === 'quotes' ?

                                <FormField label='Chapter'>
                                    <TextInput textAlign='center' type="number" id="chapter" value={formData.chapter} onChange={inputHandler}></TextInput>
                                </FormField>
                                : null
                            }
                            {category === 'quotes' ?

                                <FormField label='Page'>
                                    <TextInput textAlign='center' type="number" id="page" value={formData.page} onChange={inputHandler}></TextInput>
                                </FormField>
                                : null
                            }
                        </Box>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => setCreateToggle(!createToggle)} primary color='status-warning' size='xsmall' label='Cancel' />
                        <Button onClick={submitHandler} primary size='xsmall' label='Submit' />
                    </CardFooter>
                </Card>
                : <Button primary label={`New ${label}`} onClick={() => setCreateToggle(!createToggle)} />
            }
        </>
    )
}

export default NewWikiTile