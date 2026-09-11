import { create } from 'zustand';

export interface WinState {
  id: string;
  title: string;
  icon: string;
  component: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  data?: Record<string, unknown>;
}

interface DesktopStore {
  windows: WinState[];
  activeId: string | null;
  nextZ: number;
  openWindow: (win: Omit<WinState, 'zIndex' | 'minimized' | 'maximized'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  windows: [],
  activeId: null,
  nextZ: 10,
  openWindow: (win) =>
    set((state) => {
      const existing = state.windows.find(w => w.id === win.id);
      if (existing) {
        return {
          activeId: win.id,
          nextZ: state.nextZ + 1,
          windows: state.windows.map(w =>
            w.id === win.id ? { ...w, minimized: false, zIndex: state.nextZ + 1, data: win.data } : w
          ),
        };
      }
      const z = state.nextZ + 1;
      return {
        windows: [...state.windows, { ...win, zIndex: z, minimized: false, maximized: false }],
        activeId: win.id,
        nextZ: z,
      };
    }),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id),
      activeId: state.activeId === id ? null : state.activeId,
    })),
  focusWindow: (id) =>
    set((state) => {
      const z = state.nextZ + 1;
      return {
        activeId: id,
        nextZ: z,
        windows: state.windows.map(w => w.id === id ? { ...w, zIndex: z, minimized: false } : w),
      };
    }),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, minimized: true } : w),
      activeId: state.activeId === id ? null : state.activeId,
    })),
  toggleMaximize: (id) =>
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w),
    })),
  moveWindow: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, x, y } : w),
    })),
  resizeWindow: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, width, height } : w),
    })),
}));
