import React, { useContext } from 'react';
import { StateManagerContext } from '../../context/StateContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Student = () => {
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
      return;    } else if (formData.school && formData.school.length < 2) {
      alert('School name must be at least 2 characters long');
      firstInvalid.current.focus();
      return;    } else {
      setCompletedStage((p) => ({ ...p, stage2: true }));
      navigate('/register/stage-3');
    }
  };
  const handleGrade = (e) => {
    if (e.target.value < 1 || e.target.value > 12) {
      alert('Grade must be between 1 and 12');
      secondInvalid.current.value = '';
      setFieldCompleted((prev) => ({
        ...prev,
        stage2: [prev.stage2[0], false],
      }));
    } else {
      setFormData({ ...formData, grade: e.target.value });
      setFieldCompleted((prev) => ({
        ...prev,
        stage2: [prev.stage2[0], true],
      }));
    }
  };

  const handleSchool = (e) => {
    setFormData({ ...formData, school: e.target.value });
    setFieldCompleted((prev) => ({
      ...prev,
      stage2: [e.target.value.trim() ? true : false, prev.stage2[1]],
    }));
  };

  return (
    <>
      <form onSubmit={submit}>
        <input
          ref={firstInvalid}
          placeholder="School Name"
          className="w-full border px-3 py-2 rounded-md mb-2"
          onChange={handleSchool}
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
  );
};

export default Student;
