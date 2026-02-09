import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages';

import StageRouting from './StageRouting';

const IndexRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/*" element={<StageRouting />} />
        <Route path="/*" element={<Navigate to={'/register/stage-1'} />} />
      </Routes>
    </>
  );
};

export default IndexRoutes;
