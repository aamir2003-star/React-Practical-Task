import React, { useContext } from 'react'
import { StateManagerContext } from '../context/StateContext'

const Success = () => {
  const {formData , role} = useContext(StateManagerContext)
  return (
    <>
    <div>
      <h2 className='flex text-center text-2xl font-semibold mb-2 ml-[15%]'>Registration Successfully:</h2>
      <ul >
        {role === 'student' &&
         <ul >
          <li className='capitalize text-lg'>Role: {role}</li>
           <li className='text-lg'>School: {formData.school}</li>
        <li className='text-lg'>Grade: {formData?.grade}</li>

         </ul>
  }
      {
        role === 'teacher' && 
        <ul>
          <li className='capitalize text-lg'>Role: {role}</li>
           <li className='capitalize text-lg'>Subject: {formData.subject}</li>
        <li className='text-lg'>Exp: {formData?.exp} Years</li>

         </ul>
      }
      {
        role === "professor" &&
         <ul>
          <li className='capitalize text-lg'> Role: {role}</li>
           <li className='capitalize text-lg'>Dept.: {formData.dept}</li>
        <li className='capitalize text-lg'>Research: {formData?.research}</li>

         </ul>
      }
       <li>Email: {formData.email}</li>
      </ul>
    </div>
    </>
  
  )
}

export default Success
