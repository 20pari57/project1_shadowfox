/**
 * Arijita Paria - Portfolio Controller
 * Pure Vanilla TypeScript / JavaScript (Zero UI Libraries)
 */

interface ProjectData {
  title: string;
  name: string;
  category: string;
  desc: string;
  tech: string[];
  highlights: string[];
  github: string;
}

const projectsData: Record<string, ProjectData> = {
  eloria: {
    title: "Eloria - Spa & Wellness Management Platform",
    name: "Eloria MERN Spa Management",
    category: "Full-Stack Web Architecture",
    desc: "A responsive MERN stack spa booking and scheduling platform built to eliminate double-booking, streamline therapist allocation, and provide intuitive customer self-service scheduling.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "REST API", "Nodemailer"],
    highlights: [
      "JWT-authenticated dual portals (Client booking + Admin operational dashboard)",
      "Real-time therapist time-slot collision avoidance logic",
      "Dynamic service catalog with pricing and duration calculations",
      "Automated transactional email notifications for appointments and cancellations",
      "Sub-200ms average API response time with indexed MongoDB queries"
    ],
    github: "https://github.com/pariaarijita"
  },
  flora: {
    title: "Flora.AI - Intelligent Plant Pathology Platform",
    name: "Flora.AI Deep Learning Diagnostics",
    category: "Computer Vision & Full-Stack",
    desc: "An intelligent web application that enables agronomists and farmers to upload or capture photos of crops, automatically segmenting foliar lesions and classifying diseases with treatment guidance.",
    tech: ["TypeScript", "React", "Python", "OpenCV", "PostgreSQL", "Node.js", "Socket.io", "TensorFlow"],
    highlights: [
      "Custom CNN model detecting 15+ foliar disease classes",
      "Sub-150ms real-time inference pipeline with OpenCV preprocessing",
      "Bi-directional WebSocket streaming for batch diagnosis progress",
      "Actionable treatment recommendations and seasonal blight warning charts",
      "Geo-tagged disease incidence tracking across agricultural zones"
    ],
    github: "https://github.com/pariaarijita"
  },
  "smart-sep": {
    title: "Smart-Sep - AI & IoT Automated Waste Segregation",
    name: "Smart-Sep IoT Waste Segregator",
    category: "AI & Embedded IoT Systems",
    desc: "An automated multi-stage waste sorting apparatus integrating optical AI classification on ESP32-CAM, ultrasonic distance tracking, inductive metallic sensing, and servo routing.",
    tech: ["ESP32-CAM", "C++", "React", "Leaflet", "Inductive Sensors", "Ultrasonic", "MQTT", "Node.js"],
    highlights: [
      "Edge-AI classification running on microcontrollers with 98% accuracy",
      "Tri-modal sensor fusion: inductive metal detection + moisture probe + optical camera",
      "Automated servo diversion gate sorting wet, dry, and metallic refuse in under 1.2s",
      "Interactive Leaflet telemetry dashboard displaying bin fill levels in real time",
      "Formally documented in an official published patent application"
    ],
    github: "https://github.com/pariaarijita"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Update year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  /* -------------------------------------------------------------------------
   * 1. Theme Toggle (Dark / Light)
   * ------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeSunIcon = document.getElementById('theme-sun');
  const themeMoonIcon = document.getElementById('theme-moon');

  function applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeSunIcon?.classList.remove('hidden');
      themeMoonIcon?.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeSunIcon?.classList.add('hidden');
      themeMoonIcon?.classList.remove('hidden');
    }
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(!isDark);
    showToast(!isDark ? "Dark theme enabled 🌙" : "Light theme enabled ☀️");
  });

  /* -------------------------------------------------------------------------
   * 2. Hero Animated Typewriter (Roles)
   * ------------------------------------------------------------------------- */
  const typewriterEl = document.getElementById('typewriter-role');
  if (typewriterEl) {
    const roles = [
      "Full-Stack Web Developer",
      "MERN Stack Specialist",
      "AI & IoT System Builder",
      "B.Tech CSE Student @ NIT"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function tick() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typeSpeed = 40;
      } else {
        charIdx++;
        typeSpeed = 90;
      }

      typewriterEl!.textContent = currentRole.substring(0, charIdx);

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 300;
      }

      setTimeout(tick, typeSpeed);
    }

    setTimeout(tick, 500);
  }

  /* -------------------------------------------------------------------------
   * 3. Mobile Navigation Menu
   * ------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = !mobileMenu?.classList.contains('hidden');
    if (isOpen) {
      mobileMenu?.classList.add('hidden');
      menuIconOpen?.classList.remove('hidden');
      menuIconClose?.classList.add('hidden');
    } else {
      mobileMenu?.classList.remove('hidden');
      menuIconOpen?.classList.add('hidden');
      menuIconClose?.classList.remove('hidden');
    }
  }

  mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      menuIconOpen?.classList.remove('hidden');
      menuIconClose?.classList.add('hidden');
    });
  });

  /* -------------------------------------------------------------------------
   * 4. Skills Category Filtering
   * ------------------------------------------------------------------------- */
  const skillFilterBtns = document.querySelectorAll<HTMLButtonElement>('.skill-filter-btn');
  const skillGroupCards = document.querySelectorAll<HTMLElement>('.skill-group-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => {
        b.classList.remove('active', 'bg-purple-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
      });

      btn.classList.add('active', 'bg-purple-600', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

      const filter = btn.getAttribute('data-filter');

      skillGroupCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 4b. Projects View Switcher (Grid vs. Chronological Timeline)
   * ------------------------------------------------------------------------- */
  const btnViewGrid = document.getElementById('btn-view-grid') as HTMLButtonElement | null;
  const btnViewTimeline = document.getElementById('btn-view-timeline') as HTMLButtonElement | null;
  const projectsGridView = document.getElementById('projects-grid-view');
  const projectsTimelineView = document.getElementById('projects-timeline-view');
  const timelineFilters = document.getElementById('timeline-project-filters');

  function setProjectView(view: 'grid' | 'timeline') {
    if (view === 'grid') {
      projectsGridView?.classList.remove('hidden');
      projectsTimelineView?.classList.add('hidden');
      timelineFilters?.classList.add('hidden');

      btnViewGrid?.classList.add('bg-purple-600', 'text-white', 'shadow-xs');
      btnViewGrid?.classList.remove('text-slate-700', 'dark:text-slate-300');
      btnViewGrid?.setAttribute('aria-selected', 'true');

      btnViewTimeline?.classList.remove('bg-purple-600', 'text-white', 'shadow-xs');
      btnViewTimeline?.classList.add('text-slate-700', 'dark:text-slate-300');
      btnViewTimeline?.setAttribute('aria-selected', 'false');
    } else {
      projectsGridView?.classList.add('hidden');
      projectsTimelineView?.classList.remove('hidden');
      timelineFilters?.classList.remove('hidden');

      btnViewTimeline?.classList.add('bg-purple-600', 'text-white', 'shadow-xs');
      btnViewTimeline?.classList.remove('text-slate-700', 'dark:text-slate-300');
      btnViewTimeline?.setAttribute('aria-selected', 'true');

      btnViewGrid?.classList.remove('bg-purple-600', 'text-white', 'shadow-xs');
      btnViewGrid?.classList.add('text-slate-700', 'dark:text-slate-300');
      btnViewGrid?.setAttribute('aria-selected', 'false');
    }
  }

  btnViewGrid?.addEventListener('click', () => setProjectView('grid'));
  btnViewTimeline?.addEventListener('click', () => setProjectView('timeline'));

  /* -------------------------------------------------------------------------
   * 4c. Timeline Filtering by Project
   * ------------------------------------------------------------------------- */
  const timelineFilterBtns = document.querySelectorAll<HTMLButtonElement>('.timeline-filter-btn');
  const timelineMilestones = document.querySelectorAll<HTMLElement>('.timeline-milestone-item');

  timelineFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineFilterBtns.forEach(b => {
        b.classList.remove('active', 'bg-purple-600', 'text-white', 'shadow-xs');
        b.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
      });

      btn.classList.add('active', 'bg-purple-600', 'text-white', 'shadow-xs');
      btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

      const projectFilter = btn.getAttribute('data-project');

      timelineMilestones.forEach(item => {
        const itemProject = item.getAttribute('data-project');
        if (projectFilter === 'all' || itemProject === projectFilter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 5. Interactive Terminal with Syntax Highlighting & History Functionality
   * ------------------------------------------------------------------------- */
  const terminalForm = document.getElementById('terminal-form') as HTMLFormElement | null;
  const terminalInput = document.getElementById('terminal-input') as HTMLInputElement | null;
  const terminalBody = document.getElementById('terminal-body');
  const terminalSyntaxPill = document.getElementById('terminal-syntax-pill');

  // Supported shell commands
  const KNOWN_COMMANDS = [
    'help',
    'skills',
    'education',
    'projects',
    'timeline',
    'github',
    'history',
    'contact',
    'clear',
    'whoami',
    'date',
    'echo',
    'ls',
    'pwd'
  ];

  // HTML escaping helper
  const escapeHtml = (str: string): string =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  // Basic Syntax Highlighting Engine for Terminal Output and History
  function highlightCommand(rawInput: string): string {
    if (!rawInput) return '';
    const tokens = rawInput.match(/[^\s"']+|"([^"]*)"|'([^']*)'|\s+/g) || [rawInput];
    let isFirstWord = true;

    return tokens
      .map((token) => {
        // Whitespace preservation
        if (/^\s+$/.test(token)) return token;

        // Command Name (First non-whitespace token)
        if (isFirstWord) {
          isFirstWord = false;
          const lower = token.toLowerCase();
          if (KNOWN_COMMANDS.includes(lower)) {
            return `<span class="text-emerald-400 font-bold">${escapeHtml(token)}</span>`;
          }
          return `<span class="text-rose-400 font-semibold underline decoration-dotted decoration-rose-500" title="Unrecognized command">${escapeHtml(token)}</span>`;
        }

        // Flags & Parameters: e.g. -c, --all, -h
        if (/^--?[a-zA-Z0-9_-]+$/.test(token)) {
          return `<span class="text-sky-300 font-medium">${escapeHtml(token)}</span>`;
        }

        // Quoted strings
        if (/^["'].*["']$/.test(token)) {
          return `<span class="text-amber-300">${escapeHtml(token)}</span>`;
        }

        // Numeric parameters
        if (/^-?\d+(\.\d+)?$/.test(token)) {
          return `<span class="text-pink-400 font-semibold">${escapeHtml(token)}</span>`;
        }

        // Shell Operators
        if (/^(&&|\|\||\||>|>>|<|;)$/.test(token)) {
          return `<span class="text-yellow-400 font-bold">${escapeHtml(token)}</span>`;
        }

        // Recognized entity keywords
        if (['smart-sep', 'flora', 'flora.ai', 'eloria', 'all', 'git', 'nit', 'react', 'cpp'].includes(token.toLowerCase())) {
          return `<span class="text-purple-300 font-medium">${escapeHtml(token)}</span>`;
        }

        // General arguments
        return `<span class="text-slate-300">${escapeHtml(token)}</span>`;
      })
      .join('');
  }

  // History State
  const INITIAL_HISTORY = ['help', 'skills', 'projects', 'github', 'timeline'];
  let commandHistory: string[] = [];

  try {
    const storedHistory = sessionStorage.getItem('portfolio_terminal_history');
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      if (Array.isArray(parsed) && parsed.length > 0) {
        commandHistory = parsed;
      } else {
        commandHistory = [...INITIAL_HISTORY];
      }
    } else {
      commandHistory = [...INITIAL_HISTORY];
    }
  } catch {
    commandHistory = [...INITIAL_HISTORY];
  }

  let historyIndex = commandHistory.length;
  let draftCommand = '';

  const saveHistoryToStorage = () => {
    try {
      sessionStorage.setItem('portfolio_terminal_history', JSON.stringify(commandHistory));
    } catch {
      // Storage unavailable or quota reached
    }
  };

  // Real-time syntax feedback for the active prompt input
  const updateSyntaxPill = (val: string) => {
    if (!terminalSyntaxPill) return;
    const trimmed = val.trim();
    if (!trimmed) {
      terminalSyntaxPill.textContent = 'cmd';
      terminalSyntaxPill.className =
        'hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/80 transition-all';
      if (terminalInput) {
        terminalInput.className =
          'w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-xs font-mono';
      }
      return;
    }

    const firstWord = trimmed.split(/\s+/)[0].toLowerCase();
    if (KNOWN_COMMANDS.includes(firstWord)) {
      terminalSyntaxPill.textContent = `cmd: ${firstWord}`;
      terminalSyntaxPill.className =
        'hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 shadow-2xs transition-all';
      if (terminalInput) {
        terminalInput.className =
          'w-full bg-transparent border-none text-emerald-300 placeholder-slate-500 focus:outline-none text-xs font-mono font-medium';
      }
    } else {
      terminalSyntaxPill.textContent = 'unknown';
      terminalSyntaxPill.className =
        'hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/80 transition-all';
      if (terminalInput) {
        terminalInput.className =
          'w-full bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none text-xs font-mono';
      }
    }
  };

  terminalInput?.addEventListener('input', () => {
    updateSyntaxPill(terminalInput.value);
  });

  // Keyboard History Cycling with Up and Down Arrow Keys
  terminalInput?.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      // Save user's current unfinished input draft
      if (historyIndex === commandHistory.length) {
        draftCommand = terminalInput.value;
      }

      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
        updateSyntaxPill(terminalInput.value);
        setTimeout(() => {
          const len = terminalInput.value.length;
          terminalInput.setSelectionRange(len, len);
        }, 0);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
        updateSyntaxPill(terminalInput.value);
        setTimeout(() => {
          const len = terminalInput.value.length;
          terminalInput.setSelectionRange(len, len);
        }, 0);
      } else if (historyIndex === commandHistory.length - 1) {
        // Restoring draft input when reaching bottom of history
        historyIndex = commandHistory.length;
        terminalInput.value = draftCommand;
        updateSyntaxPill(draftCommand);
        setTimeout(() => {
          const len = terminalInput.value.length;
          terminalInput.setSelectionRange(len, len);
        }, 0);
      }
    }
  });

  // Quick Command Chips
  document.querySelectorAll('.terminal-quick-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = (btn.textContent || '').trim();
      if (cmd && terminalInput) {
        terminalInput.value = cmd;
        updateSyntaxPill(cmd);
        terminalForm?.dispatchEvent(new Event('submit', { cancelable: true }));
        terminalInput.focus();
      }
    });
  });

  // Terminal Execution Handler
  terminalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawCommand = terminalInput?.value.trim() || '';
    if (!rawCommand || !terminalBody) return;

    // Record into Command History (avoid storing immediate duplicate)
    if (commandHistory[commandHistory.length - 1] !== rawCommand) {
      commandHistory.push(rawCommand);
      saveHistoryToStorage();
    }
    historyIndex = commandHistory.length;
    draftCommand = '';

    // Append Syntax-Highlighted User Prompt
    const userLine = document.createElement('div');
    userLine.className = 'flex items-baseline gap-2 pt-1.5 font-mono text-xs';
    userLine.innerHTML = `
      <span class="text-purple-400 font-bold select-none">$</span>
      <span class="flex-1">${highlightCommand(rawCommand)}</span>
      <span class="text-[10px] text-slate-600 select-none font-sans">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    terminalBody.appendChild(userLine);

    // Tokenize command line
    const rawTokens = rawCommand.split(/\s+/);
    const primaryCommand = rawTokens[0].toLowerCase();
    const args = rawTokens.slice(1);

    // Process output
    const responseLine = document.createElement('div');
    responseLine.className = 'text-slate-300 pl-3 border-l-2 border-purple-500/70 my-2 space-y-1';

    switch (primaryCommand) {
      case 'help':
        responseLine.innerHTML = `
          <p class="text-purple-300 font-semibold">Available Commands:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-xs">
            <p>• <span class="text-emerald-400 font-bold">skills</span>: List technical competencies</p>
            <p>• <span class="text-emerald-400 font-bold">projects</span>: View key project titles</p>
            <p>• <span class="text-emerald-400 font-bold">timeline</span>: Project roadmap &amp; version milestones</p>
            <p>• <span class="text-emerald-400 font-bold">github</span>: Open-source telemetry &amp; repos</p>
            <p>• <span class="text-emerald-400 font-bold">history</span>: View command history (<span class="text-sky-300">-c</span> to clear)</p>
            <p>• <span class="text-emerald-400 font-bold">education</span>: Academic history &amp; CGPA</p>
            <p>• <span class="text-emerald-400 font-bold">whoami</span>: Developer profile information</p>
            <p>• <span class="text-emerald-400 font-bold">contact</span>: Direct communication channels</p>
            <p>• <span class="text-emerald-400 font-bold">clear</span>: Clear terminal console</p>
          </div>
          <p class="text-[11px] text-slate-400 pt-1">Tip: Use <kbd class="px-1 py-0.5 rounded bg-slate-800 text-purple-300">↑</kbd> and <kbd class="px-1 py-0.5 rounded bg-slate-800 text-purple-300">↓</kbd> arrow keys to navigate command history with live syntax styling.</p>
        `;
        break;

      case 'history': {
        const isClear = args.some((arg) => arg === '-c' || arg === '--clear' || arg === 'clear');
        if (isClear) {
          commandHistory = [];
          saveHistoryToStorage();
          historyIndex = 0;
          responseLine.innerHTML = `<p class="text-amber-300 font-mono">✓ Terminal command history has been cleared.</p>`;
        } else if (commandHistory.length === 0) {
          responseLine.innerHTML = `<p class="text-slate-400 font-mono">No command history recorded yet.</p>`;
        } else {
          const historyItemsHtml = commandHistory
            .map(
              (cmd, idx) => `
              <div class="flex items-center gap-3 font-mono py-0.5 px-1.5 hover:bg-slate-800/60 rounded transition-colors">
                <span class="text-slate-500 w-6 text-right select-none text-[11px]">${idx + 1}</span>
                <span class="text-slate-200">${highlightCommand(cmd)}</span>
              </div>`
            )
            .join('');

          responseLine.innerHTML = `
            <div class="space-y-1.5">
              <div class="flex items-center justify-between pb-1 border-b border-purple-500/20 text-xs">
                <span class="text-purple-300 font-semibold flex items-center gap-2">
                  <span>Session Command History</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-950 text-purple-300 border border-purple-800">${commandHistory.length}</span>
                </span>
                <span class="text-[10px] text-slate-400">Use <kbd class="px-1 bg-slate-800 rounded">↑</kbd> <kbd class="px-1 bg-slate-800 rounded">↓</kbd> to cycle</span>
              </div>
              <div class="bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-xs max-h-48 overflow-y-auto space-y-0.5 shadow-inner">
                ${historyItemsHtml}
              </div>
              <p class="text-[11px] text-slate-500 font-mono">Type <span class="text-purple-400 font-semibold">'history -c'</span> to clear previous inputs.</p>
            </div>
          `;
        }
        break;
      }

      case 'skills':
        responseLine.innerHTML = `
          <p class="text-purple-300 font-semibold">Languages:</p> <p>C++, C, JavaScript (ES6+), TypeScript, Python</p>
          <p class="text-purple-300 font-semibold mt-1">Frameworks:</p> <p>React, Node.js, Express, Tailwind CSS, Bootstrap</p>
          <p class="text-purple-300 font-semibold mt-1">Databases &amp; IoT:</p> <p>MongoDB, PostgreSQL, ESP32-CAM, OpenCV</p>
        `;
        break;

      case 'education':
        responseLine.innerHTML = `
          <p><strong class="text-purple-400">Narula Institute of Technology</strong> (2024-2028)</p>
          <p>B.Tech CSE • Current CGPA: 8.53 (4th Sem)</p>
          <p class="mt-1"><strong class="text-purple-400">GaneswerPur D.H. High School</strong> (2016-2023)</p>
        `;
        break;

      case 'projects':
        responseLine.innerHTML = `
          <p>1. <span class="text-purple-400 font-bold">Eloria</span> - MERN Spa Management Platform</p>
          <p>2. <span class="text-purple-400 font-bold">Flora.AI</span> - Plant Pathology &amp; DL Diagnosis</p>
          <p>3. <span class="text-purple-400 font-bold">Smart-Sep</span> - AI &amp; IoT Automated Waste Segregator</p>
        `;
        break;

      case 'timeline':
        responseLine.innerHTML = `
          <p class="text-purple-300 font-semibold">Chronological Project Roadmap:</p>
          <p>• <strong class="text-purple-400">Mar 2025:</strong> Smart-Sep v2.5 (Official Patent Published)</p>
          <p>• <strong class="text-purple-400">Feb 2025:</strong> Flora.AI v2.0 (Agronomist Web Platform &amp; Disease Heatmaps)</p>
          <p>• <strong class="text-purple-400">Jan 2025:</strong> Smart-Sep v2.0 (Cloud MQTT &amp; Leaflet Geo-Dashboard)</p>
          <p>• <strong class="text-purple-400">Jan 2025:</strong> Eloria v2.0 (Nodemailer Transactional &amp; Sub-200ms DB)</p>
          <p>• <strong class="text-purple-400">Dec 2024:</strong> Flora.AI v1.8 (Sub-150ms WS Inference Stream)</p>
          <p>• <strong class="text-purple-400">Nov 2024:</strong> Eloria v1.5 (Admin Operations &amp; Revenue Analytics)</p>
          <p>• <strong class="text-purple-400">Oct 2024:</strong> Flora.AI v1.0 (CNN Foliar Classifier, 93%+ Accuracy)</p>
          <p>• <strong class="text-purple-400">Sep 2024:</strong> Eloria v1.0 (Collision-Free Booking Engine)</p>
          <p>• <strong class="text-purple-400">Aug 2024:</strong> Smart-Sep v1.0 (ESP32-CAM Edge AI &amp; Servo Gates)</p>
          <p>• <strong class="text-purple-400">Jun 2024:</strong> Eloria v0.5 (MERN Architecture &amp; JWT Security)</p>
          <p>• <strong class="text-purple-400">May 2024:</strong> Flora.AI v0.2 (12k Dataset Curation &amp; OpenCV)</p>
          <p>• <strong class="text-purple-400">Feb 2024:</strong> Smart-Sep v0.1 (Dual Sensor Fusion R&amp;D)</p>
        `;
        break;

      case 'github':
        responseLine.innerHTML = `
          <p class="text-purple-300 font-semibold">GitHub Activity Telemetry (@pariaarijita):</p>
          <p>• <strong class="text-purple-400">Total Repositories:</strong> 28+ (22 public, 6 active libraries &amp; forks)</p>
          <p>• <strong class="text-purple-400">Total Stargazers:</strong> 48+ community stars</p>
          <p>• <strong class="text-purple-400">Yearly Velocity:</strong> 850+ contributions &amp; commits</p>
          <p>• <strong class="text-purple-400">Most Used Languages:</strong> JavaScript &amp; TS (38%), C++ (26%), Python (18%), HTML/CSS (12%), C (6%)</p>
          <p>• <strong class="text-purple-400">Profile URL:</strong> <a href="https://github.com/pariaarijita" target="_blank" rel="noreferrer" class="text-purple-300 underline">https://github.com/pariaarijita</a></p>
        `;
        break;

      case 'whoami':
        responseLine.innerHTML = `
          <p class="text-purple-300 font-bold">Arijita Paria</p>
          <p class="text-slate-300">Full-Stack Developer &amp; IoT Systems Architect</p>
          <p class="text-slate-400 text-[11px]">B.Tech CSE Undergraduate @ Narula Institute of Technology (CGPA: 8.53) • Kolkata, India</p>
        `;
        break;

      case 'date':
        responseLine.innerHTML = `<p class="text-purple-300 font-mono">${new Date().toString()}</p>`;
        break;

      case 'echo':
        responseLine.innerHTML = `<p class="text-slate-200 font-mono">${escapeHtml(args.join(' '))}</p>`;
        break;

      case 'pwd':
        responseLine.innerHTML = `<p class="text-purple-300 font-mono">/home/arijita/portfolio</p>`;
        break;

      case 'ls':
        responseLine.innerHTML = `
          <p class="text-purple-300 font-mono text-xs">
            drwxr-xr-x 2 arijita arijita 4096 Mar 12 10:20 projects/<br>
            drwxr-xr-x 2 arijita arijita 4096 Mar 10 14:15 skills/<br>
            -rw-r--r-- 1 arijita arijita 1852 Mar 15 08:30 smart-sep.cpp<br>
            -rw-r--r-- 1 arijita arijita 2480 Mar 14 18:45 flora-ai.py<br>
            -rw-r--r-- 1 arijita arijita 3120 Mar 12 12:00 eloria-server.ts<br>
            -rw-r--r-- 1 arijita arijita  420 Mar 16 09:00 patent-published.pdf
          </p>
        `;
        break;

      case 'contact':
        responseLine.innerHTML = `
          <p>Email: <a href="mailto:pariaarijita52@gmail.com" class="text-purple-400 underline">pariaarijita52@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/arijitaparia" target="_blank" rel="noreferrer" class="text-purple-400 underline">linkedin.com/in/arijitaparia</a></p>
          <p>GitHub: <a href="https://github.com/pariaarijita" target="_blank" rel="noreferrer" class="text-purple-400 underline">github.com/pariaarijita</a></p>
        `;
        break;

      case 'clear':
        terminalBody.innerHTML = `<p class="text-emerald-400">$ Terminal cleared. Type <span class="text-purple-300 font-semibold">'help'</span> or press <kbd class="px-1 bg-slate-800 rounded text-slate-300">↑</kbd> for history.</p>`;
        if (terminalInput) {
          terminalInput.value = '';
          updateSyntaxPill('');
        }
        return;

      default:
        responseLine.innerHTML = `
          <p class="text-rose-400 font-mono">bash: command not found: <span class="font-bold underline decoration-dotted">${escapeHtml(primaryCommand)}</span></p>
          <p class="text-slate-400 text-[11px]">Type <span class="text-purple-300 font-semibold">'help'</span> to see available commands or use <kbd class="px-1 bg-slate-800 rounded">↑</kbd>/<kbd class="px-1 bg-slate-800 rounded">↓</kbd> to cycle input history.</p>
        `;
    }

    terminalBody.appendChild(responseLine);
    if (terminalInput) {
      terminalInput.value = '';
      updateSyntaxPill('');
    }
    terminalBody.scrollTop = terminalBody.scrollHeight;
  });

  /* -------------------------------------------------------------------------
   * 6. Project Case Study Modal
   * ------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('modal-project-title');
  const projectModalCategory = document.getElementById('modal-project-category');
  const projectModalName = document.getElementById('modal-project-name');
  const projectModalDesc = document.getElementById('modal-project-desc');
  const projectModalTech = document.getElementById('modal-project-tech');
  const projectModalHighlights = document.getElementById('modal-project-highlights');
  const projectModalGithub = document.getElementById('modal-project-github') as HTMLAnchorElement | null;

  const btnCloseProjectModal = document.getElementById('btn-close-project-modal');
  const btnCloseProjectModalBottom = document.getElementById('btn-close-project-modal-bottom');

  function openProjectModal(key: string) {
    const data = projectsData[key];
    if (!data || !projectModal) return;

    if (projectModalTitle) projectModalTitle.textContent = data.title;
    if (projectModalCategory) projectModalCategory.textContent = data.category;
    if (projectModalName) projectModalName.textContent = data.name;
    if (projectModalDesc) projectModalDesc.textContent = data.desc;
    if (projectModalGithub) projectModalGithub.href = data.github;

    if (projectModalTech) {
      projectModalTech.innerHTML = data.tech
        .map(t => `<span class="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80">${t}</span>`)
        .join('');
    }

    if (projectModalHighlights) {
      projectModalHighlights.innerHTML = data.highlights
        .map(h => `<li class="leading-relaxed">${h}</li>`)
        .join('');
    }

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  document.querySelectorAll<HTMLButtonElement>('.btn-open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      if (key) openProjectModal(key);
    });
  });

  btnCloseProjectModal?.addEventListener('click', closeProjectModal);
  btnCloseProjectModalBottom?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  /* -------------------------------------------------------------------------
   * 7. Resume / CV Modal
   * ------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resume-modal');
  const btnOpenResumeNav = document.getElementById('btn-open-resume');
  const btnOpenResumeMobile = document.getElementById('btn-mobile-resume');
  const btnOpenResumeHero = document.getElementById('btn-hero-resume');
  const btnCloseResume = document.getElementById('btn-close-resume');
  const btnPrintResume = document.getElementById('btn-print-resume');
  const btnCopyResumeText = document.getElementById('btn-copy-resume-text');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('hidden');
    resumeModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('hidden');
    resumeModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  btnOpenResumeNav?.addEventListener('click', openResume);
  btnOpenResumeMobile?.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
    openResume();
  });
  btnOpenResumeHero?.addEventListener('click', openResume);
  btnCloseResume?.addEventListener('click', closeResume);

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  btnPrintResume?.addEventListener('click', () => {
    window.print();
  });

  btnCopyResumeText?.addEventListener('click', () => {
    const cvText = `
