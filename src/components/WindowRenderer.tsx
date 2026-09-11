import type { WinState } from '@/store/desktop';
import { useXP } from '@/hooks/useLocalStorage';
import { FileExplorer } from '@/components/FileExplorer';
import { Notepad } from '@/components/Notepad';
import { ImageViewer } from '@/components/ImageViewer';
import { ProjectLauncher } from '@/components/ProjectLauncher';
import {
  TerminalWindow, RecycleBinWindow, DoNotOpenWindow,
  RandomStuffWindow, GameWindow, Error404Window,
} from '@/components/EasterEggs';
import { AboutWindow, ResumeWindow, ContactWindow } from '@/components/Windows';

interface WindowRendererProps {
  win: WinState;
}

export function WindowRenderer({ win }: WindowRendererProps) {
  const { addXP, unlockAchievement } = useXP();
  const data = win.data || {};

  switch (win.component) {
    case 'welcome':
      return null;
    case 'aboutme':
      return <AboutWindow onXP={addXP} />;
    case 'fileexplorer':
      return <FileExplorer initialPath={(data.path as string[]) || []} onXP={addXP} />;
    case 'notepad':
      return <Notepad content={(data.content as string) || ''} fileName={(data.fileName as string) || 'Untitled'} onXP={addXP} />;
    case 'imageviewer':
      return <ImageViewer imageUrl={data.imageUrl as string} fileName={data.fileName as string} description={data.description as string} />;
    case 'project-launcher':
      return <ProjectLauncher projectId={data.projectId as string} onXP={addXP} />;
    case 'resume':
      return <ResumeWindow onXP={addXP} />;
    case 'contact':
      return <ContactWindow onXP={addXP} />;
    case 'terminal':
      return <TerminalWindow onXP={addXP} unlockAch={unlockAchievement} />;
    case 'recyclebin':
      return <RecycleBinWindow onXP={addXP} unlockAch={unlockAchievement} />;
    case 'donotopen':
      return <DoNotOpenWindow onXP={addXP} unlockAch={unlockAchievement} />;
    case 'randomstuff':
      return <RandomStuffWindow onXP={addXP} unlockAch={unlockAchievement} />;
    case 'game':
      return <GameWindow onXP={addXP} unlockAch={unlockAchievement} />;
    case 'error404':
      return <Error404Window winId={win.id} />;
    default:
      return <div className="p-4 text-sm">Unknown component: {win.component}</div>;
  }
}
