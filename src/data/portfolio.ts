export interface Project {
  id: string;
  name: string;
  exe: string;
  icon: string;
  short: string;
  description: string;
  features: string[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  caseStudy?: string;
  humor?: string;
}

export const projects: Project[] = [
  {
    id: 'restaurant',
    name: 'Chatori Gali',
    exe: 'restaurant.exe',
    icon: '🍽',
    short: 'Restaurant reservations & pre-menu selection',
    description:
      'A full-featured restaurant reservation platform that lets diners book tables and pre-select menu items for a smoother dining experience.',
    features: [
      'Restaurant reservations with date/time selection',
      'Pre-menu selection before arrival',
      'Gemini LLM recommendations based on cuisine, budget, location, and preferences.',
      'Improved dining experience with reduced wait times',
      'Reservation conflict handling and time-slot validation.'
    ],
    technologies: ['MERN', 'Gemini API'],
    github: '#',
    liveDemo: '#',
    caseStudy: '#',
  },
  {
    id: 'expense',
    name: 'Expense Tracker',
    exe: 'expenses.exe',
    icon: '💰',
    short: 'Track expenses with dashboard & data visualization',
    description:
      'A personal finance tool that helps users track spending, categorize transactions, and visualize financial patterns over time.',
    features: [
      'Expense tracking with categories',
      'AI classification of 1000+ expenses with 85% accuracy.',
      'LLM-generated monthly financial insights and spending recommendations.',
      'Data visualization with charts',
    ],
    technologies: ['MERN','Gemini API', 'Chart.js'],
    github: '#',
    liveDemo: '#',
    humor: 'Achievement unlocked: Knowing where your money went.',
  },
  {
    id: 'wellbeing',
    name: 'Mental Health Website',
    exe: 'wellbeing.exe',
    icon: '🌱',
    short: 'Mental health awareness & educational resources',
    description:
      'A calm, supportive web platform raising mental health awareness and providing educational resources in a gentle, accessible interface.',
    features: [
      'Mental health awareness content',
      'Full-stack platform developed for Smart India Hackathon, Top 45 team.',
      'Supportive and calming interface',
      'Accessible design for all users',
    ],
    technologies: [' React.js', 'Node.js', 'Express.j', 'MongoDB'],
    github: '#',
    liveDemo: '#',
  },
];

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const achievements: Achievement[] = [
 
  {
    id: 'coursera',
    title: 'AI CERTs AI Powered UI/UX Design Certification',
    icon: '🏆',
    description: 'Learned AI-powered UI/UX design principles, user-centered design, prototyping, and AI-assisted design workflows.',
  },
  {
    id: 'GFG',
    title: 'GeeksforGeeks Generative AI Certification Certification',
    icon: '🏆',
    description: 'Gained practical understanding of LLMs, prompt engineering, and AI-driven application development.',
  }, {
    id: 'nptel',
    title: 'NPTEL DBMS Certification',
    icon: '🏆',
    description: 'Completed NPTEL Database Management Systems certification course.',
  },
  {
    id: 'dance',
    title: 'Bharatanatyam / Sangeet Prabhakar',
    icon: '🎭',
    description: 'Sangeet Prabhakar in Bharatanatyam — years of dedication to classical dance.',
  },
  {
    id: 'volleyball',
    title: 'Zonal & State Level Volleyball',
    icon: '🏐',
    description: 'Participated in zonal and state level volleyball competitions.',
  },
];

export const skills = {
  languages: [
    { name: 'C++', unlocked: true, level: 5 },
    { name: 'Java', unlocked: true, level: 4 },
    { name: 'Python', unlocked: true, level: 4 },
    { name: 'JavaScript', unlocked: true, level: 5 },
  ],
  web: [
    { name: 'HTML', unlocked: true },
    { name: 'CSS', unlocked: true },
    { name: 'Tailwind CSS', unlocked: true },
    { name: 'React.js', unlocked: true },
    { name: 'Node.js', unlocked: true },
    { name: 'Express.js', unlocked: true },
  ],
  databases: [
    { name: 'SQL', unlocked: true },
    { name: 'MongoDB', unlocked: true },
  ],
  core: [
    { name: 'Data Structures & Algorithms', unlocked: true },
    { name: 'DBMS', unlocked: true },
    { name: 'OOP', unlocked: true },
    { name: 'System Design', unlocked: true },
    { name: 'OS', unlocked: true },
    { name: 'CN', unlocked: true },

  ],
};

export const socials = {
  github: 'https://github.com/archita094',
  leetcode: 'https://leetcode.com/u/aaarchita/',
  linkedin: 'https://linkedin.com/in/archita09',
  email: 'archita.sva@gmail.com',
};

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  coursework: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  description: string;
  badge?: string;
}