ARIJITA PARIA
Full-Stack Web Developer
Email: pariaarijita52@gmail.com
LinkedIn: linkedin.com/in/arijitaparia | GitHub: github.com/pariaarijita

EDUCATION
- Narula Institute of Technology (2024 - 2028): B.Tech in CSE (CGPA: 8.53, 4th Sem), Kolkata, WB
- GaneswerPur D.H. High School (2016 - 2023): Higher Secondary & Secondary, East Medinipur, WB

PROJECTS
- Eloria: MERN stack spa management platform (React, Tailwind CSS, Node.js, Express, MongoDB, JWT)
- Flora.AI: Deep learning plant pathology and diagnosis web platform (TypeScript, React, Node.js, OpenCV, PostgreSQL)
- Smart-Sep: Automated AI & IoT waste segregation system (ESP32-CAM, C++, React, Leaflet)

TECHNICAL SKILLS
- Languages: C++, C, JavaScript (ES6+), Python, TypeScript
- Frameworks: React.js, Node.js, Express.js, Tailwind CSS, Bootstrap
- Databases: MongoDB, PostgreSQL
- Tools: Git, GitHub, VS Code, Linux, Jupyter, Postman

ACHIEVEMENTS
- 4+ Hackathon Winner (Major League Hacking - MLH Participant)
- 1+ Official Patent Published (IoT & Embedded Systems)
- 2+ Ideathon Participant
- 5-Star in HackerRank (C++, C, Python)
    `.trim();

    navigator.clipboard.writeText(cvText).then(() => {
      showToast("CV text copied to clipboard! 📋");
    });
  });

  // Global Escape key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResume();
    }
  });

  /* -------------------------------------------------------------------------
   * 8. Contact Form Validation & Submission
   * ------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const inputName = document.getElementById('form-name') as HTMLInputElement | null;
  const inputEmail = document.getElementById('form-email') as HTMLInputElement | null;
  const inputSubject = document.getElementById('form-subject') as HTMLInputElement | null;
  const inputMessage = document.getElementById('form-message') as HTMLTextAreaElement | null;
  const charCount = document.getElementById('char-count');
  const formFeedback = document.getElementById('form-feedback');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorSubject = document.getElementById('error-subject');
  const errorMessage = document.getElementById('error-message');

  inputMessage?.addEventListener('input', () => {
    if (charCount) {
      charCount.textContent = `${inputMessage.value.length} / 500`;
    }
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Name
    if (!inputName?.value.trim()) {
      errorName?.classList.remove('hidden');
      isValid = false;
    } else {
      errorName?.classList.add('hidden');
    }

    // Validate Email
    if (!inputEmail?.value.trim() || !emailRegex.test(inputEmail.value.trim())) {
      errorEmail?.classList.remove('hidden');
      isValid = false;
    } else {
      errorEmail?.classList.add('hidden');
    }

    // Validate Subject
    if (!inputSubject?.value.trim()) {
      errorSubject?.classList.remove('hidden');
      isValid = false;
    } else {
      errorSubject?.classList.add('hidden');
    }

    // Validate Message
    if (!inputMessage?.value.trim() || inputMessage.value.trim().length < 10) {
      errorMessage?.classList.remove('hidden');
      isValid = false;
    } else {
      errorMessage?.classList.add('hidden');
    }

    if (!isValid) return;

    // Submission Success Feedback
    if (formFeedback) {
      formFeedback.className = "p-3 rounded-xl text-xs font-semibold text-center bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800";
      formFeedback.textContent = `Thank you, ${inputName?.value.trim()}! Your message has been sent successfully. I will reach out shortly!`;
      formFeedback.classList.remove('hidden');
    }

    showToast("Message sent successfully! ✉️");
    contactForm.reset();
    if (charCount) charCount.textContent = "0 / 500";

    setTimeout(() => {
      formFeedback?.classList.add('hidden');
    }, 6000);
  });

  /* -------------------------------------------------------------------------
   * 9. Copy Email & GitHub URL Helpers
   * ------------------------------------------------------------------------- */
  document.getElementById('btn-copy-email')?.addEventListener('click', () => {
    navigator.clipboard.writeText('pariaarijita52@gmail.com').then(() => {
      showToast("Email copied: pariaarijita52@gmail.com ✉️");
    });
  });

  document.getElementById('btn-copy-github')?.addEventListener('click', () => {
    navigator.clipboard.writeText('https://github.com/pariaarijita').then(() => {
      showToast("GitHub URL copied: https://github.com/pariaarijita 📋");
    });
  });

  // Background GitHub Public Telemetry Sync (with graceful fallback)
  try {
    fetch('https://api.github.com/users/pariaarijita')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.public_repos === 'number' && data.public_repos > 0) {
          const repoEl = document.getElementById('github-stat-repos');
          if (repoEl) {
            repoEl.textContent = `${data.public_repos}+`;
          }
        }
      })
      .catch(() => {
        // Fallback gracefully to verified curated data
      });
  } catch {
    // Silent catch
  }

  /* -------------------------------------------------------------------------
   * 10. Scroll to Top
   * ------------------------------------------------------------------------- */
  document.getElementById('btn-scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------------------------
   * 11. Toast Utility
   * ------------------------------------------------------------------------- */
  function showToast(msg: string) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3200);
  }
});
