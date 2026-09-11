import '@/styles/bootscreen.css';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BootScreenProps {
  onComplete: () => void;
}

const bootStages = [
  { text: 'Starting Archita OS...', progress: 20 },
  { text: 'Loading system components...', progress: 45 },
  { text: 'Preparing desktop...', progress: 70 },
  { text: 'Loading personal settings...', progress: 90 },
  { text: 'Welcome', progress: 100 },
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [hasSeen, setHasSeen] = useLocalStorage<boolean>('archita-os-booted', false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (hasSeen && !skipped) {
      const timer = setTimeout(() => onComplete(), 600);
      return () => clearTimeout(timer);
    }

    if (skipped) {
      onComplete();
      return;
    }

    const totalSteps = bootStages.length;
    const stepDuration = 700;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setStage(Math.min(currentStep - 1, totalSteps - 1));

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setProgress(100);
        setHasSeen(true);
        setTimeout(() => onComplete(), 600);
      } else {
        setProgress(bootStages[Math.min(currentStep - 1, totalSteps - 1)].progress);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [hasSeen, skipped, onComplete, setHasSeen]);

  if (hasSeen && !skipped) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center xp-boot-logo">
        <div className="text-center">
          <BootLogo />
          <div className="mt-6 xp-boot-bar-track mx-auto" style={{ width: 200 }}>
            <div className="xp-boot-bar-fill" style={{ width: '100%' }} />
          </div>
          <div className="mt-3 text-xs text-gray-400">Welcome back...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center xp-boot-logo">
      <div className="text-center">
        {/* Windows-style logo */}
        <BootLogo />

        {/* Loading text */}
        <div className="mt-8 min-h-[20px]">
          <p className="text-sm text-gray-300 fade-in" key={stage}>
            {bootStages[Math.min(stage, bootStages.length - 1)].text}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-4 mx-auto" style={{ width: 240 }}>
          <div className="xp-boot-bar-track">
            <div className="xp-boot-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Skip button */}
        {!skipped && (
          <button
            className="mt-8 text-xs text-gray-500 underline hover:text-gray-300 transition cursor-pointer"
            onClick={() => { setSkipped(true); setHasSeen(true); }}
          >
            [ Skip ]
          </button>
        )}
      </div>
    </div>
  );
}

function BootLogo() {
  return (
    <svg width="60" height="50" viewBox="0 0 60 50">
      <rect x="0" y="0" width="28" height="23" fill="#ff6030" rx="1" />
      <rect x="32" y="0" width="28" height="23" fill="#4aa83a" rx="1" />
      <rect x="0" y="27" width="28" height="23" fill="#3d8aff" rx="1" />
      <rect x="32" y="27" width="28" height="23" fill="#ffcc00" rx="1" />
    </svg>
  );
}
