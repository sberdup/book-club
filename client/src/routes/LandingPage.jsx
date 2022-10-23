import React, { useContext, useEffect, useState } from 'react'
import LogInOut from '../components/LogInOut'
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Box, Button, Header, Heading, Page, PageContent } from 'grommet'

function LandingPage() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [toggleLogIn, setToggleLogIn] = useState(true)

  // vvv handles sending the user to the homepage if they're logged in successfully
  useEffect(() => {
    if (user.id) {
      navigate('homepage')
    }
  }, [user, navigate])

  return (
    <Page height={{ min: '100vh' }} width={{min:'100vw'}}>
      <Header background='brand' justify='center' height={{max:'20vh'}}>
        <Heading color='black' level={1}>Welcome to the Book Club App!</Heading>
      </Header>
      <PageContent justify='evenly' align='center' width={{min:'30vw', max:'80vw'}} height={{min:'80vh'}} fill>

          {toggleLogIn ? <LogInOut setErrors={setErrors} /> : <SignUpForm setErrors={setErrors} />}

        <Box align='center' width={{max:'80vw'}} fill>
          {errors?.errors ? errors.errors.map(e => <p key={e} style={{ color: 'orangered', fontSize:'25px' , fontWeight:'bolder' }}>{`${e}`}</p>) : null}
          <Button primary color='accent-3' style={{ minWidth: '35%' }} label={toggleLogIn ? 'New User?' : 'Back to Log In'} onClick={() => {
            setToggleLogIn(!toggleLogIn)
            setErrors([])
          }} />
        </Box>
      </PageContent>
    </Page>
  )
}

export default LandingPage