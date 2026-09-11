import { useEffect } from 'react';
import { useXP } from '@/hooks/useLocalStorage';
import type { DesktopIconDef } from '@/components/Desktop';
import '../styles/WelcomeWindow.css';

interface WelcomeWindowProps {
  onOpenWindow: (def: DesktopIconDef) => void;
}

export function WelcomeWindow({ onOpenWindow }: WelcomeWindowProps) {
  const { addXP, unlockAchievement } = useXP();

  useEffect(() => {
    addXP(10);
    unlockAchievement('welcome_opened', 10);
  }, [addXP, unlockAchievement]);

  return (
    <div className="welcome-window">
      <div>
        {/* Header */}
        <div className="welcome-header">
          <div className="welcome-header-icon">
            🖥
          </div>

          <div>

            <p className="welcome-header-subtitle">
              Interactive Windows Portfolio Experience
            </p>
          </div>
        </div>

        {/* Intro Card */}
        <div className="welcome-card">
          <div className="welcome-profile">
            <span className="welcome-profile-icon">
              👋
            </span>

            <div>
              <h3 className="welcome-profile-name">
                Archita Srivastava
              </h3>

              <p className="welcome-profile-role">
                Computer Science Engineer • Full-Stack Developer
              </p>
            </div>
          </div>

          <p className="welcome-description">
            Explore the desktop icons, double-click files and
            applications, and discover my projects & experience
            inside this interactive OS interface.
          </p>

          <div className="welcome-notice">
            <span className="welcome-notice-icon">
              📋
            </span>

            <p className="welcome-notice-text">
              Prefer a traditional web layout? Open the Start menu
              and select <strong>Professional Mode</strong>.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="welcome-actions">
          <button
            type="button"
            className="xp-button primary welcome-button welcome-button-primary"
            onClick={() =>
              onOpenWindow({
                id: 'My Projects',
                label: 'My Projects',
                icon: '📁',
                component: 'fileexplorer',
                data: { path: ['My Projects'] },
              })
            }
          >
            📁
            <span>VIEW MY PROJECTS</span>
          </button>

          <button
            type="button"
            className="xp-button welcome-button"
            onClick={() =>
              onOpenWindow({
                id: 'About Me',
                label: 'About Me',
                icon: '👤',
                component: 'aboutme',
              })
            }
          >
            💻
            <span>ABOUT ME</span>
          </button>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="welcome-tip">
        <span className="welcome-tip-icon">
          💡
        </span>

        <p className="welcome-tip-text">
          <strong>Tip:</strong> Double-click desktop icons to navigate
          folders and view files like a real operating system.
        </p>
      </div>
    </div>
  );
}