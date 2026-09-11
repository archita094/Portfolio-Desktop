import { useState } from 'react';
import { AboutWindow, SkillsWindow, ProjectsWindow, ResumeWindow, AchievementsWindow, ContactWindow } from '@/components/Windows';
import { Github, Linkedin, Mail, User, Code, FolderOpen, FileText, Trophy, PhoneCall, Home, Menu } from 'lucide-react';
import { useXP } from '@/hooks/useLocalStorage';

type MobileSection = 'home' | 'about' | 'skills' | 'projects' | 'resume' | 'achievements' | 'contact';

export function MobileLayout() {
  const [section, setSection] = useState<MobileSection>('home');
  const { addXP } = useXP();

  const navItems: { id: MobileSection; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
    { id: 'achievements', label: 'Trophies', icon: <Trophy size={18} /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall size={18} /> },
  ];

  if (section === 'home') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #6bb6ff 0%, #8fc8ff 30%, #b8d8ff 50%, #a8d8a0 60%, #7cc77c 80%, #5cb85c 100%)' }}>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-5xl mb-4">🖥</div>
          <h1 className="text-2xl font-bold text-white text-center mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Archita OS
          </h1>
          <p className="text-white text-sm text-center mb-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Archita Srivastava
          </p>
          <p className="text-white text-xs text-center mb-6 opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Computer Science Engineer & Developer
          </p>

          <button
            className="mb-3 px-6 py-3 bg-white rounded-lg font-bold text-sm shadow-lg active:scale-95 transition"
            style={{ color: '#0a4bb8' }}
            onClick={() => setSection('projects')}
          >
            📁 View My Projects
          </button>
          <button
            className="px-6 py-3 bg-white/90 rounded-lg font-bold text-sm shadow-lg active:scale-95 transition"
            style={{ color: '#0a4bb8' }}
            onClick={() => setSection('about')}
          >
            💻 About Me
          </button>

          <div className="flex gap-4 mt-8">
            <a href="#" className="text-white p-2 bg-black/20 rounded-full"><Github size={20} /></a>
            <a href="#" className="text-white p-2 bg-black/20 rounded-full"><Linkedin size={20} /></a>
            <a href="mailto:archita@example.com" className="text-white p-2 bg-black/20 rounded-full"><Mail size={20} /></a>
          </div>
        </div>

        <div className="bg-[#2a5b9a] border-t-2 border-[#5a8bd0] px-2 py-2">
          <div className="flex justify-around items-center">
            <button onClick={() => setSection('about')} className="flex flex-col items-center gap-1 text-white text-xs">
              <User size={20} /> About
            </button>
            <button onClick={() => setSection('projects')} className="flex flex-col items-center gap-1 text-white text-xs">
              <FolderOpen size={20} /> Work
            </button>
            <button onClick={() => setSection('contact')} className="flex flex-col items-center gap-1 text-white text-xs">
              <PhoneCall size={20} /> Contact
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#c9d6e5' }}>
      {/* Header */}
      <div className="bg-[#0a4bb8] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={() => setSection('home')} className="flex items-center gap-2">
          <Home size={20} />
          <span className="font-bold text-sm">Archita OS</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {section === 'about' && <AboutWindow onXP={addXP} />}
        {section === 'skills' && <SkillsWindow onXP={addXP} />}
        {section === 'projects' && <ProjectsWindow onXP={addXP} />}
        {section === 'resume' && <ResumeWindow onXP={addXP} />}
        {section === 'achievements' && <AchievementsWindow onXP={addXP} />}
        {section === 'contact' && <ContactWindow onXP={addXP} />}
      </div>

      {/* Bottom Nav */}
      <div className="bg-[#2a5b9a] border-t-2 border-[#5a8bd0] px-1 py-2 flex justify-around items-center overflow-x-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex flex-col items-center gap-1 text-xs px-2 py-1 rounded transition ${section === item.id ? 'text-white bg-white/20' : 'text-white/70'
              }`}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
