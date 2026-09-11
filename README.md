# Archita OS — Portfolio

A Windows XP-inspired interactive portfolio that works like a real computer. Double-click desktop icons to open folders, browse files, use the terminal, play a mini-game, and explore everything just like a desktop operating system.

---

## How to Run

1. Make sure [Node.js](https://nodejs.org) is installed.
2. Open a terminal in this project folder.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open the `localhost` URL shown in the terminal.

---

## Folder Structure

```
project/
│
├── public/                     ← Put your custom wallpaper image here
│   └── wallpaper.jpg           ← (add this file to change the background)
│
├── index.html                  ← HTML entry point loaded by Vite
├── package.json                ← Project dependencies and scripts
├── vite.config.ts              ← Vite build configuration
├── tailwind.config.js          ← Tailwind CSS theme settings
├── postcss.config.js           ← PostCSS config (Tailwind + Autoprefixer)
├── tsconfig.json               ← TypeScript project references
├── tsconfig.app.json           ← TypeScript config for the app
├── tsconfig.node.json          ← TypeScript config for Node tooling
├── eslint.config.js            ← ESLint rules
│
└── src/                        ← All application source code
    │
    ├── main.tsx                ← React app bootstrap (mounts App to the page)
    ├── App.tsx                 ← Main app: boot screen, desktop, window management
    ├── index.css               ← Global styles, XP theme colors, animations
    ├── vite-env.d.ts           ← Vite type declarations
    │
    ├── components/             ← All UI components
    │   │
    │   ├── BootScreen.tsx      ← Fake OS boot animation on first load
    │   ├── Wallpaper.tsx       ← Desktop background (custom image or XP Bliss)
    │   ├── Desktop.tsx         ← Desktop icons, pixel character, bug easter egg, XP counter
    │   ├── Taskbar.tsx         ← Bottom taskbar with Start menu, window buttons, clock
    │   ├── Window.tsx          ← Draggable/resizable window frame (title bar, min/max/close)
    │   ├── WindowRenderer.tsx  ← Maps window types to their content components
    │   ├── FileExplorer.tsx    ← XP-style file browser with folders, back/forward/up, sidebar
    │   ├── Notepad.tsx         ← Text editor that opens .txt files
    │   ├── ImageViewer.tsx     ← Image viewer with zoom controls for .png project previews
    │   ├── ProjectLauncher.tsx ← Project showcase window with description, features, tech stack
    │   ├── Windows.tsx         ← Resume viewer and contact form windows
    │   ├── WindowsUpdate.tsx   ← Fake "Windows Update" popup animation
    │   ├── EasterEggs.tsx      ← Terminal, Recycle Bin, DO NOT OPEN, Random Stuff, Bug Catcher game, 404 error
    │   ├── WelcomeWindow.tsx   ← Welcome popup that appears after boot
    │   ├── MobileLayout.tsx    ← Simplified mobile layout for small screens
    │   └── ProfessionalMode.tsx← Clean, modern portfolio view (no OS theme)
    │
    ├── data/                   ← Data files
    │   ├── portfolio.ts        ← Personal info: projects, skills, achievements, social links
    │   └── fileSystem.ts       ← Virtual file system structure (folders, files, apps)
    │
    ├── hooks/                  ← Custom React hooks
    │   └── useLocalStorage.ts  ← XP/achievement tracking, clock, Konami code detection
    │
    └── store/                  ← State management
        └── desktop.ts          ← Zustand store for window management (open, close, focus, move)
```

---

## How to Change the Background Wallpaper

The app currently uses an animated XP Bliss-style wallpaper drawn with CSS and SVG. You can replace it with your own image:

1. **Add your image to the `public/` folder.** If the folder doesn't exist, create it. Name your image `wallpaper.jpg` (or any name you prefer — JPG, PNG, and WebP all work).

2. **Update the setting in `src/components/Wallpaper.tsx`.** Near the top of the file, find this line:

   ```
   const CUSTOM_WALLPAPER: string | null = '/wallpaper.jpg';
   ```

   - If your image is named `wallpaper.jpg` in the `public/` folder, you're done — no change needed.
   - If your image has a different name, change the path. For example, if your file is `my-bg.png`, change it to:

     ```
     const CUSTOM_WALLPAPER: string | null = '/my-bg.png';
     ```

   - To go back to the default animated XP Bliss wallpaper, set it to `null`:

     ```
     const CUSTOM_WALLPAPER: string | null = null;
     ```

3. Save the file and the wallpaper will update automatically in the browser.

**Tip:** Use a landscape image (16:9 ratio) at around 1920x1080 for the best result. The image will be scaled to cover the full screen.

---

## How to Update Your Personal Info

All personal data is in two files:

- **`src/data/portfolio.ts`** — Projects, skills, achievements, social links (GitHub, LinkedIn, email), and recycle bin items.
- **`src/data/fileSystem.ts`** — The virtual file system that powers the desktop icons, folders, and files. Edit the text content of files like `profile.txt`, `skills.txt`, etc. here.

---

## Features

- **Boot screen** with loading animation (skippable, remembers you on return)
- **Desktop icons** — double-click to open folders, files, and apps
- **File Explorer** — browse folders with back/forward/up navigation, XP-style blue sidebar
- **Notepad** — open and edit text files
- **Image Viewer** — zoom in/out on project preview images
- **Terminal** — type `help` for commands; supports `dir`, `cd`, `open`, `about`, `skills`, `projects`, and secret commands
- **Project Launcher** — detailed project showcase with tech stack and links
- **Resume viewer** and **contact form**
- **Bug Catcher mini-game** — catch symbols, avoid bugs
- **XP system** — earn XP by exploring, unlock achievements
- **Easter eggs** — Konami code, DO NOT OPEN folder, secret terminal commands, desktop bug
- **Start menu** with all apps and folders
- **Professional Mode** — a clean, modern portfolio view accessible from the Start menu
- **Mobile layout** — simplified experience for phones
- **Window management** — drag, resize, minimize, maximize, close

---

## Tech Stack

- **React** + **TypeScript** — UI framework
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **Zustand** — state management for windows
- **Lucide React** — icons
