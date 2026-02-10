import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages';
import NotFoundPage from '../components/NotFoundPage';

import StageRouting from './StageRouting';

const IndexRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/*" element={<StageRouting />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default IndexRoutes;
