import { Card, Image, Paragraph, Box, Footer } from 'grommet'
import React, { useState } from 'react'
import { useContext } from 'react'
import { ClubUserContext } from '../context/ClubUserContext'
import UserEditButton from '../subcomponents/UserEditButton'
import UserRemoveButton from '../subcomponents/UserRemoveButton'
import { ClubContext } from '../context/ClubContext'
import useErrors from '../functions/useErrors'
import ErrorBox from '../subcomponents/ErrorBox'

function UserTile({ user, member }) {
  const { clubUser } = useContext(ClubUserContext)
  const { club, setClub } = useContext(ClubContext)
  const [errors, setErrors] = useErrors()
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [editToggle, setEditToggle] = useState(false)

  return (
    <Card width='medium' alignSelf='center' align='center' background='accent-1' className='zFloor'>
      <Box height="small" width="small" margin='small'>
        {(member?.is_admin !== false) ? <Paragraph margin='none' color={(member.is_owner) ? 'accent-2' : 'neutral-1'}>{member.is_owner ? 'Owner' : 'Admin'}</Paragraph> : null}
        <Image src={`${user.image?.url}`} fit='contain' fallback='https://ik.imagekit.io/sberdup/tr:w-100,h-100/149071_Dcw9gvaSe.png' />
        <Paragraph>{user.username}</Paragraph>
        <Footer direction='row'>
          {clubUser.is_owner ? <UserEditButton user={user} member={member} club={club} setClub={setClub} editToggle={editToggle}
            setEditToggle={setEditToggle} errorHandler={setErrors} /> : null}
          {clubUser.is_admin ? <UserRemoveButton user={user} club={club} setClub={setClub} deleteToggle={deleteToggle}
            setDeleteToggle={setDeleteToggle} errorHandler={setErrors} /> : null}
        </Footer>
      </Box>
      <ErrorBox errorObject={errors}/>
    </Card>

  )
}

export default UserTile