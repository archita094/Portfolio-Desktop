import { useState } from 'react';

interface NotepadProps {
  content?: string;
  fileName?: string;
  onXP?: (n: number) => void;
}

export function Notepad({ content = '', fileName = 'Untitled' }: NotepadProps) {
  const [text, setText] = useState(content);
  const [wrap, setWrap] = useState(true);

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--xp-face)' }}>
      {/* Menu bar */}
      <div className="flex items-center text-xs px-1 py-0.5 gap-3" style={{ borderBottom: '1px solid #aca899' }}>
        <span className="px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer">File</span>
        <span className="px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer">Edit</span>
        <span className="px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer">Format</span>
        <span className="px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer" onClick={() => setWrap(!wrap)}>Word Wrap {wrap ? '✓' : ''}</span>
        <span className="px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer">Help</span>
      </div>

      {/* Text area */}
      <textarea
        className="flex-1 p-2 text-sm resize-none outline-none os-scroll"
        style={{
          background: 'white',
          fontFamily: 'Lucida Console, Courier New, monospace',
          fontSize: '13px',
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          overflowWrap: wrap ? 'break-word' : 'normal',
          border: 'none',
          color: '#1a1a1a',
        }}
        value={text}
        onChange={e => setText(e.target.value)}
        spellCheck={false}
      />

      {/* Status bar */}
      <div className="xp-statusbar">
        <span className="xp-statusbar-section">{fileName}</span>
        <span>{text.length} characters</span>
        <span className="ml-auto">Ln {(text.substring(0, text.length).match(/\n/g)?.length || 0) + 1}, Col {text.length - text.lastIndexOf('\n')}</span>
      </div>
    </div>
  );
}
