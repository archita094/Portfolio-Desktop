import { useState } from 'react';
import { getProjectById } from '@/data/fileSystem';

interface ImageViewerProps {
  imageUrl?: string;
  fileName?: string;
  description?: string;
}

export function ImageViewer({ imageUrl, fileName = 'Image', description }: ImageViewerProps) {
  const [zoom, setZoom] = useState(1);

  // If imageUrl matches a project ID, render a project preview
  const project = imageUrl ? getProjectById(imageUrl) : undefined;

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--xp-face)' }}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1" style={{ borderBottom: '1px solid #d4d0c8' }}>
        <button className="xp-button" style={{ padding: '3px 8px', minHeight: 'auto' }} onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}>
          🔍 -
        </button>
        <span className="text-xs px-2">{Math.round(zoom * 100)}%</span>
        <button className="xp-button" style={{ padding: '3px 8px', minHeight: 'auto' }} onClick={() => setZoom(Math.min(3, zoom + 0.25))}>
          🔍 +
        </button>
        <button className="xp-button" style={{ padding: '3px 8px', minHeight: 'auto' }} onClick={() => setZoom(1)}>
          Actual Size
        </button>
        <button className="xp-button" style={{ padding: '3px 8px', minHeight: 'auto' }} onClick={() => setZoom(0.5)}>
          Fit to Window
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 overflow-auto os-scroll flex items-center justify-center" style={{ background: '#2a2a2a' }}>
        {project ? (
          <div className="text-center" style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease' }}>
            <ProjectPreview project={project} />
          </div>
        ) : (
          <div className="text-center" style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease' }}>
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 480,
                height: 360,
                background: 'linear-gradient(135deg, #1a3a6a, #2b80ee)',
              }}
            >
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">🖼</div>
                <div className="text-sm opacity-75">{fileName}</div>
                {description && <div className="text-xs mt-2 opacity-60">{description}</div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="xp-statusbar">
        <span className="xp-statusbar-section">{fileName}</span>
        <span>{project ? `${project.name} Preview` : 'Image File'}</span>
        <span className="ml-auto">Zoom: {Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: NonNullable<ReturnType<typeof getProjectById>> }) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-2xl"
      style={{ width: 480, background: '#1a1a2a', border: '2px solid #444' }}
    >
      {/* Mock browser chrome */}
      <div className="flex items-center gap-1 px-2 py-1" style={{ background: '#2a2a3a' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 ml-2 text-xs text-gray-400 truncate">{project.id}.localhost</div>
      </div>

      {/* Preview content */}
      <div className="p-6" style={{ background: `linear-gradient(135deg, ${project.id === 'restaurant' ? '#8a5a3a, #c8a070' : project.id === 'expense' ? '#2a6a4a, #4a9d6a' : '#4a8a7a, #6ab0a0'})` }}>
        <div className="text-5xl mb-3 text-center">{project.icon}</div>
        <div className="text-white font-bold text-lg text-center mb-1">{project.name}</div>
        <div className="text-white/70 text-xs text-center mb-4">{project.short}</div>
        <div className="space-y-1">
          {project.features.slice(0, 3).map((f, i) => (
            <div key={i} className="text-white/80 text-xs flex items-center gap-2">
              <span>▸</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
