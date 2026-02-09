import React from 'react';

const StageIndicator = ({ progress }) => {
  const stage =
    progress < 66
      ? 'Stage 1 / 3'
      : progress < 99
        ? 'Stage 2 / 3'
        : 'Stage 3 / 3';
  return <div className="text-sm text-gray-600 mb-2">{stage}</div>;
};

export default StageIndicator;
