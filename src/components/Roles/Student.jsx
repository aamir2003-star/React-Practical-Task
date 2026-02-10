import React, { useContext } from 'react'
import { StateManagerContext } from '../../context/StateContext'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const firstInvalid = useRef();
    const secondInvalid = useRef();
    const navigate = useNavigate()
  const {setFormData, formData, setCompletedStage, setProgress} = useContext(StateManagerContext)
   const submit = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).some(
        (v) => v === '' || firstInvalid.current.value === ''
      )
    ) {
      firstInvalid.current.focus();
      return;
    } else if (secondInvalid.current.value === '') {
      secondInvalid.current.focus();
      return;
    } else {
      setCompletedStage((p) => ({ ...p, stage2: true }));
      setProgress(99);
      navigate('/register/stage-3');
    }
  };
    const handleGrade = (e) => {
    if (e.target.value < 1 || e.target.value > 12) {
      alert('Grade must be between 1 and 12');
      secondInvalid.current.value = '';
    } else {
      setFormData({ ...formData, grade: e.target.value });
    }
  };
  return (
     <>
          <form onSubmit={submit}>
            <input
              ref={firstInvalid}
              placeholder="School Name"
              className="w-full border px-3 py-2 rounded-md mb-2"
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
            />
            <input
              type="number"
              ref={secondInvalid}
              placeholder="Grade"
              className="w-full border px-3 py-2 rounded-md mb-4"
              onChange={(e) => handleGrade(e)}
            />
          </form>
             <button
        onClick={(e) => {
          submit(e);
        }}
        className={`w-full bg-orange-500 text-white py-2 rounded-md delay-100 hover:bg-orange-600 cursor-pointer`}
      >
        Next
      </button>
        </>
  )
}

export default Student
