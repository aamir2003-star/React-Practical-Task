import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormError from '../components/FormError';
import { StateManagerContext } from '../context/StateContext';

const Stage1 = () => {
  const { role, setRole, setCompletedStage, setProgress, setFieldCompleted } =
    useContext(StateManagerContext);
  const [error, setError] = useState('');
  const selectRef = useRef();

  const navigate = useNavigate();
  const next = (e) => {
    e.preventDefault();
    if (!role) {
      setError('Select a role to move forward');
      selectRef.current.focus();
      return;
    }

    setCompletedStage((p) => ({ ...p, stage1: true }));
    navigate('/register/stage-2');
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFieldCompleted((prev) => ({
      ...prev,
      stage1: [e.target.value ? true : false],
    }));
  };

  return (
    <>
      <h2 className="font-semibold mb-4">Stage 1 / 3: Role Selection</h2>
      <form action="" onSubmit={next}>
        <select
          ref={selectRef}
          className="w-full border px-3 py-2 rounded-md mb-2"
          value={role}
          onChange={handleRoleChange}
        >
          <option>Select your role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="professor">Professor</option>
        </select>
        <FormError message={error} />
        <button
          onClick={(e) => {
            next(e);
          }}
          className={`w-full  bg-red-500 text-white py-2 rounded-lg cursor-pointer hover:bg-red-600`}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default Stage1;
