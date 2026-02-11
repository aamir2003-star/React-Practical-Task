import React, { useContext, useRef } from 'react';
import { StateManagerContext } from '../../context/StateContext';
import { useNavigate } from 'react-router-dom';

const Professor = () => {
  const {
    formData,
    setFormData,
    setCompletedStage,
    setFieldCompleted,
  } = useContext(StateManagerContext);
  const firstInvalid = useRef();
  const secondInvalid = useRef();
  const navigate = useNavigate();

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
    } else if (formData.dept && formData.dept.length < 2) {
      alert('Department must be at least 2 characters long');
      firstInvalid.current.focus();
      return;
    } else if (formData.research && formData.research.length < 2) {
      alert('Research area must be at least 2 characters long');
      secondInvalid.current.focus();
      return;
    } else {
      setCompletedStage((p) => ({ ...p, stage2: true }));
      navigate('/register/stage-3');
    }
  };

  const handleDept = (e) => {
    setFormData({ ...formData, dept: e.target.value });
    setFieldCompleted((prev) => ({
      ...prev,
      stage2: [e.target.value.trim() ? true : false, prev.stage2[1]],
    }));
  };

  const handleResearch = (e) => {
    setFormData({ ...formData, research: e.target.value });
    setFieldCompleted((prev) => ({
      ...prev,
      stage2: [prev.stage2[0], e.target.value.trim() ? true : false],
    }));
  };

  return (
    <>
      <form action="" onSubmit={submit}>
        <input
          ref={firstInvalid}
          placeholder="Department"
          className="w-full border px-3 py-2 rounded-md mb-2"
          onChange={handleDept}
        />
        <input
          placeholder="Research Area"
          ref={secondInvalid}
          className="w-full border px-3 py-2 rounded-md mb-4"
          onChange={handleResearch}
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
  );
};

export default Professor;
