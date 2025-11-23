import { useEffect, useState } from "react";

interface ProgressChartProps {
  completed: number;
  total: number;
  label?: string;
}

const ProgressChart = ({ completed, total, label = "완료율" }: ProgressChartProps) => {
  const [progress, setProgress] = useState(0);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 animate-scale-in">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {progress}%
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {completed} / {total} 완료
        </p>
      </div>
    </div>
  );
};

export default ProgressChart;
