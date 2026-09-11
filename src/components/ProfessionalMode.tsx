import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import "@/styles/professional.css";

/* =========================================================
   CONFIG
========================================================= */

const FORMSPREE_FORM_ID = "mwpljvko";

/* =========================================================
   DATA
========================================================= */
const projects = [
  {
    title: "Restaurant Booking System",
    date: "2025",
    role: "Full-stack Developer",
    type: "Web Application",
    className: "peach",
    image: "/p1.png",
    description:
      "A restaurant reservation experience with pre-menu selection, designed to make booking a table and planning a meal part of the same flow.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
  },

  {
    title: "Expense Tracker",
    date: "2025",
    role: "Developer",
    type: "Web Application",
    className: "lavender",
    image: "/p2.png",
    description:
      "A clean expense management application for recording spending, organizing transactions and making personal finances easier to understand.",
    technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
  },

  {
    title: "Mental Health Website",
    date: "2025",
    role: "Frontend Developer",
    type: "Web Experience",
    className: "mint",
    image: "/p3.png",
    description:
      "A responsive mental wellness website focused on accessible information, supportive content and a calm, approachable user experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

const experience = [
  {
    period: "2024",
    title: "Intern",
    company: "Nokia Solutions and Networks India Private Limited",
    text: "Developed expertise in modern telecommunication network architectures by exploring key concepts such as call handover, signaling, and core network operations. Additionally, built a Nokia website clone, replicating its design and structure to enhance web development skills.",
  },
];

const education = [
  {
    period: "2023 — Present",
    title: "Bachelor of Engineering in Computer Science",
    place: "Mohali, Chandigarh, India",
  },
];

const certificates: { time: string; title: string; site: string; text?: string }[] = [
  {
    time: "September 2026",
    title: "AI Powered UI/UX Design",
    site: "AI CERTs, Coursera",
  },
  {
    time: "June 2026",
    title: "Generative AI and ChatGPT",
    site: "GeeksforGeeks",
  },
  {
    time: "February 2025",
    title: "Responsive Web Design",
    site: "freeCodeCamp",
  },
  {
    time: "April 2024",
    title: "Database management System ",
    site: "NPTEL",
  },
  
];
/* =========================================================
   ICON
========================================================= */

function Icon({ children, size = 18 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

interface SidebarProps {
  onContact?: () => void;
  onExit?: () => void;
}

function Sidebar({ onContact, onExit }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {onExit && (
          <button
            type="button"
            className="exit-os-btn"
            onClick={onExit}
            title="Return to Archita OS Desktop"
          >
            <Icon size={16}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </Icon>
            <span>Back to Desktop</span>
          </button>
        )}

        <div className="banner-wrap">
          <img
            src="/profile.png"
            alt="Software Developer"
            className="developer-banner"
          />

  <div className="glass-header">
    <span>Software</span>
    <strong>Developer</strong>
  </div>
</div>

        <h1>
          Archita Srivastava{" "}
          <span className="verified" aria-label="Verified">
            ✓
          </span>
        </h1>

        <div className="pronouns">she/her</div>

        <div className="side-section">
          <div className="eyebrow">ABOUT</div>

          <p className="side-about">
            Computer Science Engineering student and developer building
            practical web applications with modern frontend and backend
            technologies.
          </p>
        </div>

        <div className="side-section">
          <div className="eyebrow">Profiles & Links</div>

          <a
            href="mailto:archita.sva@gmail.com"
            className="contact-line"
          >
            <Icon>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </Icon>

            archita.sva@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/archita09"
            className="contact-line"
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 10v6" />
              <path d="M8 7.5v.01" />
              <path d="M12 16v-6" />
              <path d="M12 12.5c.5-1.7 4-2.2 4 1V16" />
            </Icon>

            linkedin.com/in/archita09
          </a>

          <a
            href="https://github.com/archita094"
            className="contact-line"
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <circle cx="12" cy="12" r="9" />
              <path d="M8 17c-1.5-1-2-2-2-3.5" />
              <path d="M16 17c1.5-1 2-2-2-3.5" />
              <path d="M8 8c2-1 6-1 8 0" />
            </Icon>

            github.com/archita094
          </a>

          <a
            href="https://leetcode.com/u/aaarchita/"
            className="contact-line"
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <circle cx="12" cy="12" r="9" />
              <path d="M8 10v6" />
              <path d="M8 7.5v.01" />
              <path d="M12 16v-6" />
              <path d="M12 12.5c.5-1.7 4-2.2 4 1V16" />
            </Icon>

           leetcode.com/u/aaarchita/
          </a>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   CONTACT MODAL
========================================================= */

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  React.useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={onClose}
      >
        <motion.div
          className="contact-modal"
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 30,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
          >
            ×
          </button>

          {state.succeeded ? (
            <div className="form-success">
              <div className="success-icon">✓</div>

              <h2>Message sent</h2>

              <p>
                Thanks for reaching out. Your message has been
                successfully sent.
              </p>

              <button
                type="button"
                className="form-button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-header">
                <span className="eyebrow">GET IN TOUCH</span>

                <h2>Let's talk.</h2>

                <p>
                  Have a project, opportunity or simply something
                  interesting to discuss? Send me a message.
                </p>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Your Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />

                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    required
                  />

                  <ValidationError
                    prefix="Subject"
                    field="subject"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write your message here..."
                    required
                  />

                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                {state.errors && (
                  <div className="form-error">
                    Something went wrong while sending your
                    message. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  className="form-button"
                  disabled={state.submitting}
                >
                  {state.submitting
                    ? "Sending..."
                    : "Send Message"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.article
      className={`project-card ${project.className}`}
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
    >
      <div className="project-image">
  <img src={project.image} alt={project.title} />
</div>

      <div className="project-info">
        <h3>{project.title}</h3>

        <div className="meta">
          <span>◷ {project.date}</span>
          <span>•</span>
          <span>{project.type}</span>
        </div>

        <p>{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((technology: string) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        <span className="role">
          {project.role}
        </span>
      </div>
    </motion.article>
  );
}

/* =========================================================
   ANIMATED SECTION
======================================================== */

function AnimatedSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

/* =========================================================
   SECTION TITLE
======================================================== */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      {children}
    </div>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function Skills() {
  const skillCategories = [
    {
      title: "FRONTEND",
      skills: [
        "React.js",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Responsive Design",
        "Tailwind CSS",
      ],
    },
    {
      title: "BACKEND",
      skills: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
      ],
    },
    {
      title: "AI / GENAI",
      skills: [
        "LLM APIs",
        "Gemini API",
        "Prompt Engineering",
        "Generative AI",
      ],
    },
    {
      title: "DATABASES",
      skills: [
        "MongoDB",
        "Schema Design",
        "SQL",
      ],
    },
    {
      title: "PROGRAMMING",
      skills: [
        "Java",
        "C++",
        "JavaScript",
        "Python",
      ],
    },
    {
      title: "CORE CS",
      skills: [
        "DSA",
        "OOP",
        "DBMS",
        "OS",
        "CN",
        "System Design",
      ],
    },
  ];

  return (
    <div className="skill-grid">
      {skillCategories.map((category, index) => (
        <motion.div
          className="skill-category"
          key={category.title}
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: index * 0.08,
            duration: 0.5,
          }}
        >
          <div className="skill-title">
            {category.title}
          </div>

          <div className="skill-list">
            {category.skills.map((skill) => (
              <span key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

export interface ProfessionalModeProps {
  onExit?: () => void;
}

export function ProfessionalMode({ onExit }: ProfessionalModeProps) {
  const [contactOpen, setContactOpen] =
    useState(false);

  return (
    <div className="app">

      <Sidebar
        onContact={() => setContactOpen(true)}
        onExit={onExit}
      />

      <main className="content">

        {/* INTRO */}
        <AnimatedSection
          className="intro"
          id="intro"
        >
          <SectionTitle>
            INTRO
          </SectionTitle>

          <div className="intro-copy">
            <p>
              I'm{" "}
              <strong>
                Archita Srivastava
              </strong>
              , a Computer Science Engineering
              student and developer who enjoys
              turning ideas into useful, polished
              digital experiences.
            </p>

            <p>
              My interests span frontend and
              backend development, data structures,
              databases and building full-stack web
              applications. I like combining clean
              interfaces with functionality that
              actually works.
            </p>
          </div>
        </AnimatedSection>

        {/* PROJECTS */}
        <AnimatedSection id="projects">
          <SectionTitle>
            PROJECTS
          </SectionTitle>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* EXPERIENCE */}
        <AnimatedSection id="experience">
          <SectionTitle>
            EXPERIENCE
          </SectionTitle>

           <div className="rows">
            {experience.map((item) => (
              <div
                className="info-row"
                key={item.company}
              >
                <div>

                  <h3>{item.title}</h3> 
                  <span className="muted">
                    {item.company}
                  </span>
                  <span className="exp-text">{item.text}</span>

                </div>
    

                <span className="muted">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* EDUCATION */}
        <AnimatedSection id="education">
          <SectionTitle>
            EDUCATION
          </SectionTitle>

          <div className="rows">
            {education.map((item) => (
              <div
                className="info-row"
                key={item.title}
              >
                <div>
                  <h3>{item.title}</h3>

                  <span className="muted">
                    {item.place}
                  </span>
                </div>

                <span className="muted">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
        {/* Certificates */}
        <AnimatedSection id="education">
          <SectionTitle>
            CERTIFICATIONS
          </SectionTitle>

          <div className="timeline">
            {certificates.map((item) => (
              <motion.div
                className="timeline-item"
                key={item.title}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <div className="timeline-period">
                  {item.time}
                </div>

                <div>
                  <h3>{item.title}</h3>

                  <div className="muted">
                    {item.site}
                  </div>

                  {item.text && <p>{item.text}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* ACHIEVEMENTS */}
        <AnimatedSection id="achievements">
          <SectionTitle>
            EXTRACURRICULAR
          </SectionTitle>

          <div className="achievement-card">
            <div className="achievement-icon">
              ✦
            </div>

            <div>
              <h3>Volleyball</h3>

              <p>
                Zonal and state-level participation.
              </p>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon">
              ✦
            </div>

            <div>
              <h3>Bharatanatyam</h3>

              <p>
                10 years of classical dance training
                and Sangeet Prabhakar certification.
              </p>
            </div>
          </div>
           <div className="achievement-card">
            <div className="achievement-icon">
              ✦
            </div>

            <div>
              <h3>Sketching</h3>

              <p>
                Passionate about sketching and exploring creativity through different drawing styles.
              </p>
            </div>
          </div>
           <div className="achievement-card">
            <div className="achievement-icon">
              ✦
            </div>

            <div>
              <h3>Cooking</h3>

              <p>
                Passionate about cooking, experimenting with recipes, and exploring different flavors and cuisines.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* SKILLS */}
        <AnimatedSection
          id="skills"
          className="skill-section"
        >
          <SectionTitle>
            SKILL TREE
          </SectionTitle>

          <Skills />

          <div
            className="footer-links"
            id="contact"
          >
            <a href="#intro">
              Back to top
            </a>

            <button
              type="button"
              onClick={() =>
                setContactOpen(true)
              }
            >
              Get in touch!
            </button>
          </div>

          <div className="copyright">
            © 2026 Archita Srivastava
          </div>
        </AnimatedSection>

      </main>

      {/* FLOATING NAV */}
      <nav
        className="floating-nav"
        aria-label="Section navigation"
      >
        <a
          href="#intro"
          title="Intro"
          aria-label="Intro"
        >
          <Icon>
            <circle
              cx="12"
              cy="8"
              r="3"
            />
            <path d="M5 20c.8-3.2 3-5 7-5s6.2 1.8 7 5" />
          </Icon>
        </a>

        <a
          href="#projects"
          title="Projects"
          aria-label="Projects"
        >
          <Icon>
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </Icon>
        </a>

        <a
          href="#experience"
          title="Experience"
          aria-label="Experience"
        >
          <Icon>
            <rect
              x="3"
              y="7"
              width="18"
              height="13"
              rx="2"
            />
            <path d="M8 7V5h8v2M3 12h18" />
          </Icon>
        </a>

        <a
          href="#education"
          title="Education"
          aria-label="Education"
        >
          <Icon>
            <path d="m3 9 9-5 9 5-9 5-9-5Z" />
            <path d="M7 11v5c3 2 7 2 10 0v-5" />
          </Icon>
        </a>

        <a
          href="#achievements"
          title="Achievements"
          aria-label="Achievements"
        >
          <Icon>
            <circle
              cx="12"
              cy="8"
              r="5"
            />
            <path d="m9 13-1 7 4-2 4 2-1-7" />
          </Icon>
        </a>

        <button
          type="button"
          title="Contact"
          aria-label="Open contact form"
          onClick={() =>
            setContactOpen(true)
          }
        >
          <Icon>
            <path d="M4 5h16v14H4z" />
            <path d="m4 7 8 6 8-6" />
          </Icon>
        </button>

        {onExit && (
          <button
            type="button"
            title="Exit to Archita OS"
            aria-label="Return to Archita OS"
            onClick={onExit}
          >
            <Icon>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </Icon>
          </button>
        )}
      </nav>

      {/* CONTACT MODAL */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

    </div>
  );
}

/* =========================================================
   ROOT
========================================================= */

export default ProfessionalMode;