import React, { useContext } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateManagerContext } from '../../context/StateContext';

const Teacher = () => {
  const firstInvalid = useRef();
  const secondInvalid = useRef();
  const navigate = useNavigate();
  const { setFormData, formData, setCompletedStage, setProgress } =
    useContext(StateManagerContext);
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
  const handleExperience = (e) => {
    if (e.target.value < 0 || e.target.value > 40) {
      alert('Years of experince should be in positive ');
      secondInvalid.current.value = '';
    } else {
      setFormData({ ...formData, exp: e.target.value });
    }
  };
  return (
    <>
      <form action="" onSubmit={submit}>
        <input
          ref={firstInvalid}
          placeholder="Subject"
          className="w-full border px-3 py-2 rounded-md mb-2"
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
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
        className={`w-full bg-orange-500 text-white py-2 rounded-md delay-100`}
      >
        Next
      </button>
    </>
  );
};

export default Teacher;
