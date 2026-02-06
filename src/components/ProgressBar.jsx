const colors = [
  { min: 0, max: 32, color: "bg-red-500" },
  { min: 33, max: 65, color: "bg-orange-500" },
  { min: 66, max: 99, color: "bg-blue-500" },
  { min: 100, max: 100, color: "bg-green-500" },
];

export default function ProgressBar({ progress }) {
  const barColor =
    colors.find((c) => progress >= c.min && progress <= c.max)?.color ||
    "bg-gray-400";

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
