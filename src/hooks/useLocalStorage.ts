import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  const setStored = useCallback((v: T | ((prev: T) => T)) => {
    setValue(prev => {
      const next = v instanceof Function ? v(prev) : v;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, [key]);

  return [value, setStored];
}

export function useXP() {
  const [xp, setXP] = useLocalStorage<number>('archita-os-xp', 0);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage<string[]>(
    'archita-os-achievements',
    []
  );

  const addXP = useCallback((amount: number) => {
    setXP(prev => prev + amount);
  }, [setXP]);

  const unlockAchievement = useCallback((id: string, xpReward = 50) => {
    setUnlockedAchievements(prev => {
      if (prev.includes(id)) return prev;
      setXP(p => p + xpReward);
      return [...prev, id];
    });
  }, [setUnlockedAchievements, setXP]);

  return { xp, addXP, unlockAchievement, unlockedAchievements };
}

export function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export function useKonamiCode(callback: () => void) {
  useEffect(() => {
    const target = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === target[pos]) {
        pos++;
        if (pos === target.length) {
          callback();
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}
