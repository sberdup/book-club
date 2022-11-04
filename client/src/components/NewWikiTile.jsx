import { Button } from 'grommet'
import React, { useState } from 'react'

function NewWikiTile({ category }) {
    const [createToggle, setCreateToggle] = useState(false)
    return (
        <>
            {createToggle ? <div onClick={() => setCreateToggle(!createToggle)}>NewWikiTile</div>
                : <Button label={`New ${category}`} onClick={() => setCreateToggle(!createToggle)} />
            }
        </>
    )
}

export default NewWikiTile