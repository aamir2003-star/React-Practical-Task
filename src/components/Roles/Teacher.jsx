import React, { useContext } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateManagerContext } from '../../context/StateContext';

const Teacher = () => {
  const firstInvalid = useRef();
  const secondInvalid = useRef();
  const navigate = useNavigate();
  const {
    setFormData,
    formData,
    setCompletedStage,
    setProgress,
    setFieldCompleted,
  } = useContext(StateManagerContext);
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
    } else if (formData.subject && formData.subject.length < 2) {
      alert('Subject must be at least 2 characters long');
      firstInvalid.current.focus();
      return;
    } else {
      setCompletedStage((p) => ({ ...p, stage2: true }));
      navigate('/register/stage-3');
    }
  };
  const handleExperience = (e) => {
    if (e.target.value < 0 || e.target.value > 40) {
      alert('Years of experience should be positive');
      secondInvalid.current.value = '';
      setFieldCompleted((prev) => ({
        ...prev,
        stage2: [prev.stage2[0], false],
      }));
    } else {
      setFormData({ ...formData, exp: e.target.value });
      setFieldCompleted((prev) => ({
        ...prev,
        stage2: [prev.stage2[0], true],
      }));
    }
  };

  const handleSubject = (e) => {
    setFormData({ ...formData, subject: e.target.value });
    setFieldCompleted((prev) => ({
      ...prev,
      stage2: [e.target.value.trim() ? true : false, prev.stage2[1]],
    }));
  };

  return (
    <>
      <form action="" onSubmit={submit}>
        <input
          ref={firstInvalid}
          placeholder="Subject"
          className="w-full border px-3 py-2 rounded-md mb-2"
          onChange={handleSubject}
        />
        <input
          type="number"
          ref={secondInvalid}
          placeholder="Experience"
          className="w-full border px-3 py-2 rounded-md mb-4"
          onChange={(e) => handleExperience(e)}
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

export default Teacher;
