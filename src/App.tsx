import { useState, useEffect, useCallback } from 'react';
import { useDesktopStore } from '@/store/desktop';
import { useXP, useKonamiCode } from '@/hooks/useLocalStorage';
import { BootScreen } from '@/components/BootScreen';
import { Wallpaper } from '@/components/Wallpaper';
import { DesktopIcons, XPIndicator, type DesktopIconDef } from '@/components/Desktop';
import { Taskbar } from '@/components/Taskbar';
import { Window } from '@/components/Window';
import { WindowRenderer } from '@/components/WindowRenderer';
import { WelcomeWindow } from '@/components/WelcomeWindow';
import { MobileLayout } from '@/components/MobileLayout';
import { ProfessionalMode } from '@/components/ProfessionalMode';

type Theme = 'day' | 'sunset' | 'night';

const windowDefaults: Record<string, { title: string; icon: string; width: number; height: number }> = {
  aboutme: { title: 'ARCHITA.EXE — About Me', icon: '👤', width: 920, height: 640 },
  fileexplorer: { title: 'File Explorer', icon: '📁', width: 680, height: 500 },
  notepad: { title: 'Notepad', icon: '📝', width: 520, height: 420 },
  imageviewer: { title: 'Windows Picture and Fax Viewer', icon: '🖼', width: 640, height: 500 },
  'project-launcher': { title: 'Project Showcase', icon: '🚀', width: 880, height: 600 },
  resume: { title: 'Resume — Archita Srivastava', icon: '📄', width: 560, height: 560 },
  contact: { title: 'Contact — Send a Message', icon: '📧', width: 480, height: 500 },
  terminal: { title: 'Command Prompt — C:\\Archita', icon: '💻', width: 560, height: 400 },
  recyclebin: { title: 'Recycle Bin', icon: '🗑', width: 520, height: 420 },
  donotopen: { title: 'DO NOT OPEN', icon: '⚠', width: 420, height: 300 },
  randomstuff: { title: 'Random Stuff', icon: '🎲', width: 520, height: 420 },
  game: { title: 'Bug Catcher — Game', icon: '🎮', width: 480, height: 400 },
  error404: { title: '404 — Not Found', icon: '🔍', width: 420, height: 300 },
};

function App() {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [proMode, setProMode] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const { windows, openWindow } = useDesktopStore();
  const { addXP, unlockAchievement } = useXP();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useKonamiCode(() => {
    unlockAchievement('konami', 100);
    addXP(100);
    openWindow({
      id: 'konami',
      title: 'SECRET UNLOCKED',
      icon: '🎮',
      component: 'error404',
      x: 300, y: 150, width: 400, height: 250,
    });
  });

  const handleOpenWindow = useCallback((def: DesktopIconDef) => {
    if (def.id === 'pro-mode') {
      setProMode(true);
      return;
    }

    if (def.id === 'resume' || def.component === 'resume') {
      window.open('https://drive.google.com/file/d/13OqFPTmUOviOPkgp224m4CzVPp5ZcEAk/view', '_blank', 'noopener,noreferrer');
      return;
    }

    const defaults = windowDefaults[def.component] || { title: def.label, icon: def.icon, width: 500, height: 400 };
    const offset = windows.length * 24;

    let winTitle = defaults.title;
    if (def.component === 'fileexplorer') {
      winTitle = def.label ? `${def.label} — File Explorer` : defaults.title;
    } else if (def.component === 'project-launcher' && def.label) {
      winTitle = `${def.label} — Project Showcase`;
    } else if (def.label && !windowDefaults[def.component]) {
      winTitle = def.label;
    }

    openWindow({
      id: def.id,
      title: winTitle,
      icon: def.icon || defaults.icon,
      component: def.component,
      x: 120 + offset,
      y: 60 + offset,
      width: defaults.width,
      height: defaults.height,
      data: def.data,
    });
  }, [windows.length, openWindow]);

  // Open welcome window after boot
  useEffect(() => {
    if (booted && !welcomeShown && !isMobile && !proMode) {
      setWelcomeShown(true);
      setTimeout(() => {
        openWindow({
          id: 'welcome',
          title: '',
          icon: '🖥',
          component: 'welcome',
          x: 240, y: 80, width: 520, height: 440,
        });
      }, 300);
    }
  }, [booted, welcomeShown, isMobile, proMode, openWindow]);

  const theme: Theme = windows.some(w => w.id === 'contact') ? 'night'
    : windows.some(w => w.id === 'resume' || w.id === 'donotopen') ? 'sunset'
    : 'day';

  if (!booted && !isMobile) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  if (isMobile) {
    return <ProfessionalMode />;
  }

  if (proMode) {
    return <ProfessionalMode onExit={() => setProMode(false)} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Wallpaper theme={theme}>
        <DesktopIcons onOpenWindow={handleOpenWindow} />
        <XPIndicator />

        {windows.map(win => (
          <Window key={win.id} win={win}>
            {win.id === 'welcome' ? (
              <WelcomeWindow onOpenWindow={handleOpenWindow} />
            ) : (
              <WindowRenderer win={win} />
            )}
          </Window>
        ))}
      </Wallpaper>

      <Taskbar onOpenWindow={handleOpenWindow} />
    </div>
  );
}

export default App;
