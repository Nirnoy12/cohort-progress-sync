interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProgressBar = ({ percentage, showLabel = true, size = "md" }: ProgressBarProps) => {
  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const getColorClass = (pct: number) => {
    if (pct === 100) return "bg-gdg-green";
    if (pct >= 75) return "bg-gdg-blue";
    if (pct >= 50) return "bg-gdg-yellow";
    return "bg-gdg-red";
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-muted rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${getColorClass(percentage)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground mt-1 inline-block">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
