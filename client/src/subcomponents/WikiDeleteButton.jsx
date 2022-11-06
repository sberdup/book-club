import { Button } from 'grommet'
import React, {useContext} from 'react'
import { BookContext } from '../context/BookContext'

function WikiDeleteButton({element, category}) {
    const {book, setBook} = useContext(BookContext)

    async function deleteHandler(){
        const resp = await fetch(`/${category}/${element.id}`, 
        {method: 'DELETE'})
        if (resp.ok) {
            setBook({ ...book, [category]: book[category].filter(bookPart => bookPart.id !== parseInt(element.id)) })
        } else {
            console.log('unable to delete')
            //need to change to output error at higher level 
        }
    }
  return (
    <Button primary color='status-critical' size='xsmall' margin='xsmall' label='Delete' onClick={deleteHandler}/>
  )
}

export default WikiDeleteButton