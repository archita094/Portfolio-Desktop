import '@/styles/desktop.css';
import { useState, useEffect, useCallback } from 'react';
import { useXP } from '@/hooks/useLocalStorage';
import { useDesktopStore } from '@/store/desktop';
import { fileSystem, type FSNode } from '@/data/fileSystem';

export interface DesktopIconDef {
  id: string;
  label: string;
  icon: string;
  component: string;
  image?: string;
  data?: Record<string, unknown>;
}

interface DesktopProps {
  onOpenWindow: (def: DesktopIconDef) => void;
}

// Build desktop icons from the file system's top-level children
const desktopIcons: DesktopIconDef[] = (fileSystem.children || []).map((node: FSNode) => ({
  id: node.name,
  label: node.name,
  icon: node.icon,
  component: node.appId || (node.name === 'About Me' ? 'aboutme' : 'fileexplorer'),
  data: { path: [node.name] },
}));

// Add special icons
desktopIcons.push(
  { id: 'resume', label: 'Resume.pdf', icon: '📄', component: 'resume' },
  { id: 'terminal', label: 'Command Prompt', icon: '💻', component: 'terminal' },
  { id: 'game', label: 'Bug Catcher', icon: '🎮', component: 'game' },
  { id: 'donotopen', label: 'DO NOT OPEN', icon: '⚠', component: 'donotopen', data: {} },
);

export function DesktopIcons({ onOpenWindow }: DesktopProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleDoubleClick = useCallback((def: DesktopIconDef) => {
    onOpenWindow(def);
    setSelected(null);
  }, [onOpenWindow]);

  return (
    <div
      className="absolute top-4 left-4 flex flex-col flex-wrap gap-1"
      style={{ maxHeight: 'calc(100vh - 100px)' }}
      onClick={() => setSelected(null)}
    >
      {desktopIcons.map(def => (
        <div
          key={def.id}
          className={`desktop-icon ${selected === def.id ? 'selected' : ''} ${def.id === 'donotopen' ? 'cursor-warning' : 'cursor-hand'}`}
          onClick={(e) => { e.stopPropagation(); setSelected(def.id); }}
          onDoubleClick={() => handleDoubleClick(def)}
        >
          <div className="desktop-icon-img">
            <XPIcon type={def.id} />
          </div>
          <span className={`desktop-icon-label ${def.id === 'donotopen' ? 'text-red-300' : ''}`}>
            {def.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const iconImageMap: Record<string, string> = {
  'About Me': '/icons/about-me.png',
  'aboutme': '/icons/about-me.png',
  'My Projects': '/icons/projects.png',
  'projects': '/icons/projects.png',
  'Resume.pdf': '/icons/resume.png',
  'resume': '/icons/resume.png',
  'Command Prompt': '/icons/terminal.png',
  'terminal': '/icons/terminal.png',
  'Bug Catcher': '/icons/Bug-Catcher.png',
  'game': '/icons/Bug-Catcher.png',
  'DO NOT OPEN': '/icons/do-not-open.png',
  'donotopen': '/icons/do-not-open.png',
  'Recycle Bin': '/icons/recyclebin.png',
  'recyclebin': '/icons/recyclebin.png',
};

/** Desktop icon rendering using custom PNG images or fallback SVG */
function XPIcon({ type }: { type: string }) {
  const imageSrc = iconImageMap[type];

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={type}
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
      />
    );
  }

  return (
    <svg width="40" height="40" viewBox="0 0 32 32">
      <path d="M4,8 L12,8 L14,10 L28,10 L28,26 L4,26 Z" fill="#e0a820" stroke="#806010" strokeWidth="0.5" />
      <path d="M4,11 L28,11 L28,26 L4,26 Z" fill="#ffcc44" stroke="#806010" strokeWidth="0.5" />
      <path d="M5,12 L27,12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}
export function XPIndicator() {
  const { xp, unlockedAchievements } = useXP();
  return (
    <div className="absolute top-3 right-3 z-50">
      <div className="xp-outset" style={{ padding: '6px 10px' }}>
        <div className="text-xs font-bold" style={{ color: '#003c99' }}>XP: {xp}</div>
        <div className="text-xs text-gray-600 mt-1">🏆 {unlockedAchievements.length}</div>
      </div>
    </div>
  );
}