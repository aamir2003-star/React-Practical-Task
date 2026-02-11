import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateManagerContext } from '../context/StateContext';

const Home = () => {
  const navigate = useNavigate();
  const { role , setRole, setProgress, } = useContext(StateManagerContext); 
  const handleClick = () => {
    navigate('/register/stage-1');
  };
  const handleSuccess = ()=>{
    window.location.reload()
  }
  return (
    <>
    {role === '' ? (
       <div className="flex flex-col mt-[15%] items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Welcome to the Portal </h1>
        <p className="text-xl font-semibold ">
          Complete your role-based registration to get started
        </p>
        <button
          onClick={() => {
            handleClick();
          }}
          className="bg-blue-500 px-3 py-4 mt-3 rounded-xl hover:bg-blue-600 cursor-pointer active:bg-green-600 hover:text-white duration-300"
        >
          Start Registration
        </button>
      </div>
    ): (
      <div className="flex flex-col mt-[15%] items-center justify-center gap-3">
        <h1 className="text-4xl font-bold capitalize">Welcome {role} </h1>
        <p className="text-xl font-semibold ">
            Your Registration is completed
              </p>
        <button
          onClick={() => {
            handleSuccess();
          }}
          className="bg-green-500 px-3 py-4 mt-3 rounded-xl hover:bg-green-600 cursor-pointer active:bg-blue-600 hover:text-white duration-300"
        >
          Go to Dashboard Home
        </button>
      </div>
    )}
     
    </>
  );
};

export default Home;
