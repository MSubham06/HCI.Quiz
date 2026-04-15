import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuestions } from '../../context/QuestionsContext.jsx'
import { useGame } from '../../context/GameContext.jsx'
import CongratsPanel from '../CongratsPanel.jsx'

export default function PracticeScreen() {
  const { questions, loading } = useQuestions()
  
  // Safely grab completePractice, with a fallback if it's not in GameContext yet
  const { completePractice = () => localStorage.setItem('hci_practice_completed', 'true') } = useGame()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [stagedOption, setStagedOption] = useState(null) // Added staging state
  const [selected, setSelected] = useState(null)
  const [showCongrats, setShowCongrats] = useState(false)
  const selectorRef = useRef(null)

  // Local storage state for practice attempts
  const [practiceAttempted, setPracticeAttempted] = useState(() => {
    try {
      const saved = localStorage.getItem('nptel_practice_attempted')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const markPracticeQuestion = (id, result) => {
    setPracticeAttempted(prev => {
      const next = { ...prev, [id]: result }
      localStorage.setItem('nptel_practice_attempted', JSON.stringify(next))
      return next
    })
  }

  const currentQ = questions[currentIndex]
  const attempt = currentQ ? practiceAttempted[currentQ.id] : null

  // Count stats
  const attemptedCount = Object.keys(practiceAttempted).length
  const correctCount = Object.values(practiceAttempted).filter(v => v === 'correct').length
  const allDone = questions.length > 0 && attemptedCount >= questions.length

  // Show congrats when all done
  useEffect(() => {
    if (allDone && !showCongrats) {
      completePractice()
      setTimeout(() => setShowCongrats(true), 600)
    }
  }, [allDone, showCongrats, completePractice])

  // Scroll active question number into view
  useEffect(() => {
    if (selectorRef.current) {
      const active = selectorRef.current.querySelector('[data-active="true"]')
      active?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
    }
  }, [currentIndex])

  // Step 1: Stage the answer
  const handleStage = useCallback((opt) => {
    if (attempt) return // Already answered — readonly
    setStagedOption(opt)
  }, [attempt])

  // Step 2: Lock the answer
  const handleLock = useCallback(() => {
    if (attempt || !stagedOption) return
    setSelected(stagedOption)
    const result = stagedOption === currentQ.correctAnswer ? 'correct' : 'wrong'
    markPracticeQuestion(currentQ.id, result)
  }, [attempt, stagedOption, currentQ])

  // Keyboard accessibility
  useEffect(() => {
    const handler = (e) => {
      const map = { '1': 0, '2': 1, '3': 2, '4': 3 }
      
      // Stage with 1-4
      if (map[e.key] !== undefined && currentQ && !attempt) {
        handleStage(currentQ.options[map[e.key]])
      }
      
      // Lock with Enter
      if (e.key === 'Enter') {
        if (!attempt && stagedOption) handleLock()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleStage, handleLock, currentQ, attempt, stagedOption])

  const goTo = (index) => {
    setCurrentIndex(index)
    setSelected(null)
    setStagedOption(null) // Clear staging when navigating
  }

  const goNext = () => { if (currentIndex < questions.length - 1) goTo(currentIndex + 1) }
  const goPrev = () => { if (currentIndex > 0) goTo(currentIndex - 1) }

  const handlePlayAgain = () => {
    setShowCongrats(false)
    setCurrentIndex(0)
    setSelected(null)
    setStagedOption(null)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-3xl animate-pulse">📖</div>
    </div>
  )

  if (!currentQ) return null

  const alreadyAnswered = !!attempt

  return (
    <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">

      {showCongrats && (
        <CongratsPanel
          correct={correctCount}
          total={questions.length}
          mode="practice"
          onPlayAgain={handlePlayAgain}
        />
      )}

      {/* Stats bar */}
      <div className="flex items-center justify-between text-xs font-display flex-wrap gap-2">
        <span className="dark:text-zinc-400 light:text-zinc-500">
          Practice Mode : No timer, No pressure
        </span>
        <div className="flex gap-3">
          <span className="text-green-400 font-bold">✅ {correctCount}</span>
          <span className="text-red-400 font-bold">❌ {attemptedCount - correctCount}</span>
          <span className="dark:text-zinc-500 light:text-zinc-400">{attemptedCount}/{questions.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full dark:bg-zinc-800 light:bg-amber-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${(attemptedCount / questions.length) * 100}%` }}
        />
      </div>

      {/* Question selector scrollable row */}
      <div
        ref={selectorRef}
        className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 pt-0.5"
      >
        {questions.map((q, i) => {
          const att = practiceAttempted[q.id]
          const isActive = i === currentIndex
          return (
            <button
              key={q.id}
              data-active={isActive}
              onClick={() => goTo(i)}
              className={`shrink-0 w-9 h-9 rounded-lg text-xs font-display font-bold
                transition-all duration-150 border
                ${isActive
                  ? 'bg-yellow-400 text-zinc-900 border-yellow-400 scale-105'
                  : att === 'correct'
                    ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:border-green-400'
                    : att === 'wrong'
                      ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:border-red-400'
                      : 'dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 light:bg-white light:border-amber-200 light:text-zinc-500 light:hover:border-amber-400'
                }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Question card */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-display font-semibold text-gold uppercase tracking-wide">
            Q{currentIndex + 1} · Week {currentQ.week}
          </p>
          {alreadyAnswered && (
            <span className={`text-xs font-display font-bold px-2 py-0.5 rounded-full
              ${attempt === 'correct'
                ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                : 'text-red-400 bg-red-400/10 border border-red-400/20'
              }`}>
              {attempt === 'correct' ? 'Correct' : 'Wrong'}
            </span>
          )}
        </div>
        <p className="font-body text-base sm:text-lg dark:text-zinc-100 light:text-zinc-900 leading-relaxed">
          {currentQ.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {currentQ.options.map((opt, i) => {
          let cls = ''
          
          if (!alreadyAnswered && !selected) {
            // Highlight staged option
            if (stagedOption === opt) {
              cls = '!border-yellow-400 !bg-yellow-400/20 !text-yellow-600 dark:!text-yellow-400 scale-[1.01]'
            }
          } else {
            // Feedback styling once answered
            if (opt === currentQ.correctAnswer) {
              cls = '!border-yellow-400 !bg-yellow-400/20 !text-yellow-600 dark:!text-yellow-400 scale-[1.01] font-bold'
            } else if (selected === opt) {
              // Highlight the specific wrong answer clicked during THIS session
              cls = '!border-red-500 !bg-red-500/20 !text-red-600 dark:!text-red-400 font-bold'
            } else {
              cls = '!border-zinc-300 !bg-zinc-100 !text-zinc-400 dark:!border-zinc-800 dark:!bg-zinc-900 dark:!text-zinc-600 opacity-50'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleStage(opt)}
              disabled={alreadyAnswered || !!selected}
              className={`option-btn ${cls}`}
            >
              <span className="font-display font-semibold text-xs mr-2 opacity-50">
                {i + 1}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Action Area: Lock Button */}
      {!alreadyAnswered && !selected && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleLock}
            disabled={!stagedOption}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Lock Answer
            <span className="hidden sm:inline text-xs opacity-50 font-normal ml-2">(Enter)</span>
          </button>
        </div>
      )}

      {/* Explanation (shown after answering) */}
      {(selected || alreadyAnswered) && (
        <div className="card p-4 text-sm font-body animate-slide-up
          dark:bg-zinc-800/50 light:bg-amber-50">
          <p className="font-display font-semibold text-xs mb-1 dark:text-zinc-400 light:text-zinc-500 uppercase tracking-wide">
            Explanation
          </p>
          <p className="dark:text-zinc-300 light:text-zinc-600 leading-relaxed">
            {currentQ.explanation}
          </p>
          <p className="mt-2 text-xs font-display font-semibold text-gold">
            ✓ Correct Answer: {currentQ.correctAnswer}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 pb-6 pt-2 border-t dark:border-zinc-800 light:border-amber-200 mt-4">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="btn-ghost flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === questions.length - 1}
          className="btn-primary flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}