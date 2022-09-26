import React, { useContext, useEffect, useState } from 'react'
import LogInOut from '../components/LogInOut'
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function LandingPage() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  // console.log(errors)

  // vvv handles sending the user to the homepage if they're logged in successfully
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
      {/* vvv handles errors received from either user creation or login failure currently */}
      {errors.length === 0 ? null: errors.errors.map(e => <p key={e} style={{color:'red'}}>{`${e}`}</p>)}
      <SignUpForm setErrors={setErrors}/>
    </div>
  )
}

export default LandingPage