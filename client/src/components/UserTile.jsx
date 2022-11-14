import { Card, Image, Paragraph, Box } from 'grommet'
import React, { useRef, useState, useEffect } from 'react'
import { useContext } from 'react'
import { ClubUserContext } from '../context/ClubUserContext'
import UserRemoveButton from '../subcomponents/UserRemoveButton'

function UserTile({ user, source }) {
  const { clubUser } = useContext(ClubUserContext)
  const [errors, setErrors] = useState([])
  const errorBox = useRef(null)
  const [deleteToggle, setDeleteToggle] = useState(false)

  useEffect(() => {
    errorBox.current = document.getElementById('errorBox')
  }, [deleteToggle])

  function errorHandler(errors) {
    setErrors(errors)
    errorBox.current.className = 'errorBox'
    setTimeout(() => errorBox.current.className = 'errorBox fade', 2000)
  }

  return (
    <Card width='medium' alignSelf='center' align='center' background='accent-1' className='zFloor'>
      <Box height="small" width="small" margin='small'>
        <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/149071_Dcw9gvaSe.png' />
        <Paragraph>{user.username}</Paragraph>
        {clubUser.is_admin ? <UserRemoveButton user={user} deleteToggle={deleteToggle}
          setDeleteToggle={setDeleteToggle} errorHandler={errorHandler} /> : null}
      </Box>
      <Box className='errorBox fade' id='errorBox'>
        {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'orangered', fontSize: '25px', fontWeight: 'bolder' }}>{`${e}`}</p>)}
      </Box>
    </Card>

  )
}

export default UserTile