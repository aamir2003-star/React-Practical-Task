import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateManagerContext } from '../context/StateContext';

const Success = () => {
  const { formData, role } = useContext(StateManagerContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  return (
    <>
      <div>
        <h2 className="flex text-center text-2xl font-semibold mb-2 ml-[15%]">
          Registration Successful
        </h2>
        <ul>
          {role === 'student' && (
            <ul>
              <li className="capitalize text-lg">Role: {role}</li>
              <li className="text-lg">School: {formData.school}</li>
              <li className="text-lg">Grade: {formData?.grade}</li>
            </ul>
          )}
          {role === 'teacher' && (
            <ul>
              <li className="capitalize text-lg">Role: {role}</li>
              <li className="capitalize text-lg">
                Subject: {formData.subject}
              </li>
              <li className="text-lg">Exp: {formData?.exp} Years</li>
            </ul>
          )}
          {role === 'professor' && (
            <ul>
              <li className="capitalize text-lg"> Role: {role}</li>
              <li className="capitalize text-lg">Dept.: {formData.dept}</li>
              <li className="capitalize text-lg">
                Research: {formData?.research}
              </li>
            </ul>
          )}
          <li>Email: {formData.email}</li>
        </ul>
        <p className="text-center mt-4">
          Redirecting to home page in {countdown} seconds...
        </p>
      </div>
    </>
  );
};

export default Success;
