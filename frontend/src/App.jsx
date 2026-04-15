import { useState, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import LevelSelect from './components/game/LevelSelect.jsx'
import GameScreen from './components/game/GameScreen.jsx'
import PracticeScreen from './components/practice/PracticeScreen.jsx'
import AppreciationPopup from './components/AppreciationPopup.jsx'
import { QuestionsProvider } from './context/QuestionsContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('hci_theme') || 'dark')
  const [showPopup, setShowPopup] = useState(false)

  // Apply theme class to <html> on change
  useLayoutEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  // Show appreciation popup only if not yet thanked
  useEffect(() => {
    const appreciated = localStorage.getItem('hci_appreciated')
    if (!appreciated) {
      const timer = setTimeout(() => setShowPopup(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('hci_theme', next)
  }

  const handleThankYou = () => {
    localStorage.setItem('hci_appreciated', 'true')
    setShowPopup(false)
  }

  const handleClosePopup = () => {
    // Close only for this session — will show again next visit
    setShowPopup(false)
  }

  return (
    <QuestionsProvider>
      <GameProvider>
        <div className="min-h-dvh flex flex-col">
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
            <Routes>
              <Route path="/" element={<Navigate to="/game" replace />} />
              <Route path="/game" element={<LevelSelect />} />
              <Route path="/game/:level" element={<GameScreen />} />
              <Route path="/practice" element={<PracticeScreen />} />
            </Routes>
          </main>

          {showPopup && (
            <AppreciationPopup
              onThankYou={handleThankYou}
              onClose={handleClosePopup}
            />
          )}
        </div>
      </GameProvider>
    </QuestionsProvider>
  )
}