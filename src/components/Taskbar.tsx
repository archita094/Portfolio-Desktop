import '@/styles/taskbar.css';
import { useState, useEffect, useRef } from 'react';
import { useDesktopStore } from '@/store/desktop';
import { useClock } from '@/hooks/useLocalStorage';
import { fileSystem, type FSNode } from '@/data/fileSystem';
import type { DesktopIconDef } from '@/components/Desktop';
import { Wifi } from 'lucide-react';
import avatar from "../assets/cat.jpg";

interface TaskbarProps {
  onOpenWindow: (def: DesktopIconDef) => void;
}

// Build start menu items from file system
const folderItems: {
  label: string;
  icon: string;
  component: string;
  id: string;
  data: Record<string, unknown>;
}[] = (fileSystem.children || [])
  .filter((n: FSNode) => n.type === 'folder')
  .map((n: FSNode) => ({
    label: n.name,
    icon: n.icon,
    component: 'fileexplorer',
    id: n.name,
    data: { path: [n.name] },
  }));

const appItems: {
  label: string;
  icon: string;
  component: string;
  id: string;
}[] = [
  {
    label: 'About Me',
    icon: '👤',
    component: 'aboutme',
    id: 'aboutme',
  },
  {
    label: 'Command Prompt',
    icon: '💻',
    component: 'terminal',
    id: 'terminal',
  },
  {
    label: 'Bug Catcher Game',
    icon: '🎮',
    component: 'game',
    id: 'game',
  },
  {
    label: 'Resume',
    icon: '📄',
    component: 'resume',
    id: 'resume',
  },
  {
    label: 'Contact',
    icon: '📧',
    component: 'contact',
    id: 'contact',
  },
];

export function Taskbar({ onOpenWindow }: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false);

  const {
    windows,
    activeId,
    focusWindow,
    minimizeWindow,
  } = useDesktopStore();

  const clock = useClock();
  const startRef = useRef<HTMLDivElement>(null);

  // Fake battery percentage.
  // Starts between 80% and 100%.
  const [battery, setBattery] = useState(
    () => Math.floor(Math.random() * 21) + 80
  );

  // Decrease battery by 1% every minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => Math.max(0, prev - 1));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Close Start Menu when clicking outside.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        startRef.current &&
        !startRef.current.contains(e.target as Node)
      ) {
        setStartOpen(false);
      }
    };

    if (startOpen) {
      document.addEventListener('mousedown', handler);

      return () => {
        document.removeEventListener('mousedown', handler);
      };
    }
  }, [startOpen]);

  // Format time as 12-hour time.
  const formatTime = (d: Date) => {
    let h = d.getHours();
    const m = d.getMinutes();

    const ampm = h >= 12 ? 'PM' : 'AM';

    h = h % 12 || 12;

    return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  // Format date.
  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Open an item from the Start Menu.
  const openFromMenu = (item: {
    id: string;
    label: string;
    icon: string;
    component: string;
    data?: Record<string, unknown>;
  }) => {
    const def: DesktopIconDef = {
      id: item.id,
      label: item.label,
      icon: item.icon,
      component: item.component,
      data: item.data,
    };

    onOpenWindow(def);
    setStartOpen(false);
  };

  return (
    <>
      {/* =========================
          START MENU
      ========================== */}
      {startOpen && (
        <div
          ref={startRef}
          className="xp-start-menu absolute bottom-10 left-0 z-[9999] scale-in"
        >
          {/* Header */}
          <div className="xp-start-menu-header hi">
            <div className=" taskbar-pic rounded flex items-center justify-center bg-white/20">
  <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded" />
</div>

            <div>
              <div className="text-white font-bold text-sm">
                Archita
              </div>

              <div className="text-white text-xs opacity-80">
                Computer Science Engineer
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Folder Items */}
            {folderItems.map((item) => (
              <div
                key={item.id}
                className="xp-start-menu-item"
                onClick={() => openFromMenu(item)}
              >
                <span className="text-lg flex-shrink-0">
                  {item.icon}
                </span>

                <span className="font-bold">
                  {item.label}
                </span>
              </div>
            ))}

            <div className="xp-start-menu-divider" />

            {/* Application Items */}
            {appItems.map((item) => (
              <div
                key={item.id}
                className="xp-start-menu-item"
                onClick={() => openFromMenu(item)}
              >
                <span className="text-lg flex-shrink-0">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </div>
            ))}

            <div className="xp-start-menu-divider" />

            {/* Professional Mode */}
            <div
              className="xp-start-menu-item"
              onClick={() => {
                onOpenWindow({
                  id: 'pro-mode',
                  label: 'Professional Mode',
                  icon: '📋',
                  component: 'about',
                });

                setStartOpen(false);
              }}
            >
              <span className="text-lg flex-shrink-0">
                📋
              </span>

              <span>
                Switch to Professional Mode
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          TASKBAR
      ========================== */}
      <div className="xp-taskbar absolute bottom-0 left-0 right-0 flex items-center px-0 gap-1 z-[9998]">
        {/* Start Button */}
        <button
          className={`xp-start-btn ${startOpen ? 'open' : ''}`}
          onClick={() => setStartOpen(!startOpen)}
          style={{ height: '38px' }}
        >
          <span className="text-lg">
            🪟
          </span>

          <span>
            start
          </span>
        </button>

        {/* Separator */}
        <div
          className="w-px h-7 mx-1"
          style={{
            background: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* =========================
            SYSTEM TRAY
        ========================== */}
        <div
          className="flex items-center ml-auto justify-end text-white text-xs h-full"
          style={{
            textShadow:
              '1px 1px 1px rgba(0,0,0,0.3)',
          }}
        >
          {/* Language */}
          <div
            className="flex items-center px-2 text-base h-full"
            title="Keyboard language"
          >
            <span>
              ENG
            </span>
          </div>

 {/* Wi-Fi */}
          <div
            className="flex items-center px-2 h-full"
            title="Wi-Fi"
          >
            <Wifi size={20} strokeWidth={2.5} />
          </div>
          {/* Speaker */}
          <div
            className="flex items-center px-2 h-full"
            title="Volume"
          >
            <span className="text-xl">
              🔊
            </span>
          </div>


          {/* Battery */}
          <div
            className="flex items-center  px-2 h-full"
            title={`Battery: ${battery}%`}
          >
            <span className="text-sm">
              🔋
            </span>

            <span className="text-sm">
              {battery}%
            </span>
          </div>

          {/* Date + Time */}
          <div
            className="flex flex-col justify-center items-center text-sm px-3 h-full leading-tight"
            title={formatDate(clock)}
          >
            <span>
              {formatTime(clock)}
            </span>

            <span>
              {formatDate(clock)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}