import React from 'react'
import { Link } from 'react-router-dom'


const NotAuth = () => {
  return (
    <div>
      <h1 className='text-3xl text-center'>
        You are not authenticated to see this 
      </h1>
      

      <Link to="/" className="btn mt-2" onClick={() => {navigate(-1)}}>
                  Go back
      </Link>
    </div>
  )
}

export default NotAuth
