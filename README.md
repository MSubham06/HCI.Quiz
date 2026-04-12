# HCI.Quiz
# 🎮 NPTEL Gamified Practice Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

A client-side, interactive web application designed to help students practice NPTEL assignment questions. By operating entirely on the frontend using local JSON data and `localStorage`, this platform ensures lightning-fast performance without the need for a backend server. 

To make learning addictive, the platform integrates **GameFi mechanics** such as progressive levels, streak multipliers, time attacks, and health points.

---

## ✨ Key Features & GameFi Mechanics

* 🗺️ **Level Progression System:** The 12-week NPTEL syllabus is compressed into 6 gamified levels (2 weeks per level). Users must achieve a **75% accuracy rate** to unlock the next tier.
* 🔥 **Streak Multipliers:** Consecutive correct answers build a combo! 
    * 1-2 correct = **1x** XP
    * 3-4 correct = **1.5x** XP
    * 5+ correct = **2x** XP (On Fire! 🔥)
* ⏳ **Time Attack:** A visual countdown bar for every question. Answering under 10 seconds awards a "Speed Bonus" to the user's XP.
* ❤️ **Health System:** Users start each level with a limited number of "Hearts" (Lives). Incorrect answers deduct a heart. Reaching zero results in a "Game Over", requiring a level restart.
* 💾 **Persistent Local Storage:** All user progression (Total XP, Unlocked Levels, High Scores) is saved securely in the browser's `localStorage`.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (via Vite for faster builds)
* **Animations:** Framer Motion (for bouncy UI, streak pop-ups, and screen transitions)
* **Data Storage:** Static JSON files (Questions/Answers) & Browser `localStorage` (User State)
* **Styling:** CSS Modules / Tailwind CSS (Bento Grid layout, Charcoal & Gold palette)

---

## 📂 Component Architecture

The UI is built with a clean, modular approach to keep the gameplay loop smooth:

- `App.jsx`: Root component handling global state routing.
- `LevelMap.jsx`: The "Home" screen displaying the 6 progressive levels, locked/unlocked status, and current XP.
- `QuizEngine.jsx`: The core game loop managing the timer, streak state, and question index.
- `QuestionCard.jsx`: Reusable component rendering the question text and interactive options.
- `StatusBar.jsx`: Sticky header displaying remaining Hearts, Timer progress bar, and active Multiplier.
- `PostGameModal.jsx`: End-of-level screen showing score breakdown, success/fail state, and the "Next Level" prompt.

---

## 📊 JSON Data Schema

All questions are stored locally. Developers must adhere to the following schema when populating the question bank:

```json
[
  {
    "id": "q101",
    "level": 1,
    "week": 1,
    "question": "Which of the following algorithms is used for finding the shortest path?",
    "options": ["DFS", "BFS", "Dijkstra's", "Kruskal's"],
    "correctAnswer": "Dijkstra's",
    "explanation": "Dijkstra's algorithm specifically calculates the shortest path from a source node to all other nodes in a weighted graph.",
    "points": 10
  }
]
