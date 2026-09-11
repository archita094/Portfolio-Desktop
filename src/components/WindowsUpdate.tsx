import '@/styles/windowsupdate.css';
import { useState, useEffect } from 'react';

interface WindowsUpdateProps {
  onComplete: () => void;
}

const updateStages = [
  { text: 'Downloading important updates...', progress: 25 },
  { text: 'Installing system components...', progress: 55 },
  { text: 'Configuring desktop settings...', progress: 80 },
  { text: 'Updates installed successfully.', progress: 100 },
];

export function WindowsUpdate({ onComplete }: WindowsUpdateProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000;
    const steps = updateStages.length;
    const stepDuration = totalDuration / steps;

    const stageInterval = setInterval(() => {
      setStage(prev => {
        if (prev >= steps - 1) {
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, totalDuration / 50);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDuration + 400);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const current = updateStages[Math.min(stage, updateStages.length - 1)];

  return (
    <div
      className="fixed bottom-12 right-3 z-[9997] scale-in"
      style={{ animationDuration: '0.3s' }}
    >
      <div className="xp-update-window">
        {/* Title bar */}
        <div className="xp-titlebar">
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <svg width="16" height="16" viewBox="0 0 16 16" className="xp-titlebar-icon flex-shrink-0">
              <rect x="0" y="0" width="7" height="7" fill="#ff6030" />
              <rect x="9" y="0" width="7" height="7" fill="#4aa83a" />
              <rect x="0" y="9" width="7" height="7" fill="#3d8aff" />
              <rect x="9" y="9" width="7" height="7" fill="#ffcc00" />
            </svg>
            <span className="xp-titlebar-title">Windows Update</span>
          </div>
        </div>

        {/* Body */}
        <div className="xp-window-body p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-2xl flex-shrink-0">🔄</div>
            <div className="flex-1">
              <p className="text-sm font-bold mb-1" style={{ color: '#003c99' }}>
                Automatic Updates
              </p>
              <p className="text-xs text-gray-700">{current.text}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="xp-progress-bg mb-2">
            <div className="xp-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>{progress}%</span>
            <span>Archita OS Update</span>
          </div>

          {stage >= updateStages.length - 1 && (
            <div className="mt-3 text-xs text-green-700 fade-in">
              ✓ Your system is up to date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
