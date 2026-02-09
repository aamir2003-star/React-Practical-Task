import React, { createContext, useState } from 'react'

export const StateManagerContext = createContext()
const StateContext = ({children}) => {
    const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [completedStage, setCompletedStage] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
  });
  const [progress, setProgress] = useState(33);
  return (
    <div>
      <StateManagerContext.Provider value={{role, setRole, formData, setFormData, completedStage, setCompletedStage, progress, setProgress}}>
      {children}
      </StateManagerContext.Provider>
    
    </div>
  )
}

export default StateContext
