import React, { useState, useEffect, useRef } from "react";
import { useForm } from "@formspree/react";
import { useDesktopStore } from "@/store/desktop";
import "../styles/liquid-glass.css";
import "@/styles/about-console.css";
import avatar from "@/assets/avatar.jpg";

import {
  projects,
  skills,
  achievements,
  socials,
  educationList,
  experienceList,
  certificationList,
  profiles,
  overviewData,
  type Project,
} from "@/data/portfolio";

import {
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  FileText,
  Trophy,
  Star,
  Code,
  GraduationCap,
  Briefcase,
  User,
  Copy,
  Check,
  Award,
  Send,
  CheckCircle2,
  Globe,
} from "lucide-react";
// ============ ABOUT ME APPLICATION ============
export function AboutWindow({ onXP }: { onXP?: (xp: number) => void }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    onXP?.(15);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [onXP]);

  const scrollToSection = (id: string) => {
    if (screenRef.current) {
      const el = screenRef.current.querySelector(`#${id}`);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <div className="about-console-app">
      <video ref={videoRef} className="wallpaper" autoPlay muted loop playsInline>
        <source src="/about-wallpaper.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <main className="console-wrapper">
        <div className="console">
          {/* Console top bezel */}
          <div className="console-top">
            <div className="brand">
              <span className="brand-dot"></span>
              ARCHITA.EXE
            </div>
            <div className="console-status">
              <span className="status-light"></span>
              SYSTEM ONLINE
            </div>
          </div>

          {/* Actual screen */}
          <div className="screen" ref={screenRef}>
            {/* Screen navigation */}
            <nav className="screen-nav">
              <button onClick={() => scrollToSection("home")}>HOME</button>
              <button onClick={() => scrollToSection("experience")}>EXPERIENCE</button>
              <button onClick={() => scrollToSection("projects")}>PROJECTS</button>
              <button onClick={() => scrollToSection("skills")}>SKILLS</button>
              <button onClick={() => scrollToSection("achievements")}>ACHIEVEMENTS</button>
            </nav>

            {/* HOME */}
            <section id="home" className="portfolio-section home-section">
              <div className="profile">
                <div className="profile-image">
                  <img src={avatar} alt="Archita Srivastava" />
                </div>
                <div className="profile-info">
                  <div className="mini-label">PLAYER PROFILE</div>
                  <h1>Archita Srivastava</h1>
                  <p className="role">AI & Full-Stack Developer</p>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="content-section">
                <div className="section-label">
                  <span>01</span>ABOUT ME
                </div>
                <p className="about-text">
                  Computer Science undergraduate building AI-powered full-stack applications. I enjoy turning ideas into practical products using React, Node.js, MongoDB and LLM APIs.
                </p>
              </div>

              {/* Stats */}
              <div className="stats">
                <div className="stat">
                  <strong>500+</strong>
                  <span>DSA PROBLEMS</span>
                </div>
                <div className="stat">
                  <strong>03</strong>
                  <span>PROJECTS</span>
                </div>
                <div className="stat">
                  <strong>01</strong>
                  <span>INTERNSHIP</span>
                </div>
                <div className="stat">
                  <strong>TOP 45</strong>
                  <span>SIH</span>
                </div>
              </div>

              {/* Education */}
              <div className="content-section edu">
                <div className="section-label">
                  <span>02</span>EDUCATION
                </div>
                <div className="education-card">
                  <div className="education-icon">🎓</div>
                  <div>
                    <h3>B.E. Computer Science Engineering</h3>
                    <p>Chandigarh University · 2023 — 2027</p>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="portfolio-section">
              <div className="section-heading">
                <span>03</span>EXPERIENCE
              </div>
              <div className="experience-card">
                <div className="experience-top">
                  <div>
                    <div className="card-tag">SOFTWARE ENGINEERING INTERN</div>
                    <h2>Nokia Solutions & Networks</h2>
                    <p className="muted">December 2024</p>
                  </div>
                  <div className="level-badge">EXP</div>
                </div>
                <div className="experience-line"></div>
                <ul>
                  <li>Collaborated with engineering teams on enterprise-scale internal tools and workflows.</li>
                  <li>Contributed to backend service improvements focused on reliability and maintainability.</li>
                  <li>Worked with Git/GitHub and agile development practices.</li>
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="portfolio-section">
              <div className="section-heading">
                <span>04</span>PROJECTS
              </div>
              <div className="projects-grid">
                <article className="project-card">
                  <div className="project-number">PROJECT_01</div>
                  <div className="project-icon">🍽️</div>
                  <h2>ChatoriGali</h2>
                  <p className="project-type">AI Reservation & Recommendation System</p>
                  <div className="project-tech">
                    <span>MERN</span>
                    <span>JWT</span>
                    <span>Gemini</span>
                  </div>
                  <a href="#" className="project-button">VIEW PROJECT ↗</a>
                </article>

                <article className="project-card">
                  <div className="project-number">PROJECT_02</div>
                  <div className="project-icon">💰</div>
                  <h2>AI Financial Analytics</h2>
                  <p className="project-type">Personal Finance & AI Insights</p>
                  <div className="project-tech">
                    <span>React</span>
                    <span>Node</span>
                    <span>MongoDB</span>
                  </div>
                  <a href="#" className="project-button">VIEW PROJECT ↗</a>
                </article>

                <article className="project-card">
                  <div className="project-number">PROJECT_03</div>
                  <div className="project-icon">🧠</div>
                  <h2>Mental Health Platform</h2>
                  <p className="project-type">AI-enabled healthcare platform</p>
                  <div className="project-tech">
                    <span>React</span>
                    <span>Express</span>
                    <span>MongoDB</span>
                  </div>
                  <a href="#" className="project-button">VIEW PROJECT ↗</a>
                </article>
              </div>
            </section>

            {/* SKILLS */}
            <section id="skills" className="portfolio-section">
              <div className="section-heading">
                <span>05</span>SKILL TREE
              </div>
              <div className="skill-grid">
                <div className="skill-category">
                  <div className="skill-title">FRONTEND</div>
                  <div className="skill-list">
                    <span>React.js</span>
                    <span>JavaScript</span>
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>Responsive Design</span>
                  </div>
                </div>
                <div className="skill-category">
                  <div className="skill-title">BACKEND</div>
                  <div className="skill-list">
                    <span>Node.js</span>
                    <span>Express.js</span>
                    <span>REST APIs</span>
                    <span>JWT</span>
                  </div>
                </div>
                <div className="skill-category">
                  <div className="skill-title">AI / GENAI</div>
                  <div className="skill-list">
                    <span>LLM APIs</span>
                    <span>Gemini API</span>
                    <span>Prompt Engineering</span>
                    <span>Generative AI</span>
                  </div>
                </div>
                <div className="skill-category">
                  <div className="skill-title">DATABASES</div>
                  <div className="skill-list">
                    <span>MongoDB</span>
                    <span>Schema Design</span>
                    <span>SQL</span>
                  </div>
                </div>
                <div className="skill-category">
                  <div className="skill-title">PROGRAMMING</div>
                  <div className="skill-list">
                    <span>Java</span>
                    <span>C++</span>
                    <span>JavaScript</span>
                    <span>Python</span>
                  </div>
                </div>
                <div className="skill-category">
                  <div className="skill-title">CORE CS</div>
                  <div className="skill-list">
                    <span>DSA</span>
                    <span>OOP</span>
                    <span>DBMS</span>
                    <span>OS</span>
                    <span>CN</span>
                    <span>System Design</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section id="achievements" className="portfolio-section">
              <div className="section-heading">
                <span>06</span>ACHIEVEMENTS UNLOCKED
              </div>
              <div className="achievement-list">
                <div className="achievement">
                  <div className="achievement-icon">🏆</div>
                  <div>
                    <h3>500+ DSA Problems</h3>
                    <p>LeetCode · GeeksforGeeks · Codeforces</p>
                  </div>
                  <span className="unlocked">UNLOCKED</span>
                </div>
                <div className="achievement">
                  <div className="achievement-icon">🏆</div>
                  <div>
                    <h3>Smart India Hackathon</h3>
                    <p>Ranked among Top 45 teams</p>
                  </div>
                  <span className="unlocked">UNLOCKED</span>
                </div>
                <div className="achievement">
                  <div className="achievement-icon">◆</div>
                  <div>
                    <h3>Generative AI Certification</h3>
                    <p>GeeksforGeeks</p>
                  </div>
                  <span className="unlocked">UNLOCKED</span>
                </div>
                <div className="achievement">
                  <div className="achievement-icon">◆</div>
                  <div>
                    <h3>AI Powered UI/UX Design</h3>
                    <p>Coursera · AI CERTs</p>
                  </div>
                  <span className="unlocked">UNLOCKED</span>
                </div>
                <div className="achievement">
                  <div className="achievement-icon">◆</div>
                  <div>
                    <h3>NPTEL DBMS Certification</h3>
                    <p>Database Management Systems</p>
                  </div>
                  <span className="unlocked">UNLOCKED</span>
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="portfolio-section contact-section">
              <div className="section-heading">
                <span>07</span>CONNECTION TERMINAL
              </div>
              <h2 className="contact-title">LET'S BUILD SOMETHING.</h2>
              <p className="contact-text">
                Have an idea, opportunity, or interesting problem? Let's connect.
              </p>
              <div className="contact-links">
                <a href={socials.github || "#"} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
                <a href={socials.linkedin || "#"} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
                <a href={socials.leetcode || "#"} target="_blank" rel="noopener noreferrer">LEETCODE ↗</a>
                <a href={`mailto:${socials.email || "archita@example.com"}`}>EMAIL ↗</a>
              </div>
            </section>
          </div>

          {/* Console bottom bezel */}
          <div className="console-bottom">
            <div className="bottom-hint">↑ ↓ SCROLL TO EXPLORE</div>
            <div className="console-controls">
              <span className="control-dot"></span>
              <span className="control-dot"></span>
              <span className="control-dot"></span>
            </div>
            <div className="version">v1.0.26</div>
          </div>
        </div>
      </main>
    </div>
  );
}
function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t transition border-t border-l border-r ${
        active
          ? 'bg-white text-blue-900 border-gray-300 font-bold shadow-xs -mb-px pb-2'
          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-4">
      {/* Executive Bio */}
      <div className="xp-group-box bg-white shadow-xs">
        <div className="xp-group-box-title text-blue-900 flex items-center gap-1">
          <User size={13} /> Executive Overview
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">
          {overviewData.summary}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-2">
          Specializing in <strong>Full-Stack Web Development</strong>, <strong>Data Structures & Algorithms</strong>, and <strong>Database Management Systems</strong>. Dedicated to engineering user-centric web applications and solving complex algorithmic challenges.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {overviewData.stats.map((stat, idx) => (
          <div key={idx} className="xp-outset bg-white p-3 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-sm font-bold text-blue-950">{stat.value}</div>
            <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Key Highlights */}
      <div className="xp-group-box bg-white">
        <div className="xp-group-box-title text-blue-900">Key Highlights</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1">
          <div className="flex items-start gap-2 text-xs text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">
            <CheckCircle2 size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-900">Computer Science Engineer</strong>
              <span>Strong academic and practical software engineering foundation.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">
            <CheckCircle2 size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-900">LeetCode Competitive Programmer</strong>
              <span>250+ solved problems across Arrays, Strings, Trees, and Graphs.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">
            <CheckCircle2 size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-900">NPTEL DBMS Certified</strong>
              <span>Verified expertise in Relational Databases, SQL, Normalization, & Transactions.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">
            <CheckCircle2 size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-900">Neuroimaging Research Contributor</strong>
              <span>Hands-on work with processing pediatric brain imaging datasets.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechStackSection() {
  return (
    <div className="space-y-4">
      {/* Languages */}
      <div className="xp-group-box bg-white">
        <div className="xp-group-box-title text-blue-900 flex items-center gap-1.5">
          <Code size={14} /> Programming Languages
        </div>
        <div className="space-y-2.5 mt-1">
          {skills.languages.map(s => (
            <div key={s.name}>
              <div className="flex justify-between text-xs font-semibold mb-1 text-gray-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {s.name}
                </span>
                <span className="text-yellow-600 font-mono">{'★'.repeat(s.level)}{'☆'.repeat(5 - s.level)}</span>
              </div>
              <div className="xp-progress-bg">
                <div className="xp-progress-fill" style={{ width: `${(s.level / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Web Development */}
      <div className="xp-group-box bg-white">
        <div className="xp-group-box-title text-blue-900 flex items-center gap-1.5">
          <Globe size={14} /> Web Development & Frameworks
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {skills.web.map(s => (
            <span key={s.name} className="xp-outset bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {s.name}
            </span>
          ))}
          <span className="xp-outset bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            React.js
          </span>
          <span className="xp-outset bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            REST APIs
          </span>
        </div>
      </div>

      {/* Databases & Core Fundamentals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="xp-group-box bg-white">
          <div className="xp-group-box-title text-blue-900">Databases & Storage</div>
          <div className="space-y-2 mt-1">
            {skills.databases.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-gray-900">{s.name}</span>
                <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-semibold">● UNLOCKED</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border border-gray-200">
              <span className="font-bold text-gray-900">PostgreSQL</span>
              <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-semibold">● UNLOCKED</span>
            </div>
          </div>
        </div>

        <div className="xp-group-box bg-white">
          <div className="xp-group-box-title text-blue-900">Core Computer Science</div>
          <div className="space-y-2 mt-1">
            {skills.core.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-gray-900">{s.name}</span>
                <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold">CORE</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border border-gray-200">
              <span className="font-bold text-gray-900">Object-Oriented Programming (OOP)</span>
              <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold">CORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilesSection({
  copyEmail,
  copied,
}: {
  copyEmail: () => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 p-2.5 rounded flex items-center justify-between">
        <span>🌐 Connect with Archita across developer platforms:</span>
        <span className="font-semibold text-blue-800">Direct Profiles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* GitHub Card */}
        <div className="xp-group-box bg-white p-4">
          <div className="xp-group-box-title text-blue-900 flex items-center gap-1.5">
            <Github size={14} /> Git Profile
          </div>
          <div className="flex items-start gap-3 mt-1">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0 text-lg">
              <Github size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900">GitHub Profile</h3>
              <p className="text-xs text-gray-500">@architasrivastava</p>
              <p className="text-xs text-gray-700 mt-1">Open source repositories, web development projects, and code contributions.</p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-button primary text-xs flex items-center gap-1.5"
                >
                  <ExternalLink size={12} /> Visit GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Card */}
        <div className="xp-group-box bg-white p-4">
          <div className="xp-group-box-title text-yellow-700 flex items-center gap-1.5">
            <Code size={14} /> LeetCode Profile
          </div>
          <div className="flex items-start gap-3 mt-1">
            <div className="w-10 h-10 rounded-full bg-yellow-500 text-gray-950 flex items-center justify-center flex-shrink-0 font-bold text-lg">
              🧩
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900">LeetCode Profile</h3>
              <p className="text-xs text-gray-500">@architasrivastava</p>
              <p className="text-xs text-gray-700 mt-1">Solving Data Structures & Algorithms challenges with 250+ problems solved.</p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-button text-xs bg-yellow-400 hover:bg-yellow-300 text-gray-950 border-yellow-600 font-bold flex items-center gap-1.5"
                >
                  <ExternalLink size={12} /> Visit LeetCode Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="xp-group-box bg-white p-4">
          <div className="xp-group-box-title text-blue-700 flex items-center gap-1.5">
            <Linkedin size={14} /> LinkedIn Profile
          </div>
          <div className="flex items-start gap-3 mt-1">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-lg">
              <Linkedin size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900">LinkedIn Profile</h3>
              <p className="text-xs text-gray-500">Archita Srivastava</p>
              <p className="text-xs text-gray-700 mt-1">Professional network, academic milestones, and work updates.</p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-button text-xs bg-blue-50 text-blue-900 border-blue-400 font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink size={12} /> Visit LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gmail Card */}
        <div className="xp-group-box bg-white p-4">
          <div className="xp-group-box-title text-red-700 flex items-center gap-1.5">
            <Mail size={14} /> Gmail / Email Contact
          </div>
          <div className="flex items-start gap-3 mt-1">
            <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-lg">
              <Mail size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900">Gmail Address</h3>
              <p className="text-xs text-gray-700 font-mono select-all bg-gray-100 p-1 rounded mt-1 border border-gray-200 truncate">
                {socials.email}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`mailto:${socials.email}`}
                  className="xp-button primary text-xs flex items-center gap-1.5"
                >
                  <Send size={12} /> Send Email
                </a>
                <button
                  onClick={copyEmail}
                  className="xp-button text-xs flex items-center gap-1.5"
                >
                  {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="space-y-4">
      {educationList.map((edu, idx) => (
        <div key={idx} className="xp-group-box bg-white p-4">
          <div className="xp-group-box-title text-blue-900 flex items-center gap-1.5">
            <GraduationCap size={14} /> {edu.degree}
          </div>
          <div className="flex justify-between items-start flex-wrap gap-2 mt-1">
            <div>
              <h3 className="font-bold text-sm text-gray-900">{edu.institution}</h3>
              <p className="text-xs text-blue-800 font-semibold mt-0.5">{edu.period}</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed mt-2">{edu.description}</p>
          
          <div className="mt-3">
            <div className="text-xs font-bold text-gray-800 mb-1.5">Key Academic Coursework:</div>
            <div className="flex flex-wrap gap-1.5">
              {edu.coursework.map(course => (
                <span key={course} className="text-[11px] bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded font-medium">
                  • {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="space-y-4">
      {experienceList.map((exp, idx) => (
        <div key={idx} className="xp-group-box bg-white p-4">
          <div className="xp-group-box-title text-blue-900 flex items-center gap-1.5">
            <Briefcase size={14} /> {exp.role}
          </div>
          <div className="flex justify-between items-start flex-wrap gap-2 mt-1">
            <div>
              <h3 className="font-bold text-sm text-gray-900">{exp.organization}</h3>
              <p className="text-xs text-blue-800 font-semibold mt-0.5">{exp.period}</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed mt-2">{exp.description}</p>
          
          <ul className="mt-2.5 space-y-1.5 text-xs text-gray-800">
            {exp.bullets.map((b, bIdx) => (
              <li key={bIdx} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5 font-bold">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CertificationsSection() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {certificationList.map(cert => (
          <div key={cert.id} className="xp-group-box bg-white p-4">
            <div className="xp-group-box-title text-blue-900 flex items-center gap-1.5">
              <Award size={14} /> {cert.title}
            </div>
            <div className="flex items-start gap-3 mt-1">
              <div className="text-3xl flex-shrink-0 p-2 bg-amber-50 border border-amber-200 rounded">
                {cert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-900">{cert.title}</h3>
                <p className="text-xs text-blue-800 font-semibold">{cert.issuer} • {cert.date}</p>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">{cert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="xp-outset" style={{ padding: 10 }}>
      <div className="text-xs text-gray-600 font-bold">{label}</div>
      <div className="text-sm font-bold mt-1">{value}</div>
    </div>
  );
}

function PixelAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 120 120" className="pixelated">
      <rect width="120" height="120" fill="#5b9bd5" />
      <rect x="30" y="20" width="60" height="10" fill="#3a2817" />
      <rect x="25" y="30" width="70" height="15" fill="#3a2817" />
      <rect x="25" y="45" width="10" height="20" fill="#3a2817" />
      <rect x="85" y="45" width="10" height="20" fill="#3a2817" />
      <rect x="35" y="35" width="50" height="45" fill="#f0c8a0" />
      <rect x="45" y="48" width="6" height="6" fill="#1a1a2a" />
      <rect x="69" y="48" width="6" height="6" fill="#1a1a2a" />
      <rect x="42" y="46" width="12" height="10" fill="none" stroke="#333" strokeWidth="2" />
      <rect x="66" y="46" width="12" height="10" fill="none" stroke="#333" strokeWidth="2" />
      <rect x="54" y="50" width="12" height="2" fill="#333" />
      <rect x="50" y="65" width="20" height="4" fill="#c88a6a" />
      <rect x="52" y="63" width="16" height="2" fill="#c88a6a" />
      <rect x="30" y="80" width="60" height="40" fill="#2a5b9a" />
      <rect x="40" y="85" width="40" height="5" fill="#1a4b8a" />
    </svg>
  );
}

// ============ SKILLS ============
export function SkillsWindow({ onXP }: { onXP?: (n: number) => void }) {
  useEffect(() => { onXP?.(10); }, [onXP]);
  return (
    <div className="p-4 overflow-auto os-scroll" style={{ background: 'var(--xp-face)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">⚙</span>
        <div>
          <h2 className="text-base font-bold" style={{ color: '#003c99' }}>System Information</h2>
          <p className="text-xs text-gray-600">ARCHITA_OS / SYS_INFO.exe</p>
        </div>
      </div>

      {/* Languages */}
      <div className="xp-group-box">
        <div className="xp-group-box-title">Languages</div>
        <div className="space-y-2">
          {skills.languages.map(s => (
            <div key={s.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold">{s.name}</span>
                <span className="text-gray-600">{'★'.repeat(s.level)}{'☆'.repeat(5 - s.level)}</span>
              </div>
              <div className="xp-progress-bg">
                <div className="xp-progress-fill" style={{ width: `${(s.level / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Web Dev */}
      <div className="xp-group-box">
        <div className="xp-group-box-title">Web Development</div>
        <div className="grid grid-cols-2 gap-2">
          {skills.web.map(s => (
            <div key={s.name} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 border border-green-700 flex-shrink-0" />
              <span className="font-bold">{s.name}</span>
              <span className="text-xs text-green-700">● UNLOCKED</span>
            </div>
          ))}
        </div>
      </div>

      {/* Databases */}
      <div className="xp-group-box">
        <div className="xp-group-box-title">Databases</div>
        <div className="grid grid-cols-2 gap-2">
          {skills.databases.map(s => (
            <div key={s.name} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 border border-green-700 flex-shrink-0" />
              <span className="font-bold">{s.name}</span>
              <span className="text-xs text-green-700">● UNLOCKED</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core */}
      <div className="xp-group-box">
        <div className="xp-group-box-title">Core Fundamentals</div>
        <div className="space-y-2">
          {skills.core.map(s => (
            <div key={s.name} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 border border-green-700 flex-shrink-0" />
              <span className="font-bold">{s.name}</span>
              <span className="text-xs text-green-700">● UNLOCKED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ PROJECTS ============
export function ProjectsWindow({ onXP }: { onXP?: (n: number) => void }) {
  const [selected, setSelected] = useState<Project | null>(null);
  useEffect(() => { onXP?.(10); }, [onXP]);

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} onXP={onXP} />;
  }

  return (
    <div className="p-4 overflow-auto os-scroll" style={{ background: 'var(--xp-face)' }}>
      {/* Address bar */}
      <div className="flex items-center gap-2 mb-3">
        <button className="xp-button" style={{ padding: '3px 8px' }} onClick={() => { }}>←</button>
        <button className="xp-button" style={{ padding: '3px 8px' }} onClick={() => { }}>→</button>
        <div className="xp-inset flex-1 flex items-center gap-1" style={{ padding: '3px 6px' }}>
          <span className="text-xs">📁</span>
          <span className="text-xs text-gray-700">C:\Archita\Projects</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {projects.map(p => (
          <button
            key={p.id}
            className="xp-outset text-left transition"
            style={{ padding: 12 }}
            onClick={() => setSelected(p)}
          >
            <div className="text-3xl mb-2">{p.icon}</div>
            <div className="font-bold text-sm">{p.name}</div>
            <div className="text-xs text-gray-600 mt-1">{p.exe}</div>
            <div className="text-xs mt-2 text-gray-700">{p.short}</div>
          </button>
        ))}
      </div>

      <div className="xp-statusbar mt-3">
        <span className="xp-statusbar-section">{projects.length} objects</span>
        <span>My Work</span>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onXP }: { project: Project; onBack: () => void; onXP?: (n: number) => void }) {
  useEffect(() => { onXP?.(15); }, [onXP]);
  return (
    <div className="p-4 overflow-auto os-scroll" style={{ background: 'var(--xp-face)' }}>
      <div className="flex items-center gap-2 mb-3">
        <button className="xp-button" style={{ padding: '3px 10px' }} onClick={onBack}>← Back</button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{project.icon}</span>
        <div>
          <h2 className="text-lg font-bold" style={{ color: '#003c99' }}>{project.name}</h2>
          <div className="text-xs text-gray-600">{project.exe}</div>
        </div>
      </div>

      {/* Screenshot */}
      <div className="xp-inset mb-4 flex items-center justify-center" style={{ height: '150px', background: 'linear-gradient(135deg, #1a3a6a, #2b80ee)', padding: 0 }}>
        <div className="text-center text-white">
          <div className="text-5xl mb-2">{project.icon}</div>
          <div className="text-sm opacity-75">Project Preview</div>
        </div>
      </div>

      <div className="xp-group-box mb-3">
        <div className="xp-group-box-title">Description</div>
        <p className="text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="xp-group-box mb-3">
        <div className="xp-group-box-title">Features HAHAHA</div>
        <ul className="text-sm space-y-1">
          {project.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-700 mt-0.5">▸</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="xp-group-box mb-3">
        <div className="xp-group-box-title">Technologies</div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(t => (
            <span key={t} className="xp-outset text-xs font-bold" style={{ padding: '3px 8px' }}>{t}</span>
          ))}
        </div>
      </div>

      {project.humor && (
        <div className="xp-inset mb-4" style={{ background: '#ffffe1' }}>
          <p className="text-sm italic">💬 {project.humor}</p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="xp-button">
            <Github size={14} /> GitHub
          </a>
        )}
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="xp-button">
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
        {project.caseStudy && (
          <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className="xp-button">
            <FileText size={14} /> Case Study
          </a>
        )}
      </div>
    </div>
  );
}

// ============ RESUME ============
export function ResumeWindow({ onXP }: { onXP?: (n: number) => void }) {
  useEffect(() => {
    onXP?.(10);
    window.open('https://drive.google.com/file/d/13OqFPTmUOviOPkgp224m4CzVPp5ZcEAk/view', '_blank', 'noopener,noreferrer');
  }, [onXP]);

  return (
    <div className="p-5 overflow-auto os-scroll flex flex-col items-center justify-center h-full gap-4" style={{ background: 'var(--xp-face)' }}>
      <p className="text-sm font-semibold text-gray-700">Opening Resume in Google Drive...</p>
      <a
        href="https://drive.google.com/file/d/13OqFPTmUOviOPkgp224m4CzVPp5ZcEAk/view"
        target="_blank"
        rel="noopener noreferrer"
        className="xp-button primary text-xs"
      >
        📄 Open Resume in Google Drive
      </a>
    </div>
  );
}

// ============ ACHIEVEMENTS ============
export function AchievementsWindow({ onXP, unlockedIds }: { onXP?: (n: number) => void; unlockedIds?: string[] }) {
  useEffect(() => { onXP?.(10); }, [onXP]);
  return (
    <div className="p-4 overflow-auto os-scroll" style={{ background: 'var(--xp-face)' }}>
      <h2 className="text-base font-bold mb-1" style={{ color: '#003c99' }}>🏆 Achievement Room</h2>
      <p className="text-xs text-gray-600 mb-4">Trophies & Accomplishments</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((a, i) => (
          <div key={a.id} className="xp-outset trophy-pop" style={{ animationDelay: `${i * 0.1}s`, padding: 12 }}>
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{a.icon}</div>
              <div>
                <h3 className="font-bold text-sm">{a.title}</h3>
                <p className="text-xs text-gray-700 mt-1">{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {unlockedIds && unlockedIds.length > 0 && (
        <div className="mt-4 xp-inset">
          <h3 className="font-bold text-sm mb-2">🎮 Exploration Achievements</h3>
          <div className="text-sm flex items-center gap-2">
            <Star size={14} className="text-yellow-500" />
            <span>{unlockedIds.length} hidden achievements unlocked — keep exploring!</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ CONTACT ============
const FORMSPREE_FORM_ID = "mwpljvko";

export function ContactWindow({ onXP }: { onXP?: (n: number) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [spreeState, handleSpreeSubmit] = useForm(FORMSPREE_FORM_ID);

  useEffect(() => { onXP?.(10); }, [onXP]);

  useEffect(() => {
    if (spreeState.succeeded || sent) {
      const timer = setTimeout(() => {
        useDesktopStore.getState().closeWindow('contact');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [spreeState.succeeded, sent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    onXP?.(20);

    try {
      if (FORMSPREE_FORM_ID) {
        await handleSpreeSubmit(e);
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  };

  const isBtnLoading = submitting || spreeState.submitting;
  const isDone = sent || spreeState.succeeded;

  return (
    <div className="h-full w-full bg-black text-white p-6 overflow-y-auto font-sans flex flex-col justify-between select-none">
      <div>
        {/* Header */}
        <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">GET IN TOUCH</div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">Send a Message</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
            <Mail size={15} />
          </div>
        </div>

        {/* Quick Social Links */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-all">
            <Github size={13} /> GitHub
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-all">
            <Linkedin size={13} /> LinkedIn
          </a>
          <a href={`mailto:${socials.email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-all">
            <Mail size={13} /> Direct Email
          </a>
        </div>

        {/* Success or Form */}
        {isDone ? (
          <div className="bg-zinc-900/90 border border-zinc-700 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 my-4">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold">
              ✓
            </div>
            <h3 className="font-bold text-lg text-white">Message Sent!</h3>
            <p className="text-xs text-zinc-400 max-w-xs">
              Thank you for reaching out. The window will close automatically.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-white focus:outline-none text-white text-xs rounded-lg px-3 py-2 transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-white focus:outline-none text-white text-xs rounded-lg px-3 py-2 transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-white focus:outline-none text-white text-xs rounded-lg px-3 py-2 transition-all placeholder:text-zinc-600"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                placeholder="Write your message here..."
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-white focus:outline-none text-white text-xs rounded-lg px-3 py-2 resize-none transition-all placeholder:text-zinc-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isBtnLoading}
              className="w-full bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isBtnLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] text-zinc-500 text-center uppercase tracking-widest">
        Monochrome Black & White Form • Auto-Closes On Send
      </div>
    </div>
  );
}
