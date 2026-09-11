import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { getProjectById, type Project } from '@/data/fileSystem';
import {
  Github,
  ExternalLink,
  FileText,
  Check,
  Eye,
  Sparkles,
  Home,
  Layers,
  Cpu,
  ArrowUp,
} from 'lucide-react';
import { useDesktopStore } from '@/store/desktop';
import { useXP } from '@/hooks/useLocalStorage';

interface ProjectLauncherProps {
  projectId?: string;
  onXP?: (n: number) => void;
}

type Tab = 'all' | 'features' | 'tech';

export function ProjectLauncher({ projectId, onXP }: ProjectLauncherProps) {
  const project = projectId ? getProjectById(projectId) : undefined;
  const store = useDesktopStore();
  const { unlockAchievement } = useXP();

  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const directionRef = useRef<'up' | 'down'>('down');

  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!project) return;

    onXP?.(15);
    unlockAchievement(`project-${project.id}`, 20);
  }, [project, onXP, unlockAchievement]);

  // Scroll-direction aware reveal animation.
  // Elements animate again when they leave and re-enter the viewport.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const currentTop = container.scrollTop;
      directionRef.current =
        currentTop > lastScrollTop.current ? 'down' : 'up';

      lastScrollTop.current = currentTop;
      setShowTop(currentTop > 520);
    };

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });

    const revealItems = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal]')
    );

    if (typeof IntersectionObserver === 'undefined') {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return () => {
        container.removeEventListener('scroll', updateScrollState);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.remove('reveal-up', 'reveal-down');
            element.classList.add(
              directionRef.current === 'up' ? 'reveal-down' : 'reveal-up'
            );

            requestAnimationFrame(() => {
              element.classList.add('is-visible');
            });
          } else {
            element.classList.remove(
              'is-visible',
              'reveal-up',
              'reveal-down'
            );
          }
        });
      },
      {
        root: container,
        threshold: 0.12,
        rootMargin: '0px 0px -7% 0px',
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      container.removeEventListener('scroll', updateScrollState);
    };
  }, [project, activeTab]);

  if (!project) {
    return (
      <div className="pl-container pl-scroll">
        <div className="pl-empty-card">
          <div className="pl-empty-orbit">
            <span>✦</span>
          </div>
          <p className="pl-eyebrow">PROJECT ERROR</p>
          <h3>Project Not Found</h3>
          <p>The requested project could not be loaded.</p>
        </div>
      </div>
    );
  }

  const handlePreview = (proj: Project) => {
    const winId = `image-${proj.id}-preview`;

    store.openWindow({
      id: winId,
      title: `${proj.name} — Preview`,
      icon: '🖼',
      component: 'imageviewer',
      x: 220,
      y: 110,
      width: 580,
      height: 440,
      data: {
        imageUrl: proj.id,
        fileName: 'preview.png',
      },
    });
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
  <div className="pl-container">

    {/* Background */}
    <video
      className="pl-background-video wallpaper"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/proj-wallpaper.mp4" type="video/mp4" />
    </video>

    <div className="pl-video-overlay" />

    {/* Centered Project Card */}
    <main className="pl-content">

      <section className="pl-project-card">

        {/* Header */}
        <div className="pl-project-header">

          <div className="pl-project-icon">
            {project.icon}
          </div>

          <div className="pl-project-heading">
            <span className="pl-eyebrow">
              PROJECT / PORTFOLIO
            </span>

            <h1>{project.name}</h1>

            <p>{project.short}</p>
          </div>

        </div>

        {/* Description */}
        <div className="pl-section">

          <span className="pl-section-label">
            ABOUT THE PROJECT
          </span>

          <p className="pl-description">
            {project.description}
          </p>

        </div>


        {/* Features */}
        <div className="pl-section">

          <span className="pl-section-label">
            KEY FEATURES
          </span>

          <div className="pl-feature-list">

            {project.features.length > 0 ? (
              project.features.map((feature, index) => (
                <div
                  key={index}
                  className="pl-feature-item"
                >
                  <div className="pl-check">
                    <Check size={12} />
                  </div>

                  <span>{feature}</span>
                </div>
              ))
            ) : (
              <p className="pl-empty-text">
                No features available.
              </p>
            )}

          </div>

        </div>


        {/* Tech Stack */}
        <div className="pl-section">

          <span className="pl-section-label">
            TECH STACK
          </span>

          <div className="pl-tech-grid">

            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="pl-tech-tag"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>


        {/* Actions 
        <div className="pl-actions">

          <button
            className="pl-primary-btn"
            onClick={() => handlePreview(project)}
          >
            <Eye size={15} />
            Preview project
          </button>

          {project.liveDemo &&
            project.liveDemo !== '#' && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-secondary-btn"
              >
                <ExternalLink size={14} />
                Live demo
              </a>
          )}

          {project.github &&
            project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-secondary-btn"
              >
                <Github size={14} />
                Source code
              </a>
          )}

          {project.caseStudy &&
            project.caseStudy !== '#' && (
              <a
                href={project.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-secondary-btn"
              >
                <FileText size={14} />
                Case study
              </a>
          )}

        </div>*/}

      </section>

    </main>

  </div>
);
}
