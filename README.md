# 🎮 NPTEL Gamified Practice Platform

<div align="center">

![Platform Banner](https://img.shields.io/badge/NPTEL-Gamified%20Platform-gold?style=for-the-badge&logo=graduation-cap&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Built With](https://img.shields.io/badge/Built%20With-React-61DAFB?style=for-the-badge&logo=react)
![Styled](https://img.shields.io/badge/Styled-Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![No Backend](https://img.shields.io/badge/Backend-None%20Required-red?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-blueviolet?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Add%20to%20Home%20Screen-orange?style=for-the-badge)

**Transform NPTEL assignment practice into an addictive, game-like experience.**
*Built with React — fast, component-driven, and fully scalable.*
*Two modes: Gamified battle mode & free practice mode. Anytime. Anywhere.*

[🚀 Live Demo](#) · [📖 Documentation](#table-of-contents) · [🐛 Report Bug](issues) · [✨ Request Feature](issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Why React](#-why-react)
- [The Problem We Solve](#-the-problem-we-solve)
- [Two Modes Explained](#-two-modes-explained)
- [Core Game Mechanics](#-core-game-mechanics-game-mode)
- [Practice Mode](#-practice-mode-free-browse)
- [Developer Appreciation Popup](#-developer-appreciation-popup)
- [Completion & Congratulations Panel](#-completion--congratulations-panel)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Data Schema](#-data-schema)
- [State Management](#-state-management)
- [Getting Started](#-getting-started)
- [How to Add Questions](#-how-to-add-questions)
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

The **NPTEL Gamified Practice Platform** reimagines how students prepare for NPTEL weekly assignments. Instead of boring static PDFs and basic web forms, this platform delivers **two powerful study experiences** in one app:

- 🎮 **Game Mode** — Timers, hearts, streaks, XP, and boss levels. High pressure, high reward.
- 📖 **Practice Mode** — All 120 questions in one clean list. No pressure. Full freedom. Instant answer feedback.

Built with **React** for smooth component transitions, fast state updates, and clean scalable architecture. Fully responsive — desktop-grade in a browser, native-app feel on mobile.

> "The best study session is the one students don't realize is a study session."

---

## ⚛️ Why React

The original plan was Vanilla JS. As the feature set grew — two modes, popups, completion tracking, free question navigation, dynamic UI states — React became the right and only sensible choice.

| Reason | Detail |
|---|---|
| 🔄 **Component reuse** | QuestionCard, OptionButton, Timer, Modal, HeartBar are shared across both modes |
| ⚡ **Fast state updates** | `useState` and `useEffect` handle timer, streak, hearts, and XP cleanly without manual DOM manipulation |
| 🧭 **Routing** | `React Router` handles Game Mode ↔ Practice Mode ↔ Level Select navigation cleanly |
| 📦 **Scalability** | Adding new features (leaderboard, courses, PWA) is straightforward with a component tree |
| 🛠️ **Developer experience** | Hot reload, clear component boundaries, easier debugging |

> The app still uses **no backend** — all data comes from a local `questions.json` and `localStorage`. React is only the UI layer.

---

## 🚨 The Problem We Solve

| Problem | Our Solution |
|---|---|
| 😴 **No motivation** — studying feels like a chore | ⚡ XP, streaks & level-up dopamine hits in Game Mode |
| ⏱️ **No time pressure** — students are slow under exam conditions | 🔥 Strict 30-second timer per question |
| 🔁 **Low replayability** — students never revisit completed assignments | 🏆 Heart system & perfect-score chasing |
| 📉 **No progress tracking** — no sense of advancement | 🗺️ 6-level boss progression system |
| 💻 **Desktop-only tools** — students can't practice on the go | 📱 Fully responsive — mobile, tablet & desktop |
| 📋 **No free browsing** — can't jump to a specific question | 📖 Practice Mode — all 120 questions, full freedom |
| 🙈 **No quick answer check** — have to finish a whole quiz | ✅ Practice Mode shows correct answer immediately after each attempt |

---

## 🔀 Two Modes Explained

The navbar always shows both modes — students can switch between them at any time.

```
┌─────────────────────────────────────────────┐
│  NPTEL Quiz   [🎮 Game Mode] [📖 Practice]  │
└─────────────────────────────────────────────┘
```

| Feature | 🎮 Game Mode | 📖 Practice Mode |
|---|---|---|
| Timer | ✅ 30-second countdown | ❌ No timer |
| Hearts | ✅ 3 hearts per level | ❌ No hearts |
| Streaks & XP | ✅ Full multiplier system | ❌ No XP |
| Level locks | ✅ 75% accuracy gate | ❌ All questions accessible |
| Answer feedback | After selection | Immediately after selection |
| Question order | Sequential per level | Free — jump to any question |
| Question count | Per level (grouped by weeks) | All 120 questions in one list |
| Progress saved | ✅ localStorage | ✅ localStorage (attempted tracking) |
| Completion panel | ✅ After all levels done | ✅ After all 120 attempted |

---

## 🎮 Core Game Mechanics (Game Mode)

### ⏱️ 1. 30-Second Time Attack

Every question has a **strict 30-second countdown timer**.

| Event | Effect |
|---|---|
| ✅ Correct in **< 10 seconds** | `+5 Bonus XP` Speed Bonus |
| ✅ Correct in 10–30 seconds | Normal XP awarded |
| ❌ Timer hits **0** | Wrong answer → lose 1 Heart + streak resets |

---

### 🗺️ 2. Progression System (12 Weeks → 6 Boss Levels)

| Boss Level | Weeks Covered | Unlock Requirement |
|---|---|---|
| Level 1 | Week 1–2 | Starting Level |
| Level 2 | Week 3–4 | ≥ 75% accuracy in Level 1 |
| Level 3 | Week 5–6 | ≥ 75% accuracy in Level 2 |
| Level 4 | Week 7–8 | ≥ 75% accuracy in Level 3 |
| Level 5 | Week 9–10 | ≥ 75% accuracy in Level 4 |
| Level 6 | Week 11–12 | ≥ 75% accuracy in Level 5 |

> 🔒 Locked levels are visually inaccessible until unlocked.

---

### ❤️ 3. Health System (Hearts)

```
❤️ ❤️ ❤️  →  Wrong / Timeout  →  ❤️ ❤️ 🖤  →  0 hearts  →  💀 Game Over
```

---

### 🔥 4. Streak Multipliers

| Streak | Multiplier | Status |
|---|---|---|
| 1–2 Correct | **1x** | Normal |
| 3–4 Correct | **1.5x** | Hot Streak |
| 5+ Correct | **2x** | 🔥 ON FIRE |

---

## 📖 Practice Mode (Free Browse)

Practice Mode is a **completely separate, pressure-free** way to go through all 120 questions. No timer. No hearts. No XP. Just learning.

### How It Works

- All 120 questions are displayed as a **numbered list in a single scrollable row** in the navbar / question selector panel.
- The student can **tap any question number** to jump directly to it — full freedom, no locks.
- After selecting an answer, the **correct answer is shown immediately** before moving to the next question.
- A subtle ✅ or ❌ badge appears on each question number in the list to show which ones have been attempted.
- The student can move forward, backward, or jump around freely at any point.

### Practice Mode UI Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Question Selector Row (scrollable)                          │
│  [1✅][2✅][3❌][4][5][6] ... [118][119][120]               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Q47. What is the vanishing gradient problem?                │
│                                                              │
│  ○  Gradients become too large during backpropagation        │
│  ○  Gradients shrink to near zero in deep networks    ← ✅   │
│  ○  The network forgets earlier layers entirely              │
│  ○  Weights are not updated during training                  │
│                                                              │
│  ✅ Correct! Gradients shrink exponentially in deep...       │
│  [← Previous]                        [Next Question →]      │
└──────────────────────────────────────────────────────────────┘
```

### Practice Mode State (localStorage)

| Key | Type | Description |
|---|---|---|
| `nptel_practice_attempted` | `object` | Map of `{ "q101": "correct", "q102": "wrong" }` for all attempted questions |

---

## 👨‍💻 Developer Appreciation Popup

When a student opens the platform **for the very first time**, a warm welcome popup appears before they start — acknowledging the effort that went into building this free tool.

### Behaviour

| Action | Result |
|---|---|
| Click **"Thank You 🙏"** button | Popup closes + `nptel_appreciated: true` saved to `localStorage` — **never shown again** |
| Click **✕ close icon** (top-right) | Popup closes for this session — will show again on next visit |

> The "Thank You" button is a **one-time action**. Once clicked, the popup is permanently dismissed across all future visits and page reloads.

### Popup Content

```
┌─────────────────────────────────────────────┐  ✕
│                                             │
│   🙏  Hey, glad you're here!                │
│                                             │
│   This platform was built with love to      │
│   help you crack your NPTEL exam without    │
│   the boring grind. It's completely free.   │
│                                             │
│   If it helped you, a small appreciation   │
│   goes a long way for the developer! 😊     │
│                                             │
│        [ 🙏 Thank You, I Appreciate It ]    │
│                                             │
│   ─────────────────────────────────────     │
│   💼 Follow the developer on LinkedIn       │
│      for more tools like this →             │
│      [ Follow on LinkedIn 🔗 ]              │
│                                             │
└─────────────────────────────────────────────┘
```

### Implementation Logic

```javascript
// On app load — check if already appreciated
const hasAppreciated = localStorage.getItem('nptel_appreciated');
if (!hasAppreciated) {
  setShowAppreciationPopup(true);
}

// On "Thank You" button click
const handleThankYou = () => {
  localStorage.setItem('nptel_appreciated', 'true');
  setShowAppreciationPopup(false);
};

// On ✕ close icon click
const handleClose = () => {
  setShowAppreciationPopup(false);
  // Does NOT set localStorage — will show again next visit
};

// LinkedIn link
const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_PROFILE';
```

### localStorage Key

| Key | Value | Description |
|---|---|---|
| `nptel_appreciated` | `"true"` | Set when Thank You is clicked. If present, popup never shows again. |

---

## 🎉 Completion & Congratulations Panel

When a student completes **all questions** — whether through Game Mode (all 6 levels) or Practice Mode (all 120 questions attempted) — a **full Congratulations Panel** appears.

### Trigger Conditions

| Mode | Trigger |
|---|---|
| 🎮 Game Mode | All 6 levels completed (regardless of score) |
| 📖 Practice Mode | All 120 questions attempted at least once |

### Panel Content

The panel is **personalised** based on the student's actual performance — not a generic message.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   🎉  You Did It!                                    │
│                                                      │
│   You've completed all 120 NPTEL questions.          │
│                                                      │
│   ┌──────────────────────────────────────┐           │
│   │  Your Score        84 / 120          │           │
│   │  Accuracy          70%               │           │
│   │  Total XP Earned   1,240 XP          │           │
│   │  Questions Right   84  ✅            │           │
│   │  Questions Wrong   36  ❌            │           │
│   └──────────────────────────────────────┘           │
│                                                      │
│   ⭐ Great effort! You're well prepared.             │
│                                                      │
│   All the very best for your NPTEL exam! 🚀          │
│   You've put in the work — now go ace it! 💪         │
│                                                      │
│   [ 🔁 Play Again ]      [ 📖 Practice Mode ]        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Performance-Based Messages

The congratulations message adapts based on final accuracy:

| Accuracy | Message |
|---|---|
| 90% – 100% | 🏆 "Outstanding! You're fully exam-ready. Go get that top score!" |
| 75% – 89% | 🌟 "Great effort! You've got a strong grip. A quick revision and you're set!" |
| 50% – 74% | ⭐ "Good job completing the full set! Focus on your weak areas and you'll nail it!" |
| Below 50% | 💪 "Well done for finishing! Every attempt makes you stronger. Give it another round!" |

### localStorage Keys (Completion)

| Key | Type | Description |
|---|---|---|
| `nptel_game_completed` | `boolean` | Set to `true` when all 6 game levels are completed |
| `nptel_practice_completed` | `boolean` | Set to `true` when all 120 practice questions are attempted |

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| UI Framework | `React 18` | Component reuse, fast state, clean routing |
| Routing | `React Router v6` | Game Mode ↔ Practice Mode navigation |
| Styling | `Tailwind CSS` | Utility-first, responsive, dark mode support |
| State | `React useState / useReducer` | Local component and game state |
| Persistence | `localStorage` | Zero server cost progress saving |
| Data | `questions.json` | Local flat-file question database |
| Build Tool | `Vite` | Lightning-fast dev server and build |
| Hosting | GitHub Pages / Netlify / Vercel | Free static deployment |

**Still zero backend** — React is only the UI layer. All data is local.

---

## 📁 Project Structure

```
nptel-gamified-platform/
│
├── public/
│   ├── questions.json        # Question database (loaded via fetch)
│   └── icon-192.png          # PWA home screen icon
│
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Root — router, theme, popup logic
│   │
│   ├── components/
│   │   ├── Navbar.jsx                  # Top nav — mode switcher + theme toggle
│   │   ├── AppreciationPopup.jsx       # First-visit developer popup
│   │   ├── CongratsPanel.jsx           # Completion congratulations panel
│   │   │
│   │   ├── game/
│   │   │   ├── LevelSelect.jsx         # 6 boss level cards with lock state
│   │   │   ├── GameScreen.jsx          # Active game — question + timer + HUD
│   │   │   ├── QuestionCard.jsx        # Question text display
│   │   │   ├── OptionButton.jsx        # Single answer option button
│   │   │   ├── TimerBar.jsx            # 30-second shrinking bar
│   │   │   ├── HeartBar.jsx            # 3 hearts display
│   │   │   ├── StreakBadge.jsx         # Streak + multiplier indicator
│   │   │   ├── XPCounter.jsx           # Live XP display
│   │   │   ├── GameOverModal.jsx       # 0 hearts → Game Over
│   │   │   └── LevelCompleteModal.jsx  # Level passed/failed result
│   │   │
│   │   └── practice/
│   │       ├── PracticeScreen.jsx      # Practice mode root
│   │       ├── QuestionSelector.jsx    # Scrollable question number row
│   │       └── PracticeCard.jsx        # Question + answer + instant feedback
│   │
│   ├── hooks/
│   │   ├── useTimer.js         # 30-second countdown logic
│   │   ├── useGameState.js     # Hearts, streaks, XP, level state
│   │   └── useLocalStorage.js  # Read/write localStorage helper
│   │
│   ├── data/
│   │   └── questions.js        # Fetches and caches questions.json
│   │
│   └── styles/
│       └── index.css           # Tailwind base + custom CSS variables
│
├── index.html                  # Vite HTML shell + PWA meta tags
├── tailwind.config.js          # Theme colours, dark mode config
├── vite.config.js              # Vite build config
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette

Two themes — togglable at any time, on any device, without a page reload.

#### 🌑 Dark Theme (Default)

| Role | Tailwind Token | Hex | Preview |
|---|---|---|---|
| Background | `bg-zinc-900` | `#1a1a1a` | ⬛ Deep Charcoal |
| Surface (Cards) | `bg-zinc-800` | `#2b2b2b` | ⬛ Card Background |
| Accent / Gold | `text-yellow-400` | `#f0c040` | 🟡 Warm Gold |
| Text Primary | `text-zinc-100` | `#f5f5f5` | ⬜ Off White |
| Text Muted | `text-zinc-400` | `#a0a0a0` | 🔘 Soft Grey |
| Danger | `text-red-400` | `#e05555` | 🔴 Soft Red |
| Success | `text-green-400` | `#4caf7d` | 🟢 Calm Green |
| Border | `border-zinc-700` | `#3a3a3a` | ⬛ Subtle Border |

#### ☀️ Light Theme

| Role | Tailwind Token | Hex | Preview |
|---|---|---|---|
| Background | `bg-amber-50` | `#f4f1eb` | 🟫 Warm Cream |
| Surface (Cards) | `bg-white` | `#ffffff` | ⬜ White |
| Accent / Gold | `text-yellow-700` | `#b8860b` | 🟡 Dark Gold |
| Text Primary | `text-zinc-900` | `#1a1a1a` | ⬛ Near Black |
| Text Muted | `text-zinc-500` | `#6b6b6b` | 🔘 Medium Grey |
| Danger | `text-red-600` | `#cc3333` | 🔴 Classic Red |
| Success | `text-green-700` | `#2e7d52` | 🟢 Forest Green |
| Border | `border-amber-200` | `#ddd8ce` | ⬜ Warm Border |

### Typography

- **Font**: `'Inter'` (Google Fonts) — clean, modern, highly readable at all sizes
- **Fallback**: `system-ui, -apple-system, sans-serif`

---

## 📦 Data Schema

All questions live in `public/questions.json`:

```json
{
  "id": "q101",
  "level": 1,
  "week": 1,
  "question": "Which of the following best describes supervised learning?",
  "options": [
    "Learning without labeled data",
    "Learning with labeled input-output pairs",
    "Learning through rewards and penalties",
    "Learning by clustering similar data points"
  ],
  "correctAnswer": "Learning with labeled input-output pairs",
  "explanation": "Supervised learning uses labeled training data where each input has a known correct output.",
  "points": 10
}
```

### Field Reference

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier — e.g. `q101`, `q202` |
| `level` | `integer` | Boss Level (1–6) — used by Game Mode |
| `week` | `integer` | NPTEL week (1–12) — for reference |
| `question` | `string` | Full question text |
| `options` | `string[]` | Exactly 4 answer choices |
| `correctAnswer` | `string` | Must exactly match one option string |
| `explanation` | `string` | Shown after answering in both modes |
| `points` | `integer` | Base XP (default: `10`) |

> ⚠️ `correctAnswer` must be an **exact string match** with one of the `options` values. Casing matters.

---

## 💾 State Management

No backend. All progress is stored in the browser's `localStorage`.

### Complete localStorage Key Reference

| Key | Type | Set When |
|---|---|---|
| `nptel_highest_level_unlocked` | `integer` 1–6 | User passes a level in Game Mode |
| `nptel_total_xp` | `integer` | After every correct answer in Game Mode |
| `nptel_theme` | `"dark"` / `"light"` | User toggles theme |
| `nptel_appreciated` | `"true"` | User clicks "Thank You" in the popup |
| `nptel_practice_attempted` | `JSON object` | Each question attempted in Practice Mode |
| `nptel_game_completed` | `"true"` | All 6 Game Mode levels completed |
| `nptel_practice_completed` | `"true"` | All 120 Practice Mode questions attempted |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `≥ 18`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/nptel-gamified-platform.git
cd nptel-gamified-platform

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output in /dist — deploy this folder to any static host
```

### Deploy Free (GitHub Pages)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy

# Live at: https://YOUR_USERNAME.github.io/nptel-gamified-platform/
```

> Students can bookmark the URL and access it from **any device** — no install required.

---

## ✍️ How to Add Questions

1. Open `public/questions.json`
2. Add a new object following the schema above
3. Set the correct `level` (1–6)
4. Ensure `correctAnswer` exactly matches one of the `options`
5. Save — Vite hot-reloads instantly in dev

```json
{
  "id": "q201",
  "level": 2,
  "week": 3,
  "question": "What is the time complexity of binary search?",
  "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
  "correctAnswer": "O(log n)",
  "explanation": "Binary search halves the search space at each step — O(log n) time complexity.",
  "points": 10
}
```

---

## 🏆 Progression System

```
[Level 1] ──(≥75%)──► [Level 2] ──(≥75%)──► [Level 3]
                                                  │
[Level 6] ◄──(≥75%)── [Level 5] ◄──(≥75%)── [Level 4]
```

- Timeouts count as wrong answers in accuracy calculation
- Failing (< 75%) shows score and prompts retry
- Passing updates `nptel_highest_level_unlocked` in localStorage

---

## 🧮 Scoring Logic

```
Final XP = (base_points × streak_multiplier) + speed_bonus

streak_multiplier = 1.0 (1–2 streak) | 1.5 (3–4 streak) | 2.0 (5+ streak)
speed_bonus       = +5 XP if answered correctly in < 10 seconds
```

| Scenario | Calculation | XP |
|---|---|---|
| Correct, 15s, streak 1 | 10 × 1.0 + 0 | **10 XP** |
| Correct, 7s, streak 2 | 10 × 1.0 + 5 | **15 XP** |
| Correct, 5s, streak 4 | 10 × 1.5 + 5 | **20 XP** |
| Correct, 3s, streak 6 | 10 × 2.0 + 5 | **25 XP** |
| Wrong or Timeout | — | **0 XP** |

---

## 🌗 Dark & Light Theme

Theme toggle is pinned in the Navbar — always visible on every screen.

```jsx
// App.jsx
const [theme, setTheme] = useState(
  localStorage.getItem('nptel_theme') || 'dark'
);

const toggleTheme = () => {
  const next = theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('nptel_theme', next);
};
```

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // toggle by adding 'dark' class to <html>
}
```

---

## 📱 Responsive Design

Built **mobile-first** — scales up beautifully to tablet and desktop.

### Device Support

| Breakpoint | Devices | Layout |
|---|---|---|
| `< 480px` | Small phones — iPhone SE, Redmi | Single column, full-width cards, large tap targets |
| `480px – 767px` | Standard phones — iPhone 14, Pixel | Single column, sticky question selector row |
| `768px – 1023px` | Tablets — iPad, Samsung Tab | 2-column layout, sidebar visible |
| `1024px – 1279px` | Small laptops | Full layout, keyboard hints visible |
| `≥ 1280px` | Desktops | Max-width `1100px` centred container |

### Mobile UX Decisions

| Feature | Detail |
|---|---|
| 👆 Tap targets | All buttons minimum `48px` tall |
| 📜 Question selector | Horizontal scroll row — compact, thumb-reachable |
| 🪟 Modals & Popups | `95vw` width, `90vh` max — never overflow screen |
| 🔤 Font size | Base `16px` — prevents iOS auto-zoom |
| 🌗 Theme toggle | Pinned in navbar — always reachable |

### 📲 Add to Home Screen (PWA)

Students can add the platform to their home screen for a native-app feel.

```html
<meta name="mobile-web-app-capable"                content="yes">
<meta name="apple-mobile-web-app-capable"          content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title"            content="NPTEL Quiz">
<meta name="theme-color"                           content="#1a1a1a">
<link rel="apple-touch-icon"                       href="/icon-192.png">
```

| Device | Steps |
|---|---|
| **Android Chrome** | ⋮ menu → "Add to Home screen" |
| **iPhone Safari** | Share `⬆️` → "Add to Home Screen" |

---

## 🗺️ Roadmap

- [x] Game Mode — timer, hearts, streaks, XP, 6 boss levels
- [x] Practice Mode — all 120 questions, free navigation, instant feedback
- [x] Developer Appreciation Popup — shown once, dismissed permanently
- [x] Completion & Congratulations Panel — personalised by accuracy
- [x] Dark / Light theme — persisted in localStorage
- [x] Fully responsive — mobile, tablet & desktop
- [x] PWA Add to Home Screen
- [ ] Leaderboard (local — top 5 scores on device)
- [ ] Subject selector (multiple NPTEL courses)
- [ ] Sound effects (correct / wrong / fire streak)
- [ ] Confetti animation on level completion
- [ ] Full PWA with service worker (true offline)
- [ ] Export results as shareable scorecard image
- [ ] Haptic feedback on mobile (Vibration API)

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes — add questions, fix bugs, build features
4. Commit: `git commit -m "feat: your change"`
5. Push and open a Pull Request

### Guidelines

- Keep all styling within Tailwind utilities — no inline styles
- Use CSS variables for any custom colours, never hardcode
- All questions must include an `explanation`
- Test on **mobile Safari and Android Chrome** before submitting
- Test in both **dark and light themes**

---

## 👨‍💻 Developer Notes

### Common Gotchas

| Issue | Fix |
|---|---|
| `questions.json` 404 in dev | Place in `/public` folder — Vite serves it statically |
| Theme flicker on load | Read `localStorage` before first render using `useLayoutEffect` |
| iOS tap highlight on buttons | Add `-webkit-tap-highlight-color: transparent` |
| iOS auto-zoom | Keep all interactive element font-size `≥ 16px` |
| Timer drift over time | Use `Date.now()` snapshots, not raw `setInterval` counting |
| Popup showing after Thank You | Confirm `localStorage.setItem` runs before state update |

### Responsive Testing Checklist

- [ ] Chrome DevTools — iPhone SE (375px)
- [ ] Chrome DevTools — iPhone 14 Pro (393px)
- [ ] Chrome DevTools — iPad Air (820px)
- [ ] Chrome DevTools — Desktop 1440px
- [ ] Real Android — Chrome browser
- [ ] Real iPhone — Safari *(critical — iOS differs from DevTools)*
- [ ] Dark theme on all above
- [ ] Light theme on all above
- [ ] Appreciation popup appears on first visit
- [ ] Thank You click — popup never shows again
- [ ] Close (✕) — popup shows again next visit
- [ ] Congratulations panel appears after full completion

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ for every NPTEL student who deserves better than boring PDFs.

*Study anywhere. Score everywhere.*

⭐ **Star this repo if it helped you score better!** ⭐

</div>
