import { Card, Image, Paragraph, Box, Footer } from 'grommet'
import React, { useRef, useState, useEffect } from 'react'
import { useContext } from 'react'
import { ClubUserContext } from '../context/ClubUserContext'
import UserEditButton from '../subcomponents/UserEditButton'
import UserRemoveButton from '../subcomponents/UserRemoveButton'
import { ClubContext } from '../context/ClubContext'

function UserTile({ user, member }) {
  const { clubUser } = useContext(ClubUserContext)
  const { club, setClub } = useContext(ClubContext)
  const [errors, setErrors] = useState([])
  const errorBox = useRef(null)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [editToggle, setEditToggle] = useState(false)

  useEffect(() => {
    errorBox.current = document.getElementById('errorBox')
  }, [deleteToggle, editToggle])

  function errorHandler(errors) {
    setErrors(errors)
    errorBox.current.className = 'errorBox'
    setTimeout(() => errorBox.current.className = 'errorBox fade', 2000)
  }

  // let userStatus
  // if (member.is_owner) {
  //   userStatus = 'Owner'
  // } else if (member.is_admin) {
  //   userStatus = 'Admin'
  // } else {
  //   userStatus = 'Member'
  // }

  return (
    <Card width='medium' alignSelf='center' align='center' background='accent-1' className='zFloor'>
      <Box height="small" width="small" margin='small'>
        {(member?.is_admin !== false) ? <Paragraph margin='none' color={(member.is_owner) ? 'accent-2' : 'neutral-1'}>{member.is_owner ? 'Owner' : 'Admin'}</Paragraph> : null}
        <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/149071_Dcw9gvaSe.png' />
        <Paragraph>{user.username}</Paragraph>
        <Footer direction='row'>
          {clubUser.is_owner ? <UserEditButton user={user} member={member} club={club} setClub={setClub} editToggle={editToggle}
            setEditToggle={setEditToggle} errorHandler={errorHandler} /> : null}
          {clubUser.is_admin ? <UserRemoveButton user={user} club={club} setClub={setClub} deleteToggle={deleteToggle}
            setDeleteToggle={setDeleteToggle} errorHandler={errorHandler} /> : null}
        </Footer>
      </Box>
      <Box className='errorBox fade' id='errorBox'>
        {errors.length === 0 ? null : errors.errors.map(e => <p key={e} style={{ color: 'orangered', fontSize: '25px', fontWeight: 'bolder' }}>{`${e}`}</p>)}
      </Box>
    </Card>

  )
}

export default UserTile