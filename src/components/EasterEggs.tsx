import '@/styles/terminal.css';
import { useState, useRef, useEffect } from 'react';
import { useDesktopStore } from '@/store/desktop';
import { recycleBinItems, projects } from '@/data/portfolio';
import { fileSystem, resolvePath, type FSNode } from '@/data/fileSystem';
import "../styles/DoNotOpenWindow.css";
// ============ TERMINAL ============
export function TerminalWindow({ onXP, unlockAch }: { onXP?: (n: number) => void; unlockAch?: (id: string, xp?: number) => void }) {
  const [lines, setLines] = useState<{ type: 'in' | 'out'; text: string }[]>([
    { type: 'out', text: 'ARCHITA OS [Version 5.1.2600]' },
    { type: 'out', text: '(C) Copyright 2024 Archita Corp.' },
    { type: 'out', text: '' },
    { type: 'out', text: 'Type "help" for available commands.' },
    { type: 'out', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd, setCwd] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const seenCommands = useRef<Set<string>>(new Set());
  const store = useDesktopStore();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const promptStr = () => {
    if (cwd.length === 0) return 'C:\\Archita\\Desktop';
    return 'C:\\Archita\\Desktop\\' + cwd.join('\\');
  };

  const formatDir = (node: FSNode): string[] => {
    if (!node.children) return ['<empty>'];
    return node.children.map(c => {
      const modified = c.type === 'folder' ? '<DIR>      ' : `${String(c.content?.length || 0).padStart(8)}  `;
      const date = '09/06/2024  03:14 AM';
      return `${date}   ${modified}${c.name}`;
    });
  };

  const commands: Record<string, (args: string[]) => string[]> = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  dir      - List directory contents',
      '  cd       - Change directory (cd .. to go up)',
      '  open     - Open a file or folder (open <name>)',
      '  about    - About Archita',
      '  skills   - List skills',
      '  projects - List projects',
      '  cls      - Clear terminal',
      '  coffee   - Brew coffee',
      '  secret   - ???',
      '  sudo     - Try to get root access',
      '  exit     - Close terminal',
    ],
    dir: () => {
      const node = resolvePath(cwd);
      if (!node) return ['The system cannot find the path specified.'];
      const result = [` Directory of ${promptStr()}`, ''];
      return [...result, ...formatDir(node), ''];
    },
    cd: (args) => {
      if (!args[0] || args[0] === '.') return [];
      if (args[0] === '..') {
        setCwd(prev => prev.slice(0, -1));
        return [];
      }
      const target = [...cwd, args[0]];
      const node = resolvePath(target);
      if (!node || node.type !== 'folder') return ['The system cannot find the path specified.'];
      setCwd(target);
      return [];
    },
    open: (args) => {
      if (!args[0]) return ['Usage: open <filename>'];
      const node = resolvePath(cwd);
      if (!node || !node.children) return ['No files in current directory.'];
      const target = node.children.find(c => c.name.toLowerCase() === args[0].toLowerCase());
      if (!target) return [`Cannot find "${args[0]}".`];

      if (target.type === 'folder') {
        store.openWindow({
          id: `fileexplorer-${Date.now()}`,
          title: `${target.name} — File Explorer`,
          icon: '📁',
          component: 'fileexplorer',
          x: 120 + store.windows.length * 24, y: 60 + store.windows.length * 24,
          width: 640, height: 480,
          data: { path: [...cwd, target.name] },
        });
        return [`Opening folder: ${target.name}`];
      }

      if (target.type === 'text') {
        store.openWindow({
          id: `notepad-${Date.now()}`,
          title: `${target.name} — Notepad`,
          icon: '📝',
          component: 'notepad',
          x: 180, y: 80, width: 520, height: 420,
          data: { content: target.content, fileName: target.name },
        });
        return [`Opening file: ${target.name}`];
      }

      if (target.type === 'app' && target.appId === 'project-launcher') {
        store.openWindow({
          id: `project-${target.projectId}-${Date.now()}`,
          title: `${target.name} — Project Showcase`,
          icon: target.icon,
          component: 'project-launcher',
          x: 160, y: 70, width: 640, height: 520,
          data: { projectId: target.projectId },
        });
        return [`Launching: ${target.name}`];
      }

      if (target.type === 'url' && target.url) {
        window.open(target.url, '_blank', 'noopener,noreferrer');
        return [`Opening URL: ${target.url}`];
      }

      return [`Cannot open "${args[0]}".`];
    },
    about: () => [
      'Archita Srivastava',
      'Computer Science Engineering Student & Developer',
      'Web development • DSA • DBMS',
      'Occasionally argues with JavaScript.',
    ],
    skills: () => [
      'Languages:  C, C++, Java, Python, JavaScript',
      'Web:        HTML, CSS, Tailwind, Node.js, Express.js',
      'Databases:  SQL, MongoDB',
      'Core:       DSA, DBMS',
    ],
    projects: () => [
      '1. Restaurant Booking System  (restaurant.exe)',
      '2. Expense Tracker            (expenses.exe)',
      '3. Mental Health Website      (wellbeing.exe)',
      'Type "open <name>" to open a project folder.',
    ],
    cls: () => {
      setLines([]);
      return [];
    },
    coffee: () => {
      onXP?.(5);
      return ['☕ Brewing coffee...', '☕ Coffee ready!', 'Error: Cannot debug on an empty stomach. Coffee loaded successfully.'];
    },
    secret: () => {
      if (!seenCommands.current.has('secret')) {
        seenCommands.current.add('secret');
        unlockAch?.('terminal_secret', 50);
        onXP?.(50);
      }
      return [
        '...',
        'You found the secret command!',
        'CONGRATULATIONS',
        '',
        'The real treasure was the bugs we fixed along the way.',
        'Achievement unlocked: Curious Explorer (+50 XP)',
      ];
    },
    sudo: () => [
      'archita is not in the sudoers file. This incident will be reported.',
      '...just kidding. You seem like a trustworthy person.',
      'Access denied. But nicely.',
    ],
    exit: () => {
      useDesktopStore.getState().closeWindow('terminal');
      return [];
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const newLines = [...lines, { type: 'in' as const, text: `${promptStr()}> ${cmd}` }];

    if (trimmed === '') {
      setLines([...newLines]);
      return;
    }

    setHistory(prev => [...prev, trimmed]);
    setHistIdx(-1);

    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmdName]) {
      const output = commands[cmdName](args);
      setLines([...newLines, ...output.map(t => ({ type: 'out' as const, text: t }))]);
    } else {
      setLines([...newLines, { type: 'out', text: `'${cmdName}' is not recognized as a command. Type "help".` }]);
    }

    onXP?.(5);
    if (!seenCommands.current.has(cmdName)) {
      seenCommands.current.add(cmdName);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx !== -1) {
        const idx = histIdx + 1;
        if (idx >= history.length) {
          setHistIdx(-1);
          setInput('');
        } else {
          setHistIdx(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  return (
    <div className="terminal-screen p-3 h-full flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="flex-1 overflow-auto os-scroll">
        {lines.map((line, i) => (
          <div key={i} className={line.type === 'in' ? 'text-yellow-300' : ''}>
            {line.text || '\u00a0'}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-1">
        <span className="text-yellow-300">{promptStr()}&gt;&nbsp;</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}

// ============ RECYCLE BIN ============
export function RecycleBinWindow({ onXP, unlockAch }: { onXP?: (n: number) => void; unlockAch?: (id: string, xp?: number) => void }) {
  const [selected, setSelected] = useState<typeof recycleBinItems[0] | null>(null);
  useEffect(() => { onXP?.(10); }, [onXP]);

  if (selected) {
    return (
      <div className="p-5 overflow-auto os-scroll" style={{ background: '#c9d6e5' }}>
        <button className="os-button mb-4" onClick={() => setSelected(null)}>← Back</button>
        <div className="inset-panel">
          <h3 className="font-bold text-sm mb-2">📄 {selected.name}</h3>
          <div className="text-sm text-gray-700 p-4 bg-white border-2" style={{ borderColor: '#5a6b85', borderStyle: 'solid' }}>
            {selected.content}
          </div>
        </div>
        {selected.name === 'BUG.EXE' && (
          <div className="inset-panel mt-4" style={{ background: '#fffacd' }}>
            <p className="text-sm italic">🐛 You found a bug in the Recycle Bin. There are always more bugs.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 overflow-auto os-scroll" style={{ background: 'var(--xp-face)' }}>
      <h2 className="text-base font-bold mb-1" style={{ color: '#003c99' }}>🗑 Recycle Bin</h2>
      <p className="text-xs text-gray-600 mb-4">C:\Recycle Bin\</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recycleBinItems.map(item => (
          <button
            key={item.name}
            className="xp-outset text-left transition"
            style={{ padding: 10 }}
            onClick={() => {
              setSelected(item);
              onXP?.(5);
              if (item.name === 'BUG.EXE') unlockAch?.('recycle_bug', 30);
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{item.name.endsWith('.exe') ? '🐛' : item.name.endsWith('.js') ? '📄' : '📁'}</span>
              <div>
                <div className="font-bold text-xs break-all">{item.name}</div>
                <div className="text-xs text-gray-600">{item.type}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="xp-inset mt-4" style={{ background: '#ffffe1' }}>
        <p className="text-xs italic">⚠ These files have been deleted. Probably for the best.</p>
      </div>
    </div>
  );
}
// ============ DO NOT OPEN ============
export function DoNotOpenWindow({
  onXP,
  unlockAch,
}: {
  onXP?: (n: number) => void;
  unlockAch?: (id: string, xp?: number) => void;
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    onXP?.(10);
  }, [onXP]);

  const stages = [
    {
      title: "SYSTEM ERROR",
      text: "You were specifically told NOT to open this.\n\nWhy did you click it?",
      btn: "OK, my bad",
      accent: "red",
      icon: "⚠️",
    },
    {
      title: "ERROR 403: UNBOUND CURIOSITY",
      text: "Pressing OK didn't fix anything.\n\nClassic human behavior.",
      btn: "Try again",
      accent: "orange",
      icon: "🚨",
    },
    {
      title: "SECURITY ALERT",
      text: "You're still clicking?\n\nAlright. You earned this.",
      btn: "Reveal Secret",
      accent: "amber",
      icon: "🔐",
    },
    {
      title: "SECRET UNLOCKED",
      text: 'You have proven yourself to be irreversibly curious.\n\nAchievement unlocked:\n"Rebel Without a Cause"\n+50 XP',
      btn: "Claim Reward",
      accent: "green",
      icon: "🎉",
    },
  ];

  const current = stages[stage];
  const isLast = stage === stages.length - 1;

  const accentStyles = {
    red: {
      badge: "bg-red-50 text-red-600 border-red-200",
      button: "bg-red-500 hover:bg-red-600 active:bg-red-700",
      glow: "hover:shadow-red-200",
    },
    orange: {
      badge: "bg-orange-50 text-orange-600 border-orange-200",
      button: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
      glow: "hover:shadow-orange-200",
    },
    amber: {
      badge: "bg-amber-50 text-amber-600 border-amber-200",
      button: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
      glow: "hover:shadow-amber-200",
    },
    green: {
      badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
      button: "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700",
      glow: "hover:shadow-emerald-200",
    },
  };

  const accent = accentStyles[current.accent as keyof typeof accentStyles];

  return (
<div className="donotopen-window w-full h-full flex items-center justify-center bg-white p-6 select-none">    
    <div
  key={`shake-${stage}`}
  className={`
    w-full max-w-md
    bg-white
    rounded-2xl
    shadow-[0_12px_40px_rgba(0,0,0,0.08)]
    overflow-hidden
    transition-all duration-300
    ${!isLast ? "error-shake" : ""}
  `}
>
        {/* Top accent line */}
        <div
          className={`h-1.5 w-full ${
            isLast ? "bg-emerald-500" : "bg-red-500"
          }`}
        />

        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={` 
                  w-10 h-10 rounded-xl
                  flex items-center justify-center
                  text-lg
            
                `}
              >
                {current.icon}
              </div>

              <div>
<p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black">                  Unauthorized Action
                </p>

<h2 className="text-sm font-bold tracking-wide text-black">                  {current.title}
                </h2>
              </div>
            </div>

            {/* Stage indicator */}
            <div className="flex gap-1.5">
              {stages.map((_, index) => (
                <div
                  key={index}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${
                      index <= stage
                        ? isLast
                          ? "w-5 bg-emerald-500"
                          : "w-5 bg-red-500"
                        : "w-1.5 bg-slate-200"
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
            <div className="flex gap-5 items-start">
              <div
                className={`
                  flex-shrink-0
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  text-xl
                  border
                  ${accent.badge}
                `}
              >
                {isLast ? "🎁" : "🚨"}
              </div>

<p className="flex-1 text-sm font-medium text-black whitespace-pre-line leading-6">                {current.text}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-1 flex items-center justify-between ">
<span className="text-[10px] text-black font-medium">             
            </span>

            <button
              className={`
                group mt-2
                px-5 py-2.5
                rounded-xl
                ${accent.button}
                text-white
                font-bold
                text-xs
                tracking-wide
                shadow-sm
                ${accent.glow}
                hover:shadow-lg
                hover:-translate-y-0.5
                active:translate-y-0
                active:scale-95
                transition-all duration-200
                cursor-pointer
                flex items-center gap-2
              `}
              onClick={() => {
                if (isLast) {
                  unlockAch?.("do_not_open", 50);
                  onXP?.(50);
                  useDesktopStore
                    .getState()
                    .closeWindow("donotopen");
                } else {
                  setStage(stage + 1);
                }
              }}
            >
              {current.btn}

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============ RANDOM STUFF ============
export function RandomStuffWindow({ onXP, unlockAch }: { onXP?: (n: number) => void; unlockAch?: (id: string, xp?: number) => void }) {
  const [revealed, setRevealed] = useState<number | null>(null);
  useEffect(() => { onXP?.(10); }, [onXP]);

  const items = [
    { icon: '🎮', title: 'Retro Games', desc: 'I love old-school pixel games. The graphics were bad but the vibes were immaculate.' },
    { icon: '🏐', title: 'Volleyball', desc: 'State-level player. Spiking a ball is very satisfying.' },
    { icon: '🎭', title: 'Bharatanatyam', desc: 'Classical dance training. Yes, I can hold a pose longer than a loading screen.' },
    { icon: '☕', title: 'Coffee', desc: 'The real programming language. Everything else is just syntax.' },
    { icon: '🌙', title: 'Night Coder', desc: 'Best ideas come at 3 AM. Worst bugs also come at 3 AM.' },
    { icon: '🧩', title: 'Puzzle Solver', desc: 'DSA problems are just puzzles with extra steps. I enjoy both.' },
  ];

  return (
    <div className="p-4 overflow-auto os-scroll" style={{ background: 'var(--xp-face)' }}>
      <h2 className="text-base font-bold mb-1" style={{ color: '#003c99' }}>📁 Random Stuff</h2>
      <p className="text-xs text-gray-600 mb-4">Things that don't fit in a resume but make me, me.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            className="xp-outset text-left transition"
            style={{ padding: 10 }}
            onClick={() => { setRevealed(i); onXP?.(5); unlockAch?.('random_stuff', 20); }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-bold text-sm">{item.title}</div>
                {revealed === i && <div className="text-xs text-gray-700 mt-1">{item.desc}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ MINI GAME ============
export function GameWindow({ onXP, unlockAch }: { onXP?: (n: number) => void; unlockAch?: (id: string, xp?: number) => void }) {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [playerPos, setPlayerPos] = useState(50);
  const [items, setItems] = useState<{ id: number; x: number; y: number; type: 'symbol' | 'bug' }[]>([]);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const gameRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef(0);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setKeys(prev => new Set([...prev, e.key]));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setPlayerPos(prev => {
        let next = prev;
        if (keys.has('ArrowLeft')) next = Math.max(5, next - 3);
        if (keys.has('ArrowRight')) next = Math.min(90, next + 3);
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [gameState, keys]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const spawner = setInterval(() => {
      const isBug = Math.random() < 0.3;
      setItems(prev => [
        ...prev,
        { id: itemRef.current++, x: Math.random() * 90, y: 0, type: isBug ? 'bug' : 'symbol' },
      ]);
    }, 800);
    return () => clearInterval(spawner);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const faller = setInterval(() => {
      setItems(prev =>
        prev
          .map(item => ({ ...item, y: item.y + 3 }))
          .filter(item => {
            const playerHitX = Math.abs(item.x - playerPos) < 8;
            const playerHitY = item.y > 75 && item.y < 90;
            if (playerHitX && playerHitY) {
              if (item.type === 'bug') {
                setGameState('over');
                unlockAch?.('game_played', 30);
                return false;
              } else {
                setScore(s => s + 100);
                onXP?.(10);
                return false;
              }
            }
            return item.y < 100;
          })
      );
    }, 50);
    return () => clearInterval(faller);
  }, [gameState, playerPos, onXP, unlockAch]);

  const startGame = () => {
    setScore(0);
    setPlayerPos(50);
    setItems([]);
    itemRef.current = 0;
    setGameState('playing');
  };

  if (gameState === 'idle') {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full" style={{ background: 'var(--xp-face)' }}>
        <h2 className="text-base font-bold mb-2" style={{ color: '#003c99' }}>🎮 Bug Catcher</h2>
        <div className="xp-inset mb-4 text-center max-w-xs">
          <p className="text-sm text-gray-600 mb-2">Collect programming symbols ({'{ }'} = &lt; &gt; ;) while avoiding bugs! 🐛</p>
          <p className="text-xs text-gray-600">Use ← → arrow keys to move</p>
        </div>
        <button className="xp-button primary" onClick={startGame}>Start Game</button>
      </div>
    );
  }

  if (gameState === 'over') {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full" style={{ background: 'var(--xp-face)' }}>
        <div className="text-4xl mb-3">🐛</div>
        <h2 className="text-base font-bold mb-2" style={{ color: '#003c99' }}>GAME OVER</h2>
        <div className="xp-inset mb-4 text-center">
          <p className="text-sm"><strong>SCORE: {score}</strong></p>
          <p className="text-sm mt-2 italic">"You avoided one bug."</p>
          <p className="text-xs text-gray-600 mt-1">Unfortunately, there are 47 more.</p>
        </div>
        <button className="xp-button primary" onClick={startGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div ref={gameRef} className="relative h-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a2a5a 0%, #2a4a8a 60%, #3a6b4a 100%)' }}>
      <div className="absolute top-2 left-2 text-white text-sm font-bold z-10">SCORE: {score}</div>
      {items.map(item => (
        <div
          key={item.id}
          className="absolute text-lg"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          {item.type === 'bug' ? '🐛' : ['{', '}', '<', '>', ';'][item.id % 5]}
        </div>
      ))}
      <div
        className="absolute text-2xl"
        style={{ left: `${playerPos}%`, bottom: '8%', transform: 'translateX(-50%)' }}
      >
        🧑‍💻
      </div>
      <div className="absolute bottom-0 w-full h-2" style={{ background: '#2d5a2d' }} />
    </div>
  );
}

// ============ FAKE ERROR 404 ============
export function Error404Window({ winId }: { winId?: string }) {
  const { closeWindow } = useDesktopStore();
  return (
    <div className="p-6 flex items-center justify-center h-full" style={{ background: 'var(--xp-face)' }}>
      <div className="xp-window max-w-md w-full">
        <div className="xp-titlebar"><span>404 — Page Not Found</span></div>
        <div className="xp-window-body p-6">
          <div className="flex gap-4 items-start">
            <div className="text-4xl flex-shrink-0">🔍</div>
            <div className="flex-1">
              <h3 className="font-bold text-base mb-2">404 — PAGE NOT FOUND</h3>
              <p className="text-sm leading-relaxed">We looked everywhere.</p>
              <p className="text-sm leading-relaxed">Behind the monitor. Inside the Recycle Bin. Under the desk.</p>
              <p className="text-sm leading-relaxed mt-2">Nothing.</p>
            </div>
          </div>
          <div className="mt-6 text-right">
            <button className="xp-button primary" onClick={() => closeWindow(winId || 'error404')}>Return to Desktop</button>
          </div>
        </div>
      </div>
    </div>
  );
}
