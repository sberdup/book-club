import React, { useContext, useEffect, useState } from 'react'
import LogInOut from '../components/LogInOut'
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Button, Heading } from 'grommet'

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
    <div>
      <Heading margin={{ top: 'none', bottom: 'large' }} fill={true}>Welcome to the Book Club App!</Heading>

      {toggleLogIn ? <LogInOut setErrors={setErrors} /> : <SignUpForm setErrors={setErrors} />}
      {errors.errors === undefined ? null : errors.errors.map(e => <p key={e} style={{ color: 'red' }}>{`${e}`}</p>)}
      <Button secondary color='firebrick' label={toggleLogIn ? 'New User?' : 'Back to Log In'} onClick={() => {
        setToggleLogIn(!toggleLogIn)
        setErrors([])
      }} />
      {/* vvv handles errors received from either user creation or login failure currently */}
    </div>
  )
}

export default LandingPage