# 🎮 NPTEL Gamified Practice Platform

<div align="center">

![Platform Banner](https://img.shields.io/badge/NPTEL-Gamified%20Platform-gold?style=for-the-badge&logo=graduation-cap&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Built With](https://img.shields.io/badge/Built%20With-Vanilla%20JS-yellow?style=for-the-badge&logo=javascript)
![No Backend](https://img.shields.io/badge/Backend-None%20Required-red?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-blueviolet?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Add%20to%20Home%20Screen-orange?style=for-the-badge)

**Transform NPTEL assignment practice into an addictive, game-like experience.**
*Built with pure HTML, CSS & Vanilla JavaScript — zero dependencies, zero server costs.*
*Fully responsive — study on your phone, tablet, or desktop. Anytime. Anywhere.*

[🚀 Live Demo](#) · [📖 Documentation](#table-of-contents) · [🐛 Report Bug](issues) · [✨ Request Feature](issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [The Problem We Solve](#-the-problem-we-solve)
- [Core Game Mechanics](#-core-game-mechanics)
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

The **NPTEL Gamified Practice Platform** reimagines how students prepare for NPTEL weekly assignments. Instead of boring static PDFs and basic web forms, this platform delivers a **GameFi-styled learning experience** — complete with timers, streaks, hearts, XP points, boss levels, and theme switching.

The goal is simple: make studying feel like playing a game so students **actually want** to do it. And since every student has a phone in their pocket, the platform is **fully responsive** — desktop-grade experience in a browser, native-app feel on mobile.

> "The best study session is the one students don't realize is a study session."

---

## 🚨 The Problem We Solve

| Problem | Our Solution |
|---|---|
| 😴 **No motivation** — studying feels like a chore | ⚡ XP, streaks & level-up dopamine hits |
| ⏱️ **No time pressure** — students are slow under exam conditions | 🔥 Strict 30-second timer per question |
| 🔁 **Low replayability** — students never revisit completed assignments | 🏆 Heart system & perfect-score chasing |
| 📉 **No progress tracking** — no sense of advancement | 🗺️ 6-level boss progression system |
| 💻 **Desktop-only tools** — students can't practice on the go | 📱 Fully responsive — mobile, tablet & desktop |

---

## 🎮 Core Game Mechanics

### ⏱️ 1. 30-Second Time Attack

Every question has a **strict 30-second countdown timer**.

| Event | Effect |
|---|---|
| ✅ Correct answer in **< 10 seconds** | `+5 Bonus XP` (Speed Bonus) |
| ✅ Correct answer in 10–30 seconds | Normal XP awarded |
| ❌ Timer hits **0** | Treated as wrong answer → lose 1 Heart + streak reset |

The timer bar shrinks smoothly using `transition: width 1s linear` — creating real visual urgency on every screen size.

---

### 🗺️ 2. The Progression System (12 Weeks → 6 Boss Levels)

The 12-week NPTEL syllabus is compressed into **6 escalating Boss Levels**.

| Boss Level | Weeks Covered | Unlock Requirement |
|---|---|---|
| Level 1 | Week 1–2 | Starting Level |
| Level 2 | Week 3–4 | ≥ 75% accuracy in Level 1 |
| Level 3 | Week 5–6 | ≥ 75% accuracy in Level 2 |
| Level 4 | Week 7–8 | ≥ 75% accuracy in Level 3 |
| Level 5 | Week 9–10 | ≥ 75% accuracy in Level 4 |
| Level 6 | Week 11–12 | ≥ 75% accuracy in Level 5 |

> 🔒 **Locked levels are visually inaccessible** — greyed out and unclickable until the user earns the right to proceed.

---

### ❤️ 3. The Health System (Hearts)

Students start every level with **3 Hearts**.

```
❤️ ❤️ ❤️   →   Wrong answer / Timeout   →   ❤️ ❤️ 🖤
```

- Each **wrong answer or timeout** costs 1 Heart.
- If Hearts reach **0** → a `Game Over` modal appears.
- User must **restart the level** — introducing real risk.
- Risk makes correct answers feel genuinely rewarding.

---

### 🔥 4. Streak Multipliers

Consecutive correct answers multiply the base XP earned.

| Streak | Multiplier | Status |
|---|---|---|
| 1–2 Correct | **1x** | Normal |
| 3–4 Correct | **1.5x** | Hot Streak |
| 5+ Correct | **2x** | 🔥 ON FIRE |

> A wrong answer or timeout **resets the streak to 0**.

---

## 🛠️ Tech Stack

This project is intentionally built with **zero frameworks and zero backend**.

| Layer | Technology | Reason |
|---|---|---|
| Markup | `HTML5` | Semantic, accessible structure |
| Styling | `CSS3` (Grid, Flexbox, Media Queries, Variables) | Responsive Bento Grid, animations, themes |
| Logic | `Vanilla JavaScript (ES6+)` | Fast, no build step required |
| Data | `questions.json` | Local flat-file database |
| Persistence | `localStorage` | Zero server cost progress saving |
| Hosting | GitHub Pages / Netlify / Vercel | Free, instant static deployment |

**Why no React / Node / Backend?**
- ⚡ Lightning-fast load times — works well even on 2G/3G mobile networks
- 💸 Zero server costs — runs entirely in the browser
- 🛠️ Zero build tooling — open `index.html` and it works
- 🌐 Works offline after first load (PWA-ready)
- 📦 Ships as a single folder — drag and drop to any static host

---

## 📁 Project Structure

```
nptel-gamified-platform/
│
├── index.html          # App shell — markup, modals & PWA meta tags
├── styles.css          # Bento Grid, responsive breakpoints, themes, animations
├── app.js              # Core game engine — timer, state, DOM updates, scoring
├── questions.json      # Local question database (flat JSON)
├── icon-192.png        # PWA home screen icon (192×192 px)
│
└── README.md           # You are here
```

### File Responsibilities

**`index.html`**
- Full DOM structure with `viewport` meta tag for mobile rendering
- All modals pre-rendered but hidden (`display: none`)
- Modals: Game Over, Level Complete, Speed Bonus, Explanation
- PWA meta tags enabling Add to Home Screen on iOS and Android

**`styles.css`**
- CSS custom properties for full dark/light theming
- Mobile-first base styles → tablet → desktop via `@media` queries
- Bento Grid layout, collapsing to a single column on mobile
- CSS keyframe animations: timer bar shrink, shake on wrong, pulse on correct
- Touch-friendly tap targets with `min-height: 48px`

**`app.js`**
- Initialises game state from `localStorage` on page load
- Manages the 30-second `setInterval` countdown timer
- Handles answer selection, scoring, and streak calculation
- Triggers modal displays and level transitions
- Saves all state to `localStorage` after every action
- Keyboard shortcut support (`1` `2` `3` `4`) for desktop users

**`questions.json`**
- Flat array of question objects, filtered by `level` at runtime
- No backend or build step required

---

## 🎨 Design System

### Color Palette

The platform ships with **two themes** — togglable at any time without a page reload, on any device.

#### 🌑 Dark Theme (Default)

| Role | Variable | Hex | Preview |
|---|---|---|---|
| Background | `--bg-primary` | `#1a1a1a` | ⬛ Deep Charcoal |
| Surface (Cards) | `--bg-surface` | `#2b2b2b` | ⬛ Card Background |
| Accent / Gold | `--color-gold` | `#f0c040` | 🟡 Warm Gold |
| Text Primary | `--text-primary` | `#f5f5f5` | ⬜ Off White |
| Text Muted | `--text-muted` | `#a0a0a0` | 🔘 Soft Grey |
| Danger (Hearts) | `--color-danger` | `#e05555` | 🔴 Soft Red |
| Success | `--color-success` | `#4caf7d` | 🟢 Calm Green |
| Border | `--color-border` | `#3a3a3a` | ⬛ Subtle Border |

#### ☀️ Light Theme

| Role | Variable | Hex | Preview |
|---|---|---|---|
| Background | `--bg-primary` | `#f4f1eb` | 🟫 Warm Cream |
| Surface (Cards) | `--bg-surface` | `#ffffff` | ⬜ White |
| Accent / Gold | `--color-gold` | `#b8860b` | 🟡 Dark Gold |
| Text Primary | `--text-primary` | `#1a1a1a` | ⬛ Near Black |
| Text Muted | `--text-muted` | `#6b6b6b` | 🔘 Medium Grey |
| Danger (Hearts) | `--color-danger` | `#cc3333` | 🔴 Classic Red |
| Success | `--color-success` | `#2e7d52` | 🟢 Forest Green |
| Border | `--color-border` | `#ddd8ce` | ⬜ Warm Border |

> Theme preference is saved to `localStorage` and restored on the next visit — across any device.

### Typography

- **Font**: `'Inter'` (Google Fonts) — clean, modern, highly readable at all sizes
- **Fallback**: `system-ui, -apple-system, sans-serif`
- Font sizes scale fluidly using `clamp()` between mobile and desktop viewports

### Layout: Bento Grid

The UI uses **CSS Grid** as its foundation, adapting from a single column on mobile to a full Bento layout on desktop:

```css
/* Desktop — Full Bento Grid */
.game-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  grid-template-rows: auto auto 1fr;
  gap: 20px;
}

/* Mobile — Single column stack */
@media (max-width: 767px) {
  .game-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
```

All cards have `border-radius: 16px`, subtle borders, and soft `box-shadow` for depth — consistent across both themes.

---

## 📦 Data Schema

All questions live in `questions.json`. Full schema for a single question object:

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
  "explanation": "Supervised learning uses labeled training data where each input has a known correct output. The model learns to map inputs to outputs from these examples.",
  "points": 10
}
```

### Field Reference

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g., `q101`, `q202`) |
| `level` | `integer` | Boss Level this question belongs to (1–6) |
| `week` | `integer` | NPTEL week (1–12) for reference |
| `question` | `string` | The full question text |
| `options` | `string[]` | Exactly 4 answer choices |
| `correctAnswer` | `string` | Must match one of the `options` strings exactly |
| `explanation` | `string` | Shown after answering — why this answer is correct |
| `points` | `integer` | Base XP before streak multiplier (recommended: `10`) |

> ⚠️ `correctAnswer` must be an **exact string match** with one of the values in `options`. Casing matters.

---

## 💾 State Management

No backend. All progress is stored in the browser's **`localStorage`**.

### Keys Stored

| Key | Type | Description |
|---|---|---|
| `nptel_highest_level_unlocked` | `integer` (1–6) | Highest level the user has unlocked |
| `nptel_total_xp` | `integer` | Cumulative XP across all sessions |
| `nptel_theme` | `string` (`"dark"` / `"light"`) | User's saved theme preference |

### How It Works

```javascript
// Save progress after every answer
localStorage.setItem('nptel_total_xp', JSON.stringify(currentXP));
localStorage.setItem('nptel_highest_level_unlocked', JSON.stringify(unlockedLevel));

// Restore on page load (with safe fallback defaults)
const savedXP       = JSON.parse(localStorage.getItem('nptel_total_xp'))               || 0;
const unlockedLevel = JSON.parse(localStorage.getItem('nptel_highest_level_unlocked')) || 1;
const savedTheme    = localStorage.getItem('nptel_theme')                               || 'dark';
```

> ⚠️ Progress is browser-specific. Clearing browser data will reset all progress — consider showing users a reminder in the UI.

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser — Chrome, Firefox, Edge, Safari (including mobile browsers)
- A code editor (VS Code recommended)
- Optional: a local server for reliable JSON fetching

### Option 1: Open Directly (Simplest)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/nptel-gamified-platform.git
cd nptel-gamified-platform

# Open in browser
open index.html
```

### Option 2: Local Server (Recommended)

```bash
# Python (pre-installed on most systems)
python -m http.server 8000
# Visit: http://localhost:8000

# OR in VS Code: Right-click index.html → "Open with Live Server"
```

### Option 3: Deploy Free (GitHub Pages)

```bash
git init
git add .
git commit -m "Initial commit: NPTEL Gamified Platform"
git remote add origin https://github.com/YOUR_USERNAME/nptel-gamified-platform.git
git push -u origin main

# GitHub repo → Settings → Pages → Source: main / root
# Live at: https://YOUR_USERNAME.github.io/nptel-gamified-platform/
```

> Students can bookmark the GitHub Pages URL and access it from **any device** — phone, tablet, or desktop. No install required.

---

## ✍️ How to Add Questions

1. Open `questions.json`
2. Add a new object to the array following the schema above
3. Set the correct `level` (1–6) based on which weeks it covers
4. Make sure `correctAnswer` exactly matches one of the `options`
5. Save — no build step, no server restart needed

**Example — Adding a Level 2 question:**

```json
{
  "id": "q201",
  "level": 2,
  "week": 3,
  "question": "What is the time complexity of binary search?",
  "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
  "correctAnswer": "O(log n)",
  "explanation": "Binary search halves the search space at each step, giving O(log n) time complexity.",
  "points": 10
}
```

---

## 🏆 Progression System (Detailed)

```
[Level 1] ──(≥75% accuracy)──► [Level 2] ──(≥75%)──► [Level 3]
                                                           │
[Level 6] ◄──(≥75%)── [Level 5] ◄──(≥75%)── [Level 4] ◄──┘
```

**Accuracy Calculation:**

```
Accuracy = (Correct Answers / Total Questions Attempted) × 100
```

- Timeouts count as wrong answers in the accuracy calculation.
- The accuracy gate is evaluated **at the end of each level attempt**.
- Failing (< 75%) shows the score and prompts a retry.
- Passing (≥ 75%) updates `nptel_highest_level_unlocked` in `localStorage`.

---

## 🧮 Scoring Logic

```
Final XP = (base_points × streak_multiplier) + speed_bonus

Where:
  base_points        = question.points (default: 10)
  streak_multiplier  = 1.0 (streak 1–2) | 1.5 (streak 3–4) | 2.0 (streak 5+)
  speed_bonus        = +5 XP if answered correctly in < 10 seconds, else 0
```

**Example Scenarios:**

| Scenario | Calculation | XP Earned |
|---|---|---|
| Correct, 15s, streak 1 | 10 × 1.0 + 0 | **10 XP** |
| Correct, 7s, streak 2 | 10 × 1.0 + 5 | **15 XP** |
| Correct, 5s, streak 4 | 10 × 1.5 + 5 | **20 XP** |
| Correct, 3s, streak 6 | 10 × 2.0 + 5 | **25 XP** |
| Wrong or Timeout | 0 | **0 XP** |

---

## 🌗 Dark & Light Theme

The theme toggle button lives in the header — always visible and reachable on every screen size.

**JS Toggle:**

```javascript
document.body.classList.toggle('light-theme');
const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
localStorage.setItem('nptel_theme', theme);
```

**CSS Implementation:**

```css
/* Dark theme — default, defined on :root */
:root {
  --bg-primary:    #1a1a1a;
  --bg-surface:    #2b2b2b;
  --color-gold:    #f0c040;
  --text-primary:  #f5f5f5;
  --text-muted:    #a0a0a0;
  --color-danger:  #e05555;
  --color-success: #4caf7d;
  --color-border:  #3a3a3a;
}

/* Light theme — overrides via body class */
body.light-theme {
  --bg-primary:    #f4f1eb;
  --bg-surface:    #ffffff;
  --color-gold:    #b8860b;
  --text-primary:  #1a1a1a;
  --text-muted:    #6b6b6b;
  --color-danger:  #cc3333;
  --color-success: #2e7d52;
  --color-border:  #ddd8ce;
}
```

No JavaScript re-renders needed — CSS custom properties cascade instantly across every element on every screen size.

---

## 📱 Responsive Design

The platform is **built mobile-first** and scales up beautifully to tablet and desktop. Students can practice anywhere — on the bus, in the hostel, at the library, or in the lab.

### Device Support Matrix

| Breakpoint | Target Devices | Layout |
|---|---|---|
| `< 480px` | Small phones — iPhone SE, Galaxy A, Redmi | Single column, full-width cards, large tap targets |
| `480px – 767px` | Standard phones — iPhone 14, Pixel 7, OnePlus | Single column, optimised font sizes, sticky timer bar |
| `768px – 1023px` | Tablets — iPad, Samsung Tab, Lenovo Tab | 2-column Bento Grid, sidebar alongside question |
| `1024px – 1279px` | Small laptops, landscape tablets | Full Bento Grid, expanded stats panel, keyboard hints |
| `≥ 1280px` | Desktops, large monitors | Max-width `1100px` container, centred, full layout |

---

### 📐 Mobile Layout (`< 768px`)

On mobile the Bento Grid **collapses to a single column** — every element stacks vertically for comfortable thumb scrolling.

```css
/* Mobile-first base — single column by default */
.game-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 12px;
}

/* Stats bar becomes a horizontal scrollable pill row */
.stats-bar {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
  -webkit-overflow-scrolling: touch; /* Smooth iOS momentum scroll */
  scrollbar-width: none;             /* Hide scrollbar — keep it clean */
}

/* Timer bar spans full width at the top */
.timer-bar-container {
  width: 100%;
  height: 8px; /* Slightly thicker than desktop for visibility */
}

/* Answer option cards — tall enough to tap comfortably */
.option-btn {
  width: 100%;
  min-height: 52px;
  font-size: 0.95rem;
  padding: 14px 16px;
  border-radius: 12px;
  text-align: left;
}
```

**Mobile UX decisions:**

| Feature | Detail |
|---|---|
| 👆 Tap targets | All interactive elements minimum `48px` tall (Google Material spec) |
| 🚫 No broken hover states | All interactions use `active:` pseudo-class, not `hover:` — works correctly on touch |
| 🔤 Font size | Base `16px` — prevents iOS auto-zoom when tapping option cards |
| ⏱️ Timer bar | Full width, pinned at the top — impossible to miss |
| ❤️ Hearts & XP | Horizontal scrollable pill row — compact and always visible |
| 🪟 Modals | `width: 95vw`, `max-height: 90vh`, scroll-enabled — never overflow screen |
| 🌗 Theme toggle | Pinned in header — always reachable without scrolling |

---

### 📐 Tablet Layout (`768px – 1023px`)

Tablets unlock the **2-column Bento Grid** — the question card on the left, stats sidebar on the right.

```css
@media (min-width: 768px) {
  .game-grid {
    grid-template-columns: 1fr 240px;
    grid-template-rows: auto 1fr;
    gap: 16px;
    padding: 20px;
  }

  .question-card { grid-column: 1; }
  .options-grid  { grid-column: 1; }

  .stats-sidebar {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Modals are wider and less full-screen on tablet */
  .modal-content {
    width: 70vw;
    max-width: 540px;
  }
}
```

---

### 📐 Desktop Layout (`≥ 1024px`)

Full **Bento Grid** with max-width centring — the game never stretches uncomfortably wide on large monitors.

```css
@media (min-width: 1024px) {
  .app-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .game-grid {
    grid-template-columns: 1fr 280px;
    grid-template-rows: auto auto 1fr;
    gap: 20px;
  }

  /* Keyboard shortcut hints — only visible on desktop */
  .keyboard-hints { display: flex; }

  /* Hover glow on option cards — desktop only */
  .option-btn:hover {
    border-color: var(--color-gold);
    box-shadow: 0 0 0 2px var(--color-gold);
  }
}
```

**Desktop extras:**

| Feature | Detail |
|---|---|
| ⌨️ Keyboard shortcuts | Press `1` `2` `3` `4` to select answer options instantly |
| ✨ Hover glow | Gold border glow on option cards on mouse hover |
| 📊 Level map | Full horizontal level progress strip at top of screen |
| 🖱️ Wider modals | Explanation modals have more padding and breathing room |

---

### 🔑 Critical Viewport Meta Tag

Always present in `index.html`. Without this, mobile browsers zoom out and the entire layout breaks.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

---

### ♿ Touch, Accessibility & Motion

| Feature | Implementation |
|---|---|
| Touch targets | `min-height: 48px` on all buttons and option cards |
| No accidental pinch-zoom | `user-scalable=no` in viewport meta |
| Smooth iOS scroll | `-webkit-overflow-scrolling: touch` on scrollable containers |
| Keyboard focus | `:focus-visible` outline for keyboard users on desktop |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables CSS animations |
| Colour contrast | All text meets WCAG AA (4.5:1) contrast in both themes |
| Screen readers | Semantic HTML — `<button>`, `<main>`, `<header>`, ARIA labels where needed |

---

### 📲 Add to Home Screen (PWA Shortcut)

Students can **Add to Home Screen** on both Android and iOS — giving the platform a permanent icon and a full-screen native-app feel.

Add these tags to `<head>` in `index.html`:

```html
<!-- PWA / Add to Home Screen support -->
<meta name="mobile-web-app-capable"                content="yes">
<meta name="apple-mobile-web-app-capable"          content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title"            content="NPTEL Quiz">
<meta name="theme-color"                           content="#1a1a1a">
<link rel="apple-touch-icon"                       href="icon-192.png">
```

**How students install it:**

| Device | Steps |
|---|---|
| **Android (Chrome)** | Open site → tap ⋮ menu → "Add to Home screen" → Done |
| **iPhone / iPad (Safari)** | Open site → tap Share `⬆️` → "Add to Home Screen" → Add |

> A home screen icon reduces friction dramatically and increases daily usage compared to browser bookmarks.

---

### 🌐 Network-Friendly Design

The platform is designed to work well even on slow mobile connections:

| Consideration | Detail |
|---|---|
| No external JS libraries | Zero network requests for scripts |
| Single CSS file | One request covers all styles and breakpoints |
| questions.json | Loads once, held in memory for the full session |
| Google Fonts | Loaded with `display=swap` — text renders immediately with fallback, Inter loads in background |
| Total page weight | Under 50KB excluding questions — loads fast on 3G |

---

### 📋 Responsive Testing Checklist

Before any release, verify the following combinations:

- [ ] Chrome DevTools — iPhone SE (375px width)
- [ ] Chrome DevTools — iPhone 14 Pro (393px)
- [ ] Chrome DevTools — iPad Air (820px)
- [ ] Chrome DevTools — Desktop 1440px
- [ ] Real Android phone — Chrome browser
- [ ] Real iPhone — Safari browser *(critical — iOS quirks differ from DevTools)*
- [ ] Dark theme on all screen sizes above
- [ ] Light theme on all screen sizes above
- [ ] Theme toggle works and persists across page reload on mobile

---

## 🗺️ Roadmap

- [x] Core game engine — timer, hearts, streaks, XP
- [x] 6-level progression system with unlock gates
- [x] Dark / Light theme with localStorage persistence
- [x] Bento Grid UI with Charcoal/Gold design system
- [x] Answer explanation modal
- [x] Speed bonus system (< 10 second bonus XP)
- [x] **Fully responsive — mobile, tablet & desktop**
- [x] **PWA Add to Home Screen support**
- [ ] Leaderboard (local — top scores saved per device)
- [ ] Subject selector (support multiple NPTEL courses)
- [ ] Sound effects (correct / wrong / timer warning)
- [ ] Confetti animation on level completion
- [ ] Full PWA with service worker (true offline mode)
- [ ] Export progress as PDF scorecard
- [ ] Keyboard shortcuts `1` `2` `3` `4` for desktop users
- [ ] Haptic feedback on mobile (Vibration API)

---

## 🤝 Contributing

Contributions are very welcome! Here's how:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. **Add questions** to `questions.json` if relevant
5. Commit: `git commit -m "feat: describe your change"`
6. Push: `git push origin feature/your-feature-name`
7. Open a **Pull Request**

### Contribution Guidelines

- Keep everything in **Vanilla JS** — no frameworks, no build tools
- Follow the existing CSS variable system — never hardcode colours
- All new questions must include an `explanation` field
- **Test on both mobile and desktop** before submitting a PR
- Test in both **Dark and Light themes**
- Verify tap targets remain at least `48px` tall on mobile

---

## 👨‍💻 Developer Notes

### Common Gotchas

| Issue | Fix |
|---|---|
| JSON loading fails locally | Use `python -m http.server 8000` — browsers block `fetch()` on `file://` protocol |
| Theme not persisting | Check `localStorage` isn't blocked in browser privacy settings |
| Timer drifts over long sessions | Use `Date.now()` snapshots alongside `setInterval` for timing accuracy |
| Layout breaks on old phones | Add `box-sizing: border-box` globally — ensures padding doesn't overflow grid cells |
| iOS tap highlight on buttons | Add `-webkit-tap-highlight-color: transparent` to button CSS |
| iOS auto-zoom on tap | Keep base font-size `≥ 16px` on all inputs and interactive elements |

### Performance Tips

- **Shuffle questions** at runtime with Fisher-Yates to prevent answer memorisation
- **Lazy-render explanations** — inject explanation text into the DOM only after an answer is submitted, not upfront
- **Debounce** the theme toggle to prevent rapid flicker on slow devices
- Keep `questions.json` under **500KB** — it loads entirely into memory on start

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ for every NPTEL student who deserves better than boring PDFs.

*Study anywhere. Score everywhere.*

⭐ **Star this repo if it helped you score better!** ⭐

</div>