export interface ProfileLinks {
  github: string;
  leetcode: string;
  linkedin: string;
  email: string;
}

export const profiles: ProfileLinks = {
 github: 'https://github.com/archita094',
  leetcode: 'https://leetcode.com/u/aaarchita/',
  linkedin: 'https://linkedin.com/in/archita09',
  email: 'archita.sva@gmail.com',
};

export const educationList: EducationItem[] = [
  {
    degree: 'B.E— Computer Science & Engineering',
    institution: 'College of Engineering & Technology',
    period: '2022 — Present (Final Year)',
    description: 'Pursuing Bachelor of Engineering in Computer Science with a focus on Software Development and Data Structures, Algorithms.',
    coursework: [
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
     'System Design (SD)',
      'Object-Oriented Programming (C++ / Java)',
      'Operating Systems & Computer Architecture',
      'Computer Networks & Web Technologies',
    ],
  },
];

export const experienceList: ExperienceItem[] = [
  {
    role: 'Intern',
    organization: 'Nokia Solutions and Networks India Pvt. Ltd',
    period: 'December 2024',
    description: 'Collaborated with engineering teams to analyze and improve enterprise-scale internal tools and workflows',
    bullets: [
      'Contributed to backend service improvements focusing on system reliability, maintainability, and operational efficiency.',
      'Developed expertise in modern telecommunication network architectures by exploring key concepts such as call handover, signaling, and core network operations.',
      'Worked with Git/GitHub and agile development practices while quickly learning enterprise tools and processes.',
    ],
  },
];

export const certificationList: CertificationItem[] = [
 
  {
    id: 'coursera',
    title: 'AI CERTs AI Powered UI/UX Design Certification',
     issuer: 'Coursera',
    date: '2026',
    icon: '🏆',
    description: 'Learned AI-powered UI/UX design principles, user-centered design, prototyping, and AI-assisted design workflows.',
  },
  {
    id: 'GFG',
    title: 'GeeksforGeeks Generative AI Certification Certification',
     issuer: 'GeeksforGeeks',
    date: '2026',
    icon: '🏆',
    description: 'Gained practical understanding of LLMs, prompt engineering, and AI-driven application development.',
  },
   {
    id: 'nptel-dbms',
    title: 'NPTEL DBMS Certification',
    issuer: 'NPTEL / IIT Kharagpur',
    date: '2023',
    icon: '🏆',
    description: 'Completed Database Management Systems certification course with Elite recognition.',
  },
  {
    id: 'sangeet-prabhakar',
    title: 'Sangeet Prabhakar (Bharatanatyam)',
    issuer: 'Prayag Sangeet Samiti',
    date: '2022',
    icon: '🎭',
    description: 'Awarded Sangeet Prabhakar diploma degree in classical Bharatanatyam dance after years of rigorous training.',
  }
];

export const overviewData = {
  name: 'Archita Srivastava',
  title: 'Computer Science Engineer & Full-Stack Developer',
  location: 'India',
  status: 'Open to Software Engineering & Web Development Roles',
  summary: `I'm Archita Srivastava, a Computer Science Engineering student passionate about building clean, efficient, and user-centric software. I love solving algorithmic challenges on LeetCode, contributing to GitHub repositories, and engineering full-stack web applications.`,
  stats: [
    { label: 'DSA', value: '500+ Solved', icon: '🧩' },
    { label: 'GitHub Repos', value: '15+ Projects', icon: '🐱' },
    { label: 'Certifications', value: 'NPTEL & Classical', icon: '📜' },
    { label: 'Core Domain', value: 'DSA & DBMS', icon: '⚡' },
  ],
};

export const bootMessages = [
  'Initializing portfolio...',
  'Loading projects...',
  'Finding missing semicolons...',
  'Checking bugs...',
  'Pretending everything is fine...',
];

export interface RecycleItem {
  name: string;
  type: string;
  content: string;
}

export const recycleBinItems: RecycleItem[] = [
  { name: 'unfinished_projects.tmp', type: 'temp', content: 'A list of projects that sounded great at 2 AM.' },
  { name: 'questionable_design_decisions.old', type: 'old', content: 'We all have regrets. This file has more than most.' },
  { name: 'code_written_at_3am.js', type: 'js', content: 'It works. Nobody knows why. Don\'t touch it.' },
  { name: 'BUG.EXE', type: 'exe', content: '🐛 A tiny bug. It seems harmless. Click it to investigate.' },
];

export const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
