import React from 'react'
import { Link } from 'react-router-dom'

const NotAuth = () => {
  return (
    <div>
      <h1 className='text-3xl text-center'>
        You are not authenticated to see this 
      </h1>
      <Link to="/dashboard" className='bg-red-500 p-1 m-5'>Goo back</Link>
    </div>
  )
}

export default NotAuth
