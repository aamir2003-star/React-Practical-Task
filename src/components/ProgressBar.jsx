import { useContext } from 'react';
import { StateManagerContext } from '../context/StateContext';

export default function ProgressBar({ progress, colorRules }) {
  const barColor =
    colorRules.find((c) => progress >= c.min && progress <= c.max)?.color ||
    'bg-gray-400';

  return (
    <div className="mt-2">
      <div className="text-sm mb-1">{progress}%</div>
      <div className="h-3 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full ${barColor} rounded-full transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
