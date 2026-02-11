import React, { createContext, useState, useEffect } from 'react';
import colorRules from '../colorRules.json';

export const StateManagerContext = createContext();
const StateContext = ({ children }) => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [completedStage, setCompletedStage] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
  });
  const [fieldCompleted, setFieldCompleted] = useState({
    stage1: [false],
    stage2: [false, false],
    stage3: [false, false],
  });
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    let prog = 0;

    const stage1Completed = fieldCompleted.stage1.filter(Boolean).length;
    prog += (stage1Completed / fieldCompleted.stage1.length) * 33;

    const stage2Completed = fieldCompleted.stage2.filter(Boolean).length;
    prog += (stage2Completed / fieldCompleted.stage2.length) * 33;

    const stage3Completed = fieldCompleted.stage3.filter(Boolean).length;
    prog += (stage3Completed / fieldCompleted.stage3.length) * 33;
    return Math.min(Math.round(prog), 99);
  };

  useEffect(() => {
    if (completedStage.stage3) {
      setProgress(100);
    } else {
      setProgress(calculateProgress());
    }
  }, [fieldCompleted, completedStage]);

  return (
    <div>
      <StateManagerContext.Provider
        value={{
          role,
          setRole,
          formData,
          setFormData,
          completedStage,
          setCompletedStage,
          progress,
          setProgress,
          fieldCompleted,
          setFieldCompleted,
          colorRules,
        }}
      >
        {children}
      </StateManagerContext.Provider>
    </div>
  );
};

export default StateContext;
