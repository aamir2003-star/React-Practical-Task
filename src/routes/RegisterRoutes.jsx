// src/routes/RegisterRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import {
  DashboardLayout,
  Stage1,
  Stage2,
  Stage3,
  Success,
} from '../pages/index.js';

export default function RegisterRoutes() {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [completedStage, setCompletedStage] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
  });
  const [progress, setProgress] = useState(0);

  return (
    <Routes>
      <Route element={<DashboardLayout progress={progress} />}>
        <Route
          path="stage-1"
          element={
            <Stage1
              role={role}
              setRole={setRole}
              setCompletedStage={setCompletedStage}
              setProgress={setProgress}
            />
          }
        />

        <Route
          path="stage-2"
          element={
            completedStage.stage1 ? (
              <Stage2
                role={role}
                formData={formData}
                setFormData={setFormData}
                setCompletedStage={setCompletedStage}
                setProgress={setProgress}
              />
            ) : (
              <Navigate to="/register/stage-1" replace />
            )
          }
        />

        <Route
          path="stage-3"
          element={
            completedStage.stage2 ? (
              <Stage3
                setCompletedStage={setCompletedStage}
                setProgress={setProgress}
                setFormData={setFormData}
                role={role}
              />
            ) : (
              <Navigate to="/register/stage-1" replace />
            )
          }
        />

        <Route
          path="success"
          element={
            completedStage.stage3 ? (
              <Success
              role={role}
              formData={formData}
              />
            ) : (
              <Navigate to="/register/stage-1" replace />
            )
          }
        />
      </Route>
    </Routes>
  );
}
