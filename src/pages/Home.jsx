import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
    const handleClick = ()=>{
    navigate('/register/stage-1')
  }
  useEffect(()=>{
    handleClick
  }, [])

  return (

    <>


    <div className='flex flex-col mt-[15%] items-center justify-center gap-3'>
      <h1 className='text-4xl font-bold'>Welcome to the Portal </h1>
      <p className='text-xl font-semibold '>Complete your role-based registration to get started</p>
      <button 
      onClick={()=>{
        handleClick()
      }}
      className='bg-blue-500 px-3 py-4 mt-3 rounded-xl hover:bg-blue-600 cursor-pointer active:bg-green-600 hover:text-white duration-300'> 
      Start Registration
      </button>
    </div>
    </>
  )
}

export default Home
