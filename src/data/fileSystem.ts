import { projects, skills, achievements, socials, type Project } from './portfolio';
export type { Project };

export type FileType = 'folder' | 'text' | 'image' | 'app' | 'url';

export interface FSNode {
  name: string;
  type: FileType;
  icon: string;
  children?: FSNode[];
  content?: string;
  imageUrl?: string;
  url?: string;
  appId?: string;
  projectId?: string;
}

export interface TextFileContent {
  title: string;
  body: string;
}

function projectNode(p: Project): FSNode {
  return {
    name: p.name,
    type: 'app',
    icon: p.icon,
    appId: 'project-launcher',
    projectId: p.id,
  };
}

export const fileSystem: FSNode = {
  name: 'Desktop',
  type: 'folder',
  icon: '🖥',
  children: [
    {
      name: 'My Projects',
      type: 'folder',
      icon: '📁',
      children: projects.map(projectNode),
    },
    {
      name: 'About Me',
      type: 'app',
      icon: '👤',
      appId: 'aboutme',
    },
    {
      name: 'Recycle Bin',
      type: 'folder',
      icon: '🗑',
      children: [
        { name: 'unfinished_projects.tmp', type: 'text', icon: '📄', content: 'A list of projects that sounded great at 2 AM.' },
        { name: 'questionable_design_decisions.old', type: 'text', icon: '📄', content: 'We all have regrets. This file has more than most.' },
        { name: 'code_written_at_3am.js', type: 'text', icon: '📄', content: "It works. Nobody knows why. Don't touch it." },
        { name: 'BUG.EXE', type: 'app', icon: '🐛', appId: 'recyclebug' },
      ],
    },
  ],
};

/** Navigate the file system by a path array like ['My Projects', 'Expense Tracker'] */
export function resolvePath(path: string[]): FSNode | null {
  let current: FSNode = fileSystem;
  for (const segment of path) {
    if (!current.children) return null;
    const next = current.children.find(c => c.name === segment);
    if (!next) return null;
    current = next;
  }
  return current;
}

/** Get the parent of a node by path */
export function getParentPath(path: string[]): string[] {
  return path.slice(0, -1);
}

/** Find a node by path and return it with its full path */
export function findByPath(path: string[]): FSNode | null {
  if (path.length === 0) return fileSystem;
  return resolvePath(path);
}

/** Format a path array into a display string like C:\Users\Portfolio\My Projects */
export function formatPath(path: string[]): string {
  if (path.length === 0) return 'C:\\Users\\Archita\\Desktop';
  return 'C:\\Users\\Archita\\Desktop\\' + path.join('\\');
}

/** Get the icon for a file type */
export function getFileIcon(node: FSNode): string {
  return node.icon;
}

/** Find a project by ID */
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
