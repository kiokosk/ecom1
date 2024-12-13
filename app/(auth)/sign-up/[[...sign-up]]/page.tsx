import { SignUp } from '@clerk/nextjs'
import React from 'react'

const signUpPage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <SignUp />
    </div>  )
}

export default signUpPage;
