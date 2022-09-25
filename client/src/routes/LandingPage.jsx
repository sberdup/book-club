import React, { useContext, useEffect, useState } from 'react'
import LogInOut from '../components/LogInOut'
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function LandingPage() {
  // will need to have a way to navigate to another route if user is already logged in
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  // console.log(errors)
  
  useEffect(() => {
    console.log(user)
    if (user.id) {
      navigate('homepage')
    }
  }, [user, navigate])

  return (
    <div>
      <h1>Welcome to the Book Club App!</h1>
      <LogInOut setErrors={setErrors}/>
      <hr />
      {errors.length === 0 ? null: errors.messages.map(e => <p key={e} style={{color:'red'}}>{`${e}`}</p>)}
      <SignUpForm />
    </div>
  )
}

export default LandingPage