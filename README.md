# 🎮 HCI Quiz : Gamified Practice Platform

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
*React · Tailwind CSS · Vite · Zero Backend · 120 Questions · Three Modes*  
*Fully responsive — study on your phone, tablet, or desktop. Anytime. Anywhere.*

[🚀 Live Demo](https://hci-quiz-lovat.vercel.app) · [📖 Documentation](#table-of-contents) · [🐛 Report Bug](issues) · [✨ Request Feature](issues)

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

| Level | Weeks | Topic | Unlock Requirement |
|---|---|---|---|
| 1 | 1–2 | HCI Foundations | Starting level |
| 2 | 3–4 | Design Thinking | ≥ 75% on Level 1 |
| 3 | 5–6 | Cognition & Data | ≥ 75% on Level 2 |
| 4 | 7–8 | Prototyping & Evaluation | ≥ 75% on Level 3 |
| 5 | 9–10 | IoT & AI in HCI | ≥ 75% on Level 4 |
| 6 | 11–12 | Privacy, Security & Future | ≥ 75% on Level 5 |

> 🔒 Locked levels are greyed out and unclickable until the previous level is passed.

---

### ❤️ 3. Health System (Hearts)

```
❤️ ❤️ ❤️  →  Wrong / Timeout  →  ❤️ ❤️ 🖤  →  0 hearts  →  💀 Game Over
```

- Every wrong answer or timeout costs 1 Heart
- If Hearts reach 0 → Game Over modal appears → restart the level
- Risk makes every correct answer feel genuinely rewarding

---

### 🔥 4. Streak Multipliers

| Streak | Multiplier | Status |
|---|---|---|
| 1–2 Correct | **1x** | Normal |
| 3–4 Correct | **1.5x** | 🌶️ Hot Streak |
| 5+ Correct | **2x** | 🔥 ON FIRE |

> A wrong answer or timeout resets the streak to 0.

---

## 📖 Practice Mode

A completely separate, pressure-free way to go through all 120 HCI questions. No timer. No hearts. No XP. Just learning.

### How It Works

- All 120 questions displayed as a **scrollable numbered row** at the top
- Each number shows ✅ (correct), ❌ (wrong), or blank (not attempted)
- Tap any number to jump directly to it — full freedom, no locks
- Select an answer → correct answer + full explanation shown immediately
- Previous / Next buttons for sequential navigation

### Practice Mode UI

```
┌──────────────────────────────────────────────────────────────┐
│  [1✅][2✅][3❌][4][5][6] ... [118][119][120]  ← scroll    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Q47 · Week 9                                                │
│  What is the primary goal of IoT?                            │
│                                                              │
│  ○  To increase device size                                  │
│  ●  "To connect the unconnected"      ← ✅ Correct           │
│  ○  To remove automation from homes                          │
│  ○  To limit wireless technology                             │
│                                                              │
│  ✅ Explanation shown immediately                            │
│  [← Previous]                          [Next →]             │
└──────────────────────────────────────────────────────────────┘
```

---

## 👨‍💻 Developer Appreciation Popup

Shown **on first visit only** — a warm thank-you acknowledging the effort behind this free tool.

### Behaviour

| Action | Result |
|---|---|
| Click **"Thank You 🙏"** button | Popup closes → `hci_appreciated: true` saved to localStorage → **never shown again** |
| Click **✕ close icon** (top-right) | Popup closes for this session only → will show again on the next visit |

> The "Thank You" button is a one-time action. Once clicked, the popup is permanently dismissed.

### Popup Layout

```
┌──────────────────────────────────────────┐  ✕
│                                          │
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
│   ──────────── connect ──────────        │
│                                          │
│   💼 Follow the developer on LinkedIn    │
│      for more free tools like this →     │
│   [ Follow on LinkedIn 🔗 ]              │
│                                          │
└──────────────────────────────────────────┘
```

### Setting Your LinkedIn URL

Open `src/components/AppreciationPopup.jsx` and update **line 1**:

```js
const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_PROFILE_HERE'
```

---

## 🎉 Completion & Congratulations Panel

Appears automatically when a student finishes **all questions** in either mode.

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

The panel shows: Score, Accuracy %, Total XP Earned, Questions Correct ✅, Questions Wrong ❌ — and always ends with:

> **"All the very best for your HCI exam! 🚀 You've put in the work — now go ace it! 💪"**

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| UI Framework | React 18 | Component reuse, fast state, hooks |
| Routing | React Router v6 | Clean Game ↔ Practice navigation |
| Styling | Tailwind CSS v3 | Utility-first, dark mode via `class` strategy |
| Build Tool | Vite 5 | Lightning-fast HMR and production builds |
| Fonts | Syne + DM Sans (Google Fonts) | Distinctive, non-generic pairing |
| State | React Context API + localStorage | Zero backend needed |
| Data | `questions.json` in `/public` | Flat file — swap exam by swapping JSON |
| Hosting | GitHub Pages / Netlify / Vercel | Free static deployment |

---

## 📁 Project Structure

```
hci-quiz/
│
├── QuestionBank/
│   └── questions.json              ← 📦 Master question bank — edit here
│
├── frontend/
│   ├── public/
│   │   └── questions.json          ← Copy of QuestionBank (served by Vite)
│   │
│   ├── src/
│   │   ├── main.jsx                ← React entry point + theme init (no flash)
│   │   ├── App.jsx                 ← Root: routing, theme toggle, popup logic
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx                  ← Mode switcher + theme toggle + XP
│   │   │   ├── AppreciationPopup.jsx       ← First-visit developer popup
│   │   │   ├── CongratsPanel.jsx           ← Completion congratulations panel
│   │   │   │
│   │   │   ├── game/
│   │   │   │   ├── LevelSelect.jsx         ← 6 boss level cards with lock state
│   │   │   │   └── GameScreen.jsx          ← Full game engine (timer, hearts, XP)
│   │   │   │
│   │   │   └── practice/
│   │   │       └── PracticeScreen.jsx      ← 120 questions, free nav, instant feedback
│   │   │
│   │   ├── context/
│   │   │   ├── QuestionsContext.jsx        ← Fetches & caches questions.json
│   │   │   └── GameContext.jsx             ← Global XP, levels, practice progress
│   │   │
│   │   ├── hooks/
│   │   │   └── useTimer.js                 ← 30s countdown using Date.now() — no drift
│   │   │
│   │   └── styles/
│   │       └── index.css                   ← Tailwind base + custom CSS utilities
│   │
│   ├── index.html                  ← Vite shell + PWA meta tags + Google Fonts
│   ├── tailwind.config.js          ← Theme colours, dark mode, custom animations
│   ├── vite.config.js              ← Vite + React plugin config
│   ├── postcss.config.js           ← PostCSS + Autoprefixer
│   └── package.json                ← Dependencies and scripts
│
├── README.md                       ← This file
└── LICENSE                         ← MIT License
```

> **`QuestionBank/`** is the source of truth. After editing, always copy to `frontend/public/questions.json`.

---

## 🎨 Design System

### Fonts

| Role | Font | Why |
|---|---|---|
| Headings / UI labels | `Syne` | Bold, geometric — feels competitive and sharp |
| Body / question text | `DM Sans` | Highly readable at all sizes, warm and approachable |

### Color Palette

#### 🌑 Dark Theme (Default)

| Role | Tailwind Token | Hex |
|---|---|---|
| Page Background | `zinc-950` | `#0f0f0f` |
| Card Surface | `zinc-900` | `#18181b` |
| Card Border | `zinc-800` | `#27272a` |
| Gold Accent | custom `gold-400` | `#f0c040` |
| Text Primary | `zinc-100` | `#f4f4f5` |
| Text Muted | `zinc-400` | `#a1a1aa` |
| Danger / Hearts | `red-400` | `#f87171` |
| Success | `green-400` | `#4ade80` |

#### ☀️ Light Theme

| Role | Tailwind Token | Hex |
|---|---|---|
| Page Background | `amber-50` | `#f5f0e8` |
| Card Surface | `white` | `#ffffff` |
| Card Border | `amber-100` | `#fef3c7` |
| Gold Accent | `yellow-700` | `#b8860b` |
| Text Primary | `zinc-900` | `#18181b` |
| Text Muted | `zinc-500` | `#71717a` |

---

## 📦 Data Schema

All questions live in `QuestionBank/questions.json` (copied to `frontend/public/questions.json`):

```json
{
  "id": "q001",
  "level": 1,
  "week": 1,
  "question": "What is the primary goal of Human-Computer Interaction (HCI)?",
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

### Field Reference

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique identifier — `q001` through `q120` |
| `level` | `integer` | 1–6, determines which Boss Level the question belongs to |
| `week` | `integer` | 1–12, displayed as a label in Practice Mode |
| `question` | `string` | Full question text |
| `options` | `string[]` | Exactly 4 answer choices |
| `correctAnswer` | `string` | Must be an exact string match with one of the options |
| `explanation` | `string` | Shown after answering in both Game and Practice Mode |
| `points` | `integer` | Base XP before multiplier — use `10` for all questions |

> ⚠️ `correctAnswer` is **case-sensitive** and must match one option exactly, character for character.

---

## 💾 State Management

All progress is stored in the browser's `localStorage`. No backend, no accounts, no server required.

### Complete Key Reference

| Key | Type | Set When |
|---|---|---|
| `hci_theme` | `"dark"` / `"light"` | User toggles the theme button |
| `hci_appreciated` | `"true"` | User clicks "Thank You" in the popup |
| `hci_total_xp` | `integer` | After every correct answer in Game Mode |
| `hci_highest_level` | `integer` 1–6 | After passing a level with ≥ 75% accuracy |
| `hci_practice_attempted` | `JSON object` | `{ "q001": "correct", "q002": "wrong" }` |
| `hci_game_completed` | `"true"` | All 6 Game Mode levels completed |
| `hci_practice_completed` | `"true"` | All 120 Practice questions attempted |

> ⚠️ Progress is browser-specific. Clearing browser data will reset all progress.

---

## 🚀 Step-by-Step Setup Guide

### Prerequisites

- **Node.js v18 or higher** — [Download here](https://nodejs.org)
- **npm** (bundled with Node.js) or yarn
- A code editor — **VS Code** is recommended

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/hci-quiz.git
cd hci-quiz
```

---

### Step 2 — Navigate to the frontend folder

```bash
cd frontend
```

---

### Step 3 — Install all dependencies

```bash
npm install
```

This installs: React 18, React Router v6, Tailwind CSS v3, Vite 5, PostCSS, and Autoprefixer.

---

### Step 4 — Set your LinkedIn URL

Open `src/components/AppreciationPopup.jsx` and update line 1:

```js
const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_PROFILE_HERE'
```

---

### Step 5 — Start the development server

```bash
npm run dev
```

Open your browser at: **http://localhost:5173**

The app hot-reloads on every file save — no manual refresh needed.

---

### Step 6 — Build for production

```bash
npm run build
```

The optimised output is in the `/dist` folder. Upload this folder to any static host.

---

### Step 7 — Deploy free to GitHub Pages

```bash
# Install the deploy tool
npm install --save-dev gh-pages
```

Add this to `package.json` under `"scripts"`:

```json
"deploy": "gh-pages -d dist"
```

Then build and deploy:

```bash
npm run build
npm run deploy
```

Your site will be live at: `https://YOUR_USERNAME.github.io/hci-quiz/`

---

### Step 8 — Sync questions when you make changes

After editing `QuestionBank/questions.json`, always copy it to the public folder:

```bash
# Run from the project root (hci-quiz/)
cp QuestionBank/questions.json frontend/public/questions.json
```

The `QuestionBank/` folder is the single source of truth. The `frontend/public/` copy is what Vite actually serves to the browser.

---

## ✍️ How to Add / Change Questions

### Adding a new question

Open `QuestionBank/questions.json` and append a new object inside the array:

```json
{
  "id": "q121",
  "level": 3,
  "week": 5,
  "question": "Which cognitive law states that working memory holds 7 ± 2 items?",
  "options": ["Fitts's Law", "Miller's Law", "Hick's Law", "Norman's Law"],
  "correctAnswer": "Miller's Law",
  "explanation": "George Miller's 1956 paper proposed that human short-term memory can hold approximately 7 (plus or minus 2) chunks of information at once.",
  "points": 10
}
```

Then sync to public:

```bash
cp QuestionBank/questions.json frontend/public/questions.json
```

### Switching to a different exam entirely

1. Replace all entries in `QuestionBank/questions.json` with the new exam's questions
2. Copy to `frontend/public/questions.json`
3. Update the level title labels in `src/components/game/LevelSelect.jsx`
4. Done — the entire platform adapts automatically

---

## 🏆 Progression System

```
[L1] ──(≥ 75%)──► [L2] ──(≥ 75%)──► [L3]
                                        │
[L6] ◄──(≥ 75%)── [L5] ◄──(≥ 75%)── [L4]
```

- Questions are **shuffled** on every attempt using Fisher-Yates — prevents memorising answer positions
- Timeouts count as wrong answers in accuracy calculation
- Failing (< 75%) → shows score → prompts retry
- Passing (≥ 75%) → `hci_highest_level` updated → next level card unlocks instantly

---

## 🧮 Scoring Logic

```
Final XP = (base_points × streak_multiplier) + speed_bonus

streak_multiplier = 1.0 (streak 1–2)  |  1.5 (streak 3–4)  |  2.0 (streak 5+)
speed_bonus       = +5 XP if answered correctly AND timeLeft > 20 seconds
```

| Scenario | Calculation | XP Earned |
|---|---|---|
| Correct, slow, streak 1 | 10 × 1.0 + 0 | **10 XP** |
| Correct, fast, streak 2 | 10 × 1.0 + 5 | **15 XP** |
| Correct, fast, streak 4 | 10 × 1.5 + 5 | **20 XP** |
| Correct, fast, streak 6 | 10 × 2.0 + 5 | **25 XP** |
| Wrong or Timeout | — | **0 XP** |

---

## 🌗 Dark & Light Theme

The toggle is pinned in the Navbar — always visible, works on every screen size.

```jsx
// main.jsx — theme applied before first paint to prevent any flash
const savedTheme = localStorage.getItem('hci_theme') || 'dark'
document.documentElement.className = savedTheme
```

```js
// tailwind.config.js
darkMode: 'class'
// Dark = <html class="dark">
// Light = <html class="light">
```

All colours are CSS custom properties — no JavaScript re-renders needed when toggling.

---

## 📱 Responsive Design

Built **mobile-first** and scales up beautifully to tablet and desktop.

### Breakpoints

| Breakpoint | Target Devices | Layout |
|---|---|---|
| `< 480px` | Small phones — iPhone SE, Redmi | Single column, full-width cards, large tap targets |
| `480–767px` | Standard phones — iPhone 14, Pixel | Single column, sticky scrollable question selector |
| `768–1023px` | Tablets — iPad, Samsung Tab | Wider cards, increased padding |
| `≥ 1024px` | Laptops & desktops | Max-width `1024px` centred container |

### Mobile UX Rules

| Rule | Detail |
|---|---|
| Tap targets | All buttons `min-height: 48px` (Google Material standard) |
| No pinch-zoom | `maximum-scale=1.0` in viewport meta tag |
| Smooth iOS scroll | `-webkit-overflow-scrolling: touch` on question selector row |
| No tap highlight | `-webkit-tap-highlight-color: transparent` applied globally |
| Font size floor | `16px` minimum on all interactive elements — prevents iOS auto-zoom |
| Modals | `width: 95vw`, `max-height: 90vh` — never overflow on any screen |
| Theme toggle | Always visible in Navbar — never scrolled out of reach |

### Add to Home Screen (PWA)

Students can install the platform on their home screen for a native-app feel:

| Device | Steps |
|---|---|
| **Android Chrome** | Tap ⋮ menu → "Add to Home screen" → Add |
| **iPhone Safari** | Tap Share `⬆️` → "Add to Home Screen" → Add |

---

## 🗺️ Roadmap

- [x] 🎮 Game Mode — timer, hearts, streaks, XP, 6 boss levels
- [x] 📖 Practice Mode — 120 questions, scrollable selector, free navigation, instant feedback
- [x] 👨‍💻 Developer Appreciation Popup — one-time thank you + LinkedIn follow
- [x] 🎉 Completion & Congratulations Panel — personalised by accuracy %
- [x] 🌗 Dark / Light theme — persisted across sessions, no flash on load
- [x] 📱 Fully responsive — mobile, tablet & desktop
- [x] 📲 PWA Add to Home Screen meta tags
- [x] ⌨️ Keyboard shortcuts (`1` `2` `3` `4`) for desktop users
- [X] 🏆 Local leaderboard — top 5 scores stored per device
- [X] 📚 Subject selector — swap between different NPTEL courses
- [X] 🔊 Sound effects — correct, wrong, fire streak, game over
- [X] 🎊 Confetti animation on level completion
- [X] 🌐 Full PWA with service worker (true offline mode)
- [X] 📤 Export results as shareable scorecard image
- [X] 📳 Haptic feedback on mobile (Vibration API)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m "feat: describe your change"`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

### Guidelines

- All styling via Tailwind utility classes — no inline styles
- Use CSS variables for any custom colours — never hardcode hex values
- All new questions must include an `explanation` field
- Test on a **real iOS device in Safari** before submitting — DevTools emulation is not sufficient
- Test in both **dark and light themes**
- Verify the question selector row scrolls correctly on mobile
- Run `npm run build` and confirm no build errors before submitting

---

## 👨‍💻 Developer Notes

### Common Gotchas

| Issue | Fix |
|---|---|
| `questions.json` returns 404 | File must be in `frontend/public/` — Vite only serves files from this folder statically |
| Theme flashes white on load | `main.jsx` applies theme class before first render — do not move this logic |
| iOS tap highlight appears | `-webkit-tap-highlight-color: transparent` is set globally in `index.css` |
| iOS auto-zoom on option tap | Keep all interactive element font sizes at `≥ 16px` |
| Timer drifts over long session | `useTimer.js` uses `Date.now()` snapshots — it is immune to `setInterval` drift |
| Popup reappears after Thank You | Confirm `localStorage.setItem('hci_appreciated', 'true')` fires before `setShowPopup(false)` |
| Questions not randomising | Fisher-Yates shuffle runs in `GameScreen.jsx` on component mount |
| Questions stale after edit | Always copy `QuestionBank/questions.json` → `frontend/public/questions.json` after every edit |

### Responsive Testing Checklist

Run through this before every release:

- [X] Chrome DevTools — iPhone SE (375px width)
- [X] Chrome DevTools — iPad Air (820px)
- [X] Chrome DevTools — Desktop 1440px
- [X] Chrome DevTools — iPhone 14 Pro (393px)
- [X] Real Android device — Chrome browser
- [X] Real iPhone — Safari *(critical — iOS behaves differently from DevTools)*
- [X] Dark theme on all screen sizes above
- [X] Light theme on all screen sizes above
- [X] Appreciation popup appears correctly on first visit
- [X] "Thank You" click → popup never shown again after page reload
- [X] "✕" click → popup appears again on next visit
- [X] Congratulations panel triggers correctly in both Game and Practice Mode
- [X] Question selector row scrolls horizontally on mobile without clipping

---

## 📄 License

Distributed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full details.

---

<div align="center">

Made with ❤️ for every student who deserves better than boring PDFs.

*Study anywhere. Score everywhere.*

⭐ **Star this repo if it helped you score better on your HCI exam!** ⭐

</div>
