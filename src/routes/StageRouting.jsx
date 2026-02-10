import React, { useContext } from 'react';
import { StateManagerContext } from '../context/StateContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout, Stage1, Stage2, Stage3, Success } from '../pages';
import NotFoundPage from '../components/NotFoundPage';

const StageRouting = () => {
  const { completedStage } = useContext(StateManagerContext);
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout  />}>
          <Route index element={<Navigate to="stage-1" replace />} />
          <Route path="stage-1" element={<Stage1 />} />

          <Route
            path="stage-2"
            element={
              completedStage.stage1 ? (
                <Stage2 />
              ) : (
                <Navigate to="/register/stage-1" replace />
              )
            }
          />

          <Route
            path="stage-3"
            element={
              completedStage.stage2 ? (
                <Stage3 />
              ) : (
                <Navigate to="/register/stage-1" replace />
              )
            }
          />

          <Route
            path="success"
            element={
              completedStage.stage3 ? (
                <Success />
              ) : (
                <Navigate to="/register/stage-1" replace />
              )
            }
          />
        </Route>
          <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default StageRouting;
