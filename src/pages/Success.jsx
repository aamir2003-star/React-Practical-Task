import React from 'react'

const Success = ({formData, role}) => {
  return (
    <>
    <div>
      <h2 className='flex text-center font-semibold mb-2 ml-[25%]'>Registration Successfully:</h2>
      <ul >
        {role === 'student' &&
         <ul >
          <li className='capitalize'>Role: {role}</li>
           <li>School: {formData.school}</li>
        <li >Grade: {formData?.grade}</li>

         </ul>
        }
       
      {
        role === 'teacher' && 
        <ul>
          <li className='capitalize'>Role: {role}</li>
           <li className='capitalize'>Subject: {formData.subject}</li>
        <li>Exp: {formData?.exp} Years</li>

         </ul>
      }
      {
        role === "professor" &&
         <ul>
          <li className='capitalize'> Role: {role}</li>
           <li className='capitalize'>Dept.: {formData.dept}</li>
        <li className='capitalize'>Research: {formData?.research}</li>

         </ul>
      }
       <li>Email: {formData.email}</li>
      </ul>
    </div>
    </>
  
  )
}

export default Success
