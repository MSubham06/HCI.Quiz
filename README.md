# 🎮 HCI Quiz — Gamified Practice Platform

<div align="center">

![Banner](https://img.shields.io/badge/HCI-Gamified%20Quiz%20Platform-gold?style=for-the-badge&logo=graduation-cap&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![React](https://img.shields.io/badge/Built%20With-React%2018-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Styled-Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite)
![No Backend](https://img.shields.io/badge/Backend-None%20Required-red?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-blueviolet?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Add%20to%20Home%20Screen-orange?style=for-the-badge)

**Transform HCI exam preparation into an addictive, game-like experience.**
*React · Tailwind CSS · Vite · Zero Backend · 120 Questions · Two Modes*
*Fully responsive — study on your phone, tablet, or desktop. Anytime. Anywhere.*

[🚀 Live Demo](#) · [📖 Documentation](#table-of-contents) · [🐛 Report Bug](issues) · [✨ Request Feature](issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Why React](#-why-react)
- [The Problem We Solve](#-the-problem-we-solve)
- [Two Modes](#-two-modes)
- [Core Game Mechanics](#-core-game-mechanics)
- [Practice Mode](#-practice-mode)
- [Developer Appreciation Popup](#-developer-appreciation-popup)
- [Completion & Congratulations Panel](#-completion--congratulations-panel)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Data Schema](#-data-schema)
- [State Management](#-state-management)
- [Step-by-Step Setup Guide](#-step-by-step-setup-guide)
- [How to Add / Change Questions](#-how-to-add--change-questions)
- [Progression System](#-progression-system)
- [Scoring Logic](#-scoring-logic)
- [Dark & Light Theme](#-dark--light-theme)
- [Responsive Design](#-responsive-design)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Developer Notes](#-developer-notes)
- [License](#-license)

---

## 🌟 About the Project

The **HCI Quiz Gamified Practice Platform** reimagines how students prepare for Human-Computer Interaction NPTEL exams. Instead of boring static PDFs and basic web forms, this platform delivers **two powerful study experiences** in one app:

- 🎮 **Game Mode** — 30-second timers, hearts, streaks, XP, and 6 boss levels. High pressure, high reward.
- 📖 **Practice Mode** — All 120 questions in one clean list. No pressure. Full freedom. Instant answer feedback.

Built with **React + Tailwind + Vite** for smooth component transitions, fast state updates, and a clean scalable architecture. Fully responsive — desktop-grade in a browser, native-app feel on mobile.

> "The best study session is the one students don't realize is a study session."

---

## ⚛️ Why React

The original plan was Vanilla JS. As the feature set grew — two modes, popups, completion tracking, free question navigation, dynamic UI states — React became the right and only sensible choice.

| Reason | Detail |
|---|---|
| 🔄 **Component reuse** | QuestionCard, OptionButton, Timer, Modal are shared across both modes |
| ⚡ **Fast state updates** | `useState` and `useEffect` handle timer, streak, hearts, and XP cleanly |
| 🧭 **Routing** | React Router handles Game ↔ Practice ↔ Level Select navigation cleanly |
| 📦 **Scalability** | Adding leaderboards, new courses, PWA — straightforward with a component tree |
| 🔁 **Context API** | Global game state (XP, unlocked levels, practice progress) via React Context |

> Still **zero backend** — all data comes from a local `questions.json` and `localStorage`.

---

## 🚨 The Problem We Solve

| Problem | Our Solution |
|---|---|
| 😴 No motivation — studying feels like a chore | ⚡ XP, streaks & level-up dopamine hits |
| ⏱️ No time pressure — students are slow under exam conditions | 🔥 Strict 30-second timer per question |
| 🔁 Low replayability — students never revisit completed assignments | 🏆 Heart system & perfect-score chasing |
| 📉 No progress tracking — no sense of advancement | 🗺️ 6-level boss progression system |
| 💻 Desktop-only tools — students can't practice on the go | 📱 Fully responsive — mobile, tablet & desktop |
| 📋 No free browsing — can't jump to a specific question | 📖 Practice Mode — all 120 questions, full freedom |
| 🙈 No quick answer check — have to finish a whole quiz | ✅ Practice Mode shows answer immediately after selecting |

---

## 🔀 Two Modes

The Navbar always shows both modes. Switch at any time — no progress is lost.

```
┌──────────────────────────────────────────────────────┐
│  HCI Quiz    [🎮 Game]  [📖 Practice]    ⚡XP  ☀️   │
└──────────────────────────────────────────────────────┘
```

| Feature | 🎮 Game Mode | 📖 Practice Mode |
|---|---|---|
| Timer | ✅ 30-second countdown | ❌ No timer |
| Hearts | ✅ 3 hearts per level | ❌ No hearts |
| Streaks & XP | ✅ Full multiplier system | ❌ No XP |
| Level locks | ✅ 75% accuracy gate | ❌ All 120 accessible |
| Answer feedback | After selection + explanation | Immediately + explanation |
| Question order | Shuffled per level | Free — jump to any of 120 |
| Completion panel | ✅ After all 6 levels | ✅ After all 120 attempted |

---

## 🎮 Core Game Mechanics

### ⏱️ 1. 30-Second Time Attack

| Event | Effect |
|---|---|
| ✅ Correct in **< 10 seconds** | `+5 Bonus XP` Speed Bonus |
| ✅ Correct in 10–30 seconds | Normal XP awarded |
| ❌ Timer hits **0** | Timeout = wrong answer → lose 1 Heart + streak resets |

The timer uses `Date.now()` snapshots for accuracy — no drift over long sessions.

---

### 🗺️ 2. Progression System (12 Weeks → 6 Boss Levels)

| Level | Weeks | Topic | Unlock |
|---|---|---|---|
| 1 | 1–2 | HCI Foundations | Starting level |
| 2 | 3–4 | Design Thinking | ≥75% on Level 1 |
| 3 | 5–6 | Cognition & Data | ≥75% on Level 2 |
| 4 | 7–8 | Prototyping & Evaluation | ≥75% on Level 3 |
| 5 | 9–10 | IoT & AI in HCI | ≥75% on Level 4 |
| 6 | 11–12 | Privacy, Security & Future | ≥75% on Level 5 |

> 🔒 Locked levels are greyed out and unclickable. Unlock by scoring ≥75% on the previous level.

---

### ❤️ 3. Health System

```
❤️ ❤️ ❤️  →  Wrong / Timeout  →  ❤️ ❤️ 🖤  →  0 hearts  →  💀 Game Over
```

### 🔥 4. Streak Multipliers

| Streak | Multiplier | Status |
|---|---|---|
| 1–2 Correct | **1x** | Normal |
| 3–4 Correct | **1.5x** | Hot Streak |
| 5+ Correct | **2x** | 🔥 ON FIRE |

---

## 📖 Practice Mode

A completely separate, pressure-free way to go through all 120 HCI questions.

### How It Works

- All 120 questions displayed as a **scrollable numbered row** at the top
- Each number shows a ✅ (correct), ❌ (wrong), or blank (not attempted) badge
- Tap any number to jump directly — full freedom, no locks
- Select an answer → correct answer + explanation shown immediately
- Previous / Next buttons for sequential navigation

### Practice Mode UI

```
┌──────────────────────────────────────────────────────────────┐
│  [1✅][2✅][3❌][4][5][6] ... [118][119][120]   ← scroll   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Q47 · Week 9  ← Question number and week shown             │
│  What is the primary goal of IoT?                            │
│                                                              │
│  ○  To increase device size                                  │
│  ● "To connect the unconnected"    ← ✅ Correct shown        │
│  ○  To remove automation                                     │
│  ○  To limit wireless technology                             │
│                                                              │
│  ✅ Explanation shown immediately here                       │
│  [← Previous]                          [Next →]             │
└──────────────────────────────────────────────────────────────┘
```

---

## 👨‍💻 Developer Appreciation Popup

Shown **on first visit only** — acknowledges the effort behind this free tool.

### Behaviour

| Action | Result |
|---|---|
| Click **"Thank You 🙏"** | Popup closes → `hci_appreciated: true` in localStorage → **never shown again** |
| Click **✕ close icon** | Closes for this session only → will show again on next visit |

### Popup Layout

```
┌──────────────────────────────────────────┐  ✕
│              🙏                          │
│                                          │
│   Hey, glad you're here!                 │
│                                          │
│   This platform was built with love      │
│   to help you crack your HCI exam        │
│   without the boring grind. Free. 😊     │
│                                          │
│   [ 🙏  Thank You, I Appreciate It! ]    │
│                                          │
│   ─────────── connect ───────────        │
│                                          │
│   💼 Follow the developer on LinkedIn    │
│      for more free tools like this       │
│   [ Follow on LinkedIn 🔗 ]              │
│                                          │
└──────────────────────────────────────────┘
```

### How to set your LinkedIn URL

Open `src/components/AppreciationPopup.jsx` and update line 1:

```js
const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_PROFILE_HERE'
```

---

## 🎉 Completion & Congratulations Panel

Appears when a student finishes **all questions** in either mode.

### Trigger Conditions

| Mode | Trigger |
|---|---|
| 🎮 Game Mode | All 6 levels completed |
| 📖 Practice Mode | All 120 questions attempted at least once |

### Performance-Based Messages

| Accuracy | Emoji | Message |
|---|---|---|
| 90–100% | 🏆 | "Outstanding! You're fully exam-ready. Go get that top score!" |
| 75–89% | 🌟 | "Great effort! You've got a strong grip. A quick revision and you're set!" |
| 50–74% | ⭐ | "Good job completing the full set! Focus on your weak areas and you'll nail it!" |
| Below 50% | 💪 | "Well done for finishing! Every attempt makes you stronger. Give it another round!" |

The panel also shows: Score, Accuracy %, Total XP, Correct count, Wrong count — and the iconic line:

> **"All the very best for your HCI exam! 🚀 You've put in the work — now go ace it! 💪"**

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| UI Framework | React 18 | Component reuse, fast state, hooks |
| Routing | React Router v6 | Clean Game ↔ Practice navigation |
| Styling | Tailwind CSS v3 | Utility-first, dark mode via `class` |
| Build Tool | Vite 5 | Lightning-fast HMR, instant builds |
| Fonts | Syne + DM Sans (Google Fonts) | Distinctive, non-generic pairing |
| State | React Context + localStorage | No backend needed |
| Data | questions.json (public folder) | Flat file — change exam, change JSON |
| Hosting | GitHub Pages / Netlify / Vercel | Free static hosting |

---

## 📁 Project Structure

```
hci-quiz/
│
├── QuestionBank/
│   └── questions.json          ← 📦 Master question bank (edit here)
│
└── frontend/
    ├── public/
    │   └── questions.json      ← Copy of QuestionBank (served by Vite)
    │
    ├── src/
    │   ├── main.jsx            ← React entry point, theme init
    │   ├── App.jsx             ← Root: routing, theme toggle, popup logic
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx              ← Mode switcher + theme toggle + XP
    │   │   ├── AppreciationPopup.jsx   ← First-visit developer popup
    │   │   ├── CongratsPanel.jsx       ← Completion congratulations
    │   │   │
    │   │   ├── game/
    │   │   │   ├── LevelSelect.jsx     ← 6 boss level cards, lock state
    │   │   │   └── GameScreen.jsx      ← Full game engine (timer, hearts, XP)
    │   │   │
    │   │   └── practice/
    │   │       └── PracticeScreen.jsx  ← 120 questions, free nav, feedback
    │   │
    │   ├── context/
    │   │   ├── QuestionsContext.jsx    ← Fetches & caches questions.json
    │   │   └── GameContext.jsx         ← Global XP, levels, practice state
    │   │
    │   ├── hooks/
    │   │   └── useTimer.js             ← 30s countdown with Date.now() accuracy
    │   │
    │   └── styles/
    │       └── index.css               ← Tailwind base + custom utilities
    │
    ├── index.html              ← Vite shell + PWA meta tags + Google Fonts
    ├── tailwind.config.js      ← Theme colours, dark mode, custom animations
    ├── vite.config.js          ← Vite + React plugin
    ├── postcss.config.js
    └── package.json
```

> **QuestionBank/** is the source of truth. When you update questions, copy the file to `frontend/public/questions.json` too.

---

## 🎨 Design System

### Fonts

| Role | Font | Why |
|---|---|---|
| Headings / UI labels | `Syne` | Bold, geometric — feels competitive and sharp |
| Body / questions | `DM Sans` | Highly readable at all sizes, warm and approachable |

### Color Palette

#### 🌑 Dark Theme (Default)

| Role | Tailwind | Hex |
|---|---|---|
| Page Background | `zinc-950` | `#0f0f0f` |
| Card Surface | `zinc-900` | `#18181b` |
| Card Border | `zinc-800` | `#27272a` |
| Gold Accent | Custom `gold` | `#f0c040` |
| Text Primary | `zinc-100` | `#f4f4f5` |
| Text Muted | `zinc-400` | `#a1a1aa` |
| Danger (hearts) | `red-400` | `#f87171` |
| Success | `green-400` | `#4ade80` |

#### ☀️ Light Theme

| Role | Tailwind | Hex |
|---|---|---|
| Page Background | `amber-50` | `#f5f0e8` |
| Card Surface | `white` | `#ffffff` |
| Card Border | `amber-100` | `#fde68a` |
| Gold Accent | `yellow-700` | `#b8860b` |
| Text Primary | `zinc-900` | `#18181b` |
| Text Muted | `zinc-500` | `#71717a` |

---

## 📦 Data Schema

Questions live in `QuestionBank/questions.json` (and copied to `frontend/public/questions.json`):

```json
{
  "id": "q001",
  "level": 1,
  "week": 1,
  "question": "What is the primary goal of HCI?",
  "options": [
    "Improve computer hardware",
    "Make interaction effective, efficient, and satisfying",
    "Reduce data usage",
    "Teach programming"
  ],
  "correctAnswer": "Make interaction effective, efficient, and satisfying",
  "explanation": "HCI focuses on creating systems that are usable, efficient, and pleasant for the user.",
  "points": 10
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique — `q001` to `q120` |
| `level` | `integer` | 1–6, controls which Boss Level this belongs to |
| `week` | `integer` | 1–12, shown as label in Practice Mode |
| `question` | `string` | Full question text |
| `options` | `string[]` | Exactly 4 options |
| `correctAnswer` | `string` | Must exactly match one of the `options` strings |
| `explanation` | `string` | Shown after answering in both modes |
| `points` | `integer` | Base XP before multiplier (use `10` for all) |

> ⚠️ `correctAnswer` is case-sensitive and must be an exact string match with one option.

---

## 💾 State Management

All progress lives in `localStorage`. No backend, no accounts, no server.

| Key | Type | Set When |
|---|---|---|
| `hci_theme` | `"dark"` / `"light"` | User toggles theme |
| `hci_appreciated` | `"true"` | User clicks Thank You in popup |
| `hci_total_xp` | `integer` | After every correct answer in Game Mode |
| `hci_highest_level` | `integer` 1–6 | After passing a level |
| `hci_practice_attempted` | `JSON object` | Each question attempted in Practice Mode |
| `hci_game_completed` | `"true"` | All 6 levels completed |
| `hci_practice_completed` | `"true"` | All 120 practice questions attempted |

---

## 🚀 Step-by-Step Setup Guide

### Prerequisites

- **Node.js v18 or higher** — [Download here](https://nodejs.org)
- **npm** (comes with Node) or yarn
- A code editor — **VS Code** recommended

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/hci-quiz.git
cd hci-quiz
```

---

### Step 2 — Go into the frontend folder

```bash
cd frontend
```

---

### Step 3 — Install dependencies

```bash
npm install
```

This installs: React, React Router, Tailwind CSS, Vite, PostCSS, Autoprefixer.

---

### Step 4 — Set your LinkedIn URL

Open `src/components/AppreciationPopup.jsx` and update:

```js
const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_PROFILE_HERE'
```

---

### Step 5 — Start the development server

```bash
npm run dev
```

Open your browser at: **http://localhost:5173**

> The app hot-reloads on every save — no refresh needed.

---

### Step 6 — Build for production

```bash
npm run build
```

Output is in the `/dist` folder. Deploy this folder to any static host.

---

### Step 7 — Deploy free to GitHub Pages

```bash
# Install the deploy tool
npm install --save-dev gh-pages

# Add this to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

Your site will be live at: `https://YOUR_USERNAME.github.io/hci-quiz/`

> Students bookmark the URL and access it from any device — phone, tablet, or laptop.

---

### Step 8 — Update questions (when needed)

1. Edit `QuestionBank/questions.json`
2. Copy it to `frontend/public/questions.json`

```bash
# From the project root:
cp QuestionBank/questions.json frontend/public/questions.json
```

The QuestionBank folder is designed so you can swap the entire question set for a different exam (e.g., Design Thinking, UX Research) just by replacing the JSON file.

---

## ✍️ How to Add / Change Questions

### Adding a new question

Open `QuestionBank/questions.json`, add an object at the right `level`:

```json
{
  "id": "q121",
  "level": 3,
  "week": 5,
  "question": "Which cognitive law states that working memory holds 7±2 items?",
  "options": ["Fitts's Law", "Miller's Law", "Hick's Law", "Norman's Law"],
  "correctAnswer": "Miller's Law",
  "explanation": "George Miller's 1956 paper proposed that human short-term memory can hold approximately 7 (plus or minus 2) chunks of information.",
  "points": 10
}
```

Then copy to public:
```bash
cp QuestionBank/questions.json frontend/public/questions.json
```

### Switching to a different exam entirely

1. Replace all entries in `QuestionBank/questions.json` with the new exam's questions
2. Copy to `frontend/public/questions.json`
3. Update level/week labels in `src/components/game/LevelSelect.jsx`
4. Done — the entire platform adapts automatically

---

## 🏆 Progression System

```
[L1] ──(≥75%)──► [L2] ──(≥75%)──► [L3]
                                     │
[L6] ◄──(≥75%)── [L5] ◄──(≥75%)── [L4]
```

- Questions are **shuffled** on every attempt (Fisher-Yates) — prevents memorising answer position
- Timeouts count as wrong answers
- Failing (< 75%) → retry prompt
- Passing → `hci_highest_level` updated in localStorage → next level card unlocks

---

## 🧮 Scoring Logic

```
Final XP = (base_points × streak_multiplier) + speed_bonus

streak_multiplier = 1.0 (1-2)  |  1.5 (3-4)  |  2.0 (5+)
speed_bonus       = +5 XP if answered correctly AND timeLeft > 20s
```

| Scenario | XP |
|---|---|
| Correct, slow, streak 1 | **10 XP** |
| Correct, fast, streak 2 | **15 XP** |
| Correct, fast, streak 4 | **20 XP** |
| Correct, fast, streak 6 | **25 XP** |
| Wrong or Timeout | **0 XP** |

---

## 🌗 Dark & Light Theme

Toggle is pinned in the Navbar — always visible. Theme persists across sessions.

```jsx
// main.jsx — applied before first paint, no flash
const savedTheme = localStorage.getItem('hci_theme') || 'dark'
document.documentElement.className = savedTheme
```

```js
// tailwind.config.js
darkMode: 'class'  // Controlled by <html class="dark"> or <html class="light">
```

---

## 📱 Responsive Design

Built **mobile-first**. All breakpoints:

| Breakpoint | Devices | Layout |
|---|---|---|
| `< 480px` | Small phones — iPhone SE, Redmi | Single column, full-width, large taps |
| `480–767px` | Standard phones | Single column, sticky question selector |
| `768–1023px` | Tablets | Wider cards, more padding |
| `≥ 1024px` | Laptops & desktops | Max-width `1024px` container, centred |

### Mobile UX rules enforced

| Rule | Detail |
|---|---|
| Tap targets | All buttons `min-height: 48px` |
| No zoom | `maximum-scale=1.0` in viewport meta |
| Smooth scroll | `-webkit-overflow-scrolling: touch` on question selector row |
| No tap highlight | `-webkit-tap-highlight-color: transparent` globally |
| Font size | Base `16px` — prevents iOS auto-zoom on inputs |
| Modals | `max-width: 95vw`, `max-height: 90vh` — never overflow |

### Add to Home Screen (PWA)

Students can add the platform to their phone home screen:

| Device | Steps |
|---|---|
| **Android Chrome** | ⋮ menu → "Add to Home screen" |
| **iPhone Safari** | Share `⬆️` → "Add to Home Screen" |

---

## 🗺️ Roadmap

- [x] 🎮 Game Mode — timer, hearts, streaks, XP, 6 boss levels
- [x] 📖 Practice Mode — 120 questions, scrollable selector, free navigation, instant feedback
- [x] 👨‍💻 Developer Appreciation Popup — one-time thank you, LinkedIn follow
- [x] 🎉 Completion & Congratulations Panel — personalised by accuracy %
- [x] 🌗 Dark / Light theme — persisted across sessions
- [x] 📱 Fully responsive — mobile, tablet & desktop
- [x] 📲 PWA Add to Home Screen meta tags
- [x] ⌨️ Keyboard shortcuts (1/2/3/4) for desktop users
- [ ] 🏆 Local leaderboard — top 5 scores stored on device
- [ ] 📚 Subject selector — swap between different NPTEL courses
- [ ] 🔊 Sound effects — correct, wrong, fire streak, game over
- [ ] 🎊 Confetti animation on level completion
- [ ] 🌐 Full PWA with service worker (true offline mode)
- [ ] 📤 Export results as shareable scorecard image
- [ ] 📳 Haptic feedback on mobile (Vibration API)

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "feat: describe your change"`
5. Push and open a Pull Request

### Guidelines

- All styling via Tailwind utility classes — no inline styles
- Use CSS variables for any custom colours
- All new questions must include an `explanation` field
- Test on **real mobile Safari (iOS)** before submitting — DevTools is not enough
- Test in **both dark and light themes**
- Verify the question selector scrolls correctly on mobile

---

## 👨‍💻 Developer Notes

### Common Gotchas

| Issue | Fix |
|---|---|
| `questions.json` 404 error | File must be in `frontend/public/` — Vite serves this statically |
| Theme flashes on load | `main.jsx` applies theme class before first render — must stay as-is |
| iOS tap highlight shows | `-webkit-tap-highlight-color: transparent` is in `index.css` globally |
| iOS auto-zoom on tap | All interactive elements font-size kept at `≥ 16px` |
| Timer drifts after long session | `useTimer.js` uses `Date.now()` snapshots — immune to drift |
| Popup shows after Thank You | Confirm `localStorage.setItem('hci_appreciated', 'true')` runs before `setShowPopup(false)` |
| Questions not shuffling | Shuffle happens in `GameScreen.jsx` via Fisher-Yates on load |
| `questions.json` not updating | Remember to copy from `QuestionBank/` to `frontend/public/` after editing |

### Responsive Testing Checklist

Before every release:

- [ ] Chrome DevTools — iPhone SE (375px)
- [ ] Chrome DevTools — iPhone 14 Pro (393px)
- [ ] Chrome DevTools — iPad Air (820px)
- [ ] Chrome DevTools — Desktop 1440px
- [ ] Real Android device — Chrome
- [ ] Real iPhone — Safari *(critical — iOS behaves differently from DevTools)*
- [ ] Dark theme on all above
- [ ] Light theme on all above
- [ ] Appreciation popup appears on first visit
- [ ] Thank You → popup never shows again after page reload
- [ ] Close (✕) → popup appears again on next visit
- [ ] Congratulations panel appears when all questions done in both modes
- [ ] Question selector scrolls horizontally on mobile

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for full details.

---

<div align="center">

Made with ❤️ for every student who deserves better than boring PDFs.

*Study anywhere. Score everywhere.*

⭐ **Star this repo if it helped you score better on your HCI exam!** ⭐

</div>