import React from 'react'
import LogInOut from '../components/LogInOut'
import SignUpForm from '../components/SignUpForm'

function LandingPage() {
  return (
    <div>
      <h1>Welcome to the Book Club App!</h1>
      <LogInOut/>
      <SignUpForm/>
    </div>
  )
}

export default LandingPage