import { useRef, useCallback } from 'react';
import { useDesktopStore, type WinState } from '@/store/desktop';
import { X } from 'lucide-react';

interface WindowProps {
  win: WinState;
  children: React.ReactNode;
  onXP?: (amount: number) => void;
}

export function Window({ win, children }: WindowProps) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, activeId } = useDesktopStore();
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const dragData = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.maximized) return;
      focusWindow(win.id);
      dragRef.current = { startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y };
    },
    [win.id, win.x, win.y, win.maximized, focusWindow]
  );

  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      focusWindow(win.id);
      dragData.current = { startX: e.clientX, startY: e.clientY, origW: win.width, origH: win.height };
    },
    [win.id, win.width, win.height, focusWindow]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        moveWindow(win.id, dragRef.current.origX + dx, Math.max(0, dragRef.current.origY + dy));
      }
      if (dragData.current) {
        const dw = e.clientX - dragData.current.startX;
        const dh = e.clientY - dragData.current.startY;
        const store = useDesktopStore.getState();
        store.resizeWindow(win.id, Math.max(300, dragData.current.origW + dw), Math.max(200, dragData.current.origH + dh));
      }
    },
    [win.id, moveWindow]
  );

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
    dragData.current = null;
  }, []);

  if (win.minimized) return null;

  const isActive = activeId === win.id;
  const winStyle: React.CSSProperties = win.maximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 40px)', zIndex: Math.max(win.zIndex, 999), borderRadius: 0 }
    : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex };

  return (
    <div
      className="xp-window absolute flex flex-col window-open"
      style={winStyle}
      onMouseDown={() => focusWindow(win.id)}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Title bar (Hidden in fullscreen) */}
      {!win.maximized && (
        <div
          className={`xp-titlebar ${isActive ? '' : 'inactive'} no-select`}
          onMouseDown={onMouseDown}
          onDoubleClick={() => toggleMaximize(win.id)}
        >
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="text-sm flex-shrink-0">{win.icon}</span>
            <span className="xp-titlebar-title">{win.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="xp-tb-btn minimize"
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
              title="Minimize"
            >
              <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="7" width="8" height="2" fill="white" /></svg>
            </button>
            <button
              className="xp-tb-btn maximize"
              onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
              title="Maximize / Fullscreen"
            >
              <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="white" strokeWidth="1.5" /><rect x="1" y="1" width="8" height="3" fill="white" /></svg>
            </button>
            <button
              className="xp-tb-btn close"
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
              title="Close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1,1 L9,9 M9,1 L1,9" stroke="white" strokeWidth="2" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="xp-window-body">
        <div className="flex-1 overflow-hidden" style={{ background: 'var(--xp-face)' }}>{children}</div>
      </div>

      {/* Floating Exit Fullscreen Cross Button */}
      {win.maximized && (
        <button
          className="fullscreen-exit-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleMaximize(win.id);
          }}
          title="Exit Fullscreen"
          aria-label="Exit Fullscreen"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      )}

      {/* Resize handle */}
      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0"
          style={{ width: 16, height: 16, cursor: 'nwse-resize' }}
          onMouseDown={onResizeStart}
        />
      )}
    </div>
  );
}
