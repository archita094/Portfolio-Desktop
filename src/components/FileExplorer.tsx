import { useState, useCallback } from 'react';
import { type FSNode, resolvePath, getParentPath } from '@/data/fileSystem';
import { useDesktopStore } from '@/store/desktop';
import {
  ArrowLeft, ArrowRight, ArrowUp, RotateCw, Search, ChevronRight, ChevronDown,
  FileText, Image as ImageIcon, Globe, Terminal as TerminalIcon,
  Copy, Scissors, Clipboard, Trash2, Edit3, Share2, ArrowUpDown, Grid, List,
  Monitor, HardDrive, Pin, Mail
} from 'lucide-react';
import '@/styles/file-explorer.css';

interface FileExplorerProps {
  initialPath?: string[];
  onXP?: (n: number) => void;
  onOpenWindow?: (data: { title: string; icon: string; component: string; data?: Record<string, unknown> }) => void;
}

export function FileExplorer({ initialPath = [], onXP }: FileExplorerProps) {
  const [path, setPath] = useState<string[]>(initialPath);
  const [history, setHistory] = useState<string[][]>([initialPath]);
  const [histIdx, setHistIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'icons'>('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'size'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const store = useDesktopStore();
  const current = resolvePath(path) || resolvePath([])!;

  const navigateTo = useCallback((newPath: string[]) => {
    setPath(newPath);
    setSelected(null);
    setSearchQuery('');
    setHistory(prev => {
      const trimmed = prev.slice(0, histIdx + 1);
      return [...trimmed, newPath];
    });
    setHistIdx(prev => prev + 1);
  }, [histIdx]);

  const goBack = useCallback(() => {
    if (histIdx > 0) {
      const idx = histIdx - 1;
      setHistIdx(idx);
      setPath(history[idx]);
      setSelected(null);
    }
  }, [histIdx, history]);

  const goForward = useCallback(() => {
    if (histIdx < history.length - 1) {
      const idx = histIdx + 1;
      setHistIdx(idx);
      setPath(history[idx]);
      setSelected(null);
    }
  }, [histIdx, history]);

  const goUp = useCallback(() => {
    if (path.length > 0) {
      const parent = getParentPath(path);
      navigateTo(parent);
    }
  }, [path, navigateTo]);

  const handleDoubleClick = useCallback((node: FSNode) => {
    onXP?.(5);

    if (node.type === 'folder') {
      navigateTo([...path, node.name]);
      return;
    }

    if (node.type === 'text') {
      const winId = `notepad-${path.join('-')}-${node.name}`;
      store.openWindow({
        id: winId,
        title: `${node.name} — Notepad`,
        icon: '📝',
        component: 'notepad',
        x: 180 + store.windows.length * 24,
        y: 80 + store.windows.length * 24,
        width: 540,
        height: 440,
        data: { content: node.content, fileName: node.name },
      });
      return;
    }

    if (node.type === 'image') {
      const winId = `image-${path.join('-')}-${node.name}`;
      store.openWindow({
        id: winId,
        title: `${node.name} — Photos`,
        icon: '🖼',
        component: 'imageviewer',
        x: 200 + store.windows.length * 24,
        y: 100 + store.windows.length * 24,
        width: 620,
        height: 480,
        data: { imageUrl: node.imageUrl, fileName: node.name, description: node.content },
      });
      return;
    }

    if (node.type === 'url') {
      if (node.url) window.open(node.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (node.type === 'app') {
      openApp(node, store, path);
    }
  }, [path, onXP, store, navigateTo]);

  // Children filtering & sorting
  const rawChildren = current.children || [];
  const filteredChildren = rawChildren.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedChildren = [...filteredChildren].sort((a, b) => {
    // Folders always first
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;

    let res = 0;
    if (sortBy === 'name') {
      res = a.name.localeCompare(b.name);
    } else if (sortBy === 'type') {
      res = a.type.localeCompare(b.type);
    } else if (sortBy === 'size') {
      res = (a.content?.length || 0) - (b.content?.length || 0);
    }
    return sortAsc ? res : -res;
  });

  const toggleSort = (field: 'name' | 'type' | 'size') => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  const breadcrumbs = path.length === 0 ? ['Desktop'] : ['Desktop', ...path];

  return (
    <div className="fe-container">
      {/* 1. WINDOWS COMMAND BAR */}
      <div className="fe-command-bar">
        <div className="fe-command-group">
          {/* New Item */}
          <button className="fe-command-btn">
            <span className="fe-new-plus">+</span>
            <span>New</span>
          </button>

          <div className="fe-divider" />

          {/* Action Icons */}
          <button className="fe-command-btn fe-command-btn-icon" disabled={!selected} title="Cut">
            <Scissors size={14} />
          </button>
          <button className="fe-command-btn fe-command-btn-icon" disabled={!selected} title="Copy">
            <Copy size={14} />
          </button>
          <button className="fe-command-btn fe-command-btn-icon" disabled title="Paste">
            <Clipboard size={14} />
          </button>
          <button className="fe-command-btn fe-command-btn-icon" disabled={!selected} title="Rename">
            <Edit3 size={14} />
          </button>
          <button className="fe-command-btn fe-command-btn-icon" disabled={!selected} title="Share">
            <Share2 size={14} />
          </button>
          <button className="fe-command-btn fe-command-btn-icon" disabled={!selected} title="Delete">
            <Trash2 size={14} style={{ color: '#dc2626' }} />
          </button>

          <div className="fe-divider" />

          {/* Sort Dropdown */}
          <button
            className="fe-command-btn"
            onClick={() => toggleSort('name')}
            title="Sort"
          >
            <ArrowUpDown size={13} />
            <span>Sort</span>
          </button>

          {/* View Toggle */}
          <button
            className="fe-command-btn"
            onClick={() => setViewMode(viewMode === 'details' ? 'icons' : 'details')}
            title="Toggle View Mode"
          >
            {viewMode === 'details' ? <List size={14} /> : <Grid size={14} />}
            <span style={{ textTransform: 'capitalize' }}>{viewMode}</span>
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION & BREADCRUMB ADDRESS BAR */}
      <div className="fe-nav-bar">
        {/* Nav History Controls */}
        <div className="fe-nav-controls">
          <button
            className={`fe-nav-btn ${histIdx === 0 ? 'disabled' : ''}`}
            onClick={goBack}
            title="Back"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            className={`fe-nav-btn ${histIdx >= history.length - 1 ? 'disabled' : ''}`}
            onClick={goForward}
            title="Forward"
          >
            <ArrowRight size={14} />
          </button>
          <button
            className={`fe-nav-btn ${path.length === 0 ? 'disabled' : ''}`}
            onClick={goUp}
            title="Up one level"
          >
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Breadcrumb Path Box */}
        <div className="fe-breadcrumb-box">
          <WinFolderIcon size={15} />
          <div className="fe-breadcrumb-list">
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="fe-breadcrumb-item">
                <span
                  className="fe-breadcrumb-crumb"
                  onClick={() => navigateTo(i === 0 ? [] : path.slice(0, i))}
                >
                  {crumb}
                </span>
                {i < breadcrumbs.length - 1 && <ChevronRight size={12} style={{ color: '#888888' }} />}
              </div>
            ))}
          </div>
          <button className="fe-refresh-btn" onClick={() => navigateTo(path)} title="Refresh">
            <RotateCw size={12} />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="fe-search-box">
          <Search size={13} style={{ color: '#666666' }} />
          <input
            type="text"
            className="fe-search-input"
            placeholder={`Search ${breadcrumbs[breadcrumbs.length - 1]}`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 3. MAIN EXPLORER SPLIT CONTAINER */}
      <div className="fe-main-split">
        {/* Left Windows Navigation Pane */}
        <div className="fe-sidebar">
          {/* Quick Access */}
          <div className="fe-sidebar-group">
            <div className="fe-sidebar-header">
              <ChevronDown size={12} />
              <Pin size={12} style={{ color: '#0067c0' }} />
              <span>Quick access</span>
            </div>
            <div className="fe-sidebar-list">
              <NavItem icon={<Monitor size={14} style={{ color: '#3b82f6' }} />} label="Desktop" active={path.length === 0} onClick={() => navigateTo([])} />
              <NavItem icon={<WinFolderIcon size={14} />} label="My Projects" active={path[0] === 'My Projects'} onClick={() => navigateTo(['My Projects'])} />
              <NavItem icon={<WinFolderIcon size={14} />} label="About Me" active={false} onClick={() => store.openWindow({ id: 'About Me', title: 'About Me — Archita Srivastava', icon: '👤', component: 'aboutme', x: 150, y: 70, width: 720, height: 560 })} />
              <NavItem icon={<WinFolderIcon size={14} />} label="Experience" active={false} onClick={() => store.openWindow({ id: 'About Me', title: 'About Me — Archita Srivastava', icon: '👤', component: 'aboutme', x: 150, y: 70, width: 720, height: 560 })} />
              <NavItem icon={<Mail size={14} style={{ color: '#000000' }} />} label="Contact" active={false} onClick={() => store.openWindow({ id: 'contact', title: 'Contact — Send a Message', icon: '📧', component: 'contact', x: 180, y: 80, width: 480, height: 550 })} />
            </div>
          </div>

          {/* This PC */}
          <div className="fe-sidebar-group">
            <div className="fe-sidebar-header">
              <ChevronDown size={12} />
              <HardDrive size={12} style={{ color: '#475569' }} />
              <span>This PC</span>
            </div>
            <div className="fe-sidebar-list">
              <NavItem icon={<HardDrive size={14} style={{ color: '#64748b' }} />} label="Local Disk (C:)" active={false} onClick={() => navigateTo([])} />
            </div>
          </div>
        </div>

        {/* Right Main File Grid View */}
        <div
          className="fe-content"
          onClick={() => setSelected(null)}
        >
          {sortedChildren.length > 0 ? (
            viewMode === 'details' ? (
              /* DETAILS VIEW */
              <div className="fe-details-table">
                {/* Column Headers */}
                <div className="fe-details-header">
                  <div className="fe-header-col fe-col-name" onClick={() => toggleSort('name')}>
                    <span>Name</span>
                    {sortBy === 'name' && <span style={{ fontSize: '10px' }}>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                  <div className="fe-header-col fe-col-type" onClick={() => toggleSort('type')}>
                    <span>Type</span>
                    {sortBy === 'type' && <span style={{ fontSize: '10px' }}>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                  <div className="fe-header-col fe-col-size" onClick={() => toggleSort('size')}>
                    <span>Size</span>
                    {sortBy === 'size' && <span style={{ fontSize: '10px' }}>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </div>

                {/* Rows */}
                <div className="fe-rows-container">
                  {sortedChildren.map(node => (
                    <FileExplorerRow
                      key={node.name}
                      node={node}
                      selected={selected === node.name}
                      onSelect={(e) => { e.stopPropagation(); setSelected(node.name); }}
                      onDoubleClick={() => handleDoubleClick(node)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* ICONS GRID VIEW */
              <div className="fe-grid-view">
                {sortedChildren.map(node => (
                  <FileExplorerTile
                    key={node.name}
                    node={node}
                    selected={selected === node.name}
                    onSelect={(e) => { e.stopPropagation(); setSelected(node.name); }}
                    onDoubleClick={() => handleDoubleClick(node)}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="fe-empty-state">
              <WinFolderIcon size={40} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
              <span>This folder is empty.</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. WINDOWS STATUS BAR */}
      <div className="fe-status-bar">
        <div>
          <span>{sortedChildren.length} items</span>
          {selected && <span className="fe-status-selected">Selected: {selected}</span>}
        </div>
        <div className="fe-status-view-toggle">
          <button
            className={`fe-view-btn ${viewMode === 'details' ? 'active' : ''}`}
            onClick={() => setViewMode('details')}
            title="Details view"
          >
            <List size={13} />
          </button>
          <button
            className={`fe-view-btn ${viewMode === 'icons' ? 'active' : ''}`}
            onClick={() => setViewMode('icons')}
            title="Large icons view"
          >
            <Grid size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <div
      className={`fe-sidebar-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span className="fe-tile-name">{label}</span>
    </div>
  );
}

function FileExplorerRow({ node, selected, onSelect, onDoubleClick }: {
  node: FSNode;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}) {
  const typeLabel = node.type === 'folder' ? 'File folder'
    : node.type === 'text' ? 'Text Document'
    : node.type === 'image' ? 'PNG File'
    : node.type === 'url' ? 'Internet Shortcut'
    : 'Application';

  const sizeLabel = node.type === 'folder' ? ''
    : node.type === 'image' ? '1,024 KB'
    : `${(node.content?.length || 4)} KB`;

  return (
    <div
      className={`fe-details-row ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      <div className="fe-col-name">
        <NodeIcon node={node} />
        <span className="fe-tile-name">{node.name}</span>
      </div>
      <div className="fe-col-type">{typeLabel}</div>
      <div className="fe-col-size">{sizeLabel}</div>
    </div>
  );
}

function FileExplorerTile({ node, selected, onSelect, onDoubleClick }: {
  node: FSNode;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}) {
  return (
    <div
      className={`fe-grid-tile ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      <div className="fe-tile-icon">
        <NodeIcon node={node} size={32} />
      </div>
      <span className="fe-tile-name">{node.name}</span>
    </div>
  );
}

function NodeIcon({ node, size = 18 }: { node: FSNode; size?: number }) {
  if (node.type === 'folder') return <WinFolderIcon size={size} />;
  if (node.type === 'text') return <FileText size={size} style={{ color: '#64748b' }} />;
  if (node.type === 'image') return <ImageIcon size={size} style={{ color: '#a855f7' }} />;
  if (node.type === 'url') return <Globe size={size} style={{ color: '#3b82f6' }} />;
  return <TerminalIcon size={size} style={{ color: '#4f46e5' }} />;
}

/** Authentic 3D Yellow Windows Folder SVG Icon */
function WinFolderIcon({ size = 18, style, className = '' }: { size?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style} className={className}>
      <path d="M4 10C4 8.34315 5.34315 7 7 7H14L17 10H30C31.6569 10 33 11.3431 33 13V27C33 28.6569 31.6569 30 30 30H7C5.34315 30 4 28.6569 4 27V10Z" fill="#E5B036" />
      <path d="M4 13C4 11.3431 5.34315 10 7 10H30C31.6569 10 33 11.3431 33 13V27C33 28.6569 31.6569 30 30 30H7C5.34315 30 4 28.6569 4 27V13Z" fill="#FCD856" />
      <path d="M4 14L16 14L18 16L33 16V27C33 28.6569 31.6569 30 30 30H7C5.34315 30 4 28.6569 4 27V14Z" fill="#FFE279" />
    </svg>
  );
}

function openApp(node: FSNode, store: ReturnType<typeof useDesktopStore.getState>, path: string[]) {
  if (!node.appId) return;

  if (node.appId === 'aboutme') {
    store.openWindow({
      id: 'About Me',
      title: 'About Me — Archita Srivastava',
      icon: '👤',
      component: 'aboutme',
      x: 150, y: 70, width: 720, height: 560,
    });
    return;
  }

  if (node.appId === 'terminal') {
    store.openWindow({
      id: 'terminal',
      title: 'Command Prompt — C:\\Archita',
      icon: '💻',
      component: 'terminal',
      x: 200, y: 100, width: 560, height: 400,
    });
    return;
  }

  if (node.appId === 'game') {
    store.openWindow({
      id: 'game',
      title: 'Bug Catcher — Game',
      icon: '🎮',
      component: 'game',
      x: 250, y: 120, width: 480, height: 400,
    });
    return;
  }

  if (node.appId === 'randomstuff') {
    store.openWindow({
      id: 'randomstuff',
      title: 'Random Stuff',
      icon: '🎲',
      component: 'randomstuff',
      x: 220, y: 110, width: 520, height: 420,
    });
    return;
  }

  if (node.appId === 'project-launcher') {
    const winId = `project-${node.projectId}-${Date.now()}`;
    store.openWindow({
      id: winId,
      title: `${node.name} — Project Showcase`,
      icon: node.icon,
      component: 'project-launcher',
      x: 160 + store.windows.length * 24,
      y: 70 + store.windows.length * 24,
      width: 640,
      height: 480,
      data: { projectId: node.projectId },
    });
    return;
  }

  if (node.appId === 'resume-viewer') {
    window.open('https://drive.google.com/file/d/13OqFPTmUOviOPkgp224m4CzVPp5ZcEAk/view', '_blank', 'noopener,noreferrer');
    return;
  }

  if (node.appId === 'contact-form') {
    store.openWindow({
      id: 'contact',
      title: 'Contact — Send a Message',
      icon: '📧',
      component: 'contact',
      x: 200, y: 90, width: 480, height: 500,
    });
    return;
  }

  if (node.appId === 'recyclebug') {
    store.openWindow({
      id: 'donotopen',
      title: 'DO NOT OPEN',
      icon: '⚠',
      component: 'donotopen',
      x: 300, y: 150, width: 420, height: 300,
    });
    return;
  }

  if (node.appId === 'notepad') {
    store.openWindow({
      id: `notepad-${Date.now()}`,
      title: 'Untitled — Notepad',
      icon: '📝',
      component: 'notepad',
      x: 200, y: 100, width: 520, height: 420,
      data: { content: '', fileName: 'Untitled' },
    });
    return;
  }

  if (node.appId === 'imageviewer') {
    store.openWindow({
      id: `imageviewer-${Date.now()}`,
      title: 'Photos',
      icon: '🖼',
      component: 'imageviewer',
      x: 200, y: 100, width: 600, height: 480,
      data: {},
    });
    return;
  }
}
