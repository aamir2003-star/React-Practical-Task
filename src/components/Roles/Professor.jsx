import React, { useContext, useRef } from 'react';
import { StateManagerContext } from '../../context/StateContext';
import { useNavigate } from 'react-router-dom';

const Professor = () => {
  const {  formData, setFormData, setCompletedStage, setProgress } =
    useContext(StateManagerContext);
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
    } else {
      setCompletedStage((p) => ({ ...p, stage2: true }));
      setProgress(99);
      navigate('/register/stage-3');
    }
  };
  return (
    <>
      <form action="" onSubmit={submit}>
        <input
          ref={firstInvalid}
          placeholder="Department"
          className="w-full border px-3 py-2 rounded-md mb-2"
          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
        />
        <input
          placeholder="Research Area"
          ref={secondInvalid}
          className="w-full border px-3 py-2 rounded-md mb-4"
          onChange={(e) =>
            setFormData({ ...formData, research: e.target.value })
          }
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

export default Professor;
