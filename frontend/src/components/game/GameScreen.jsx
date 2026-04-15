import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuestions } from '../../context/QuestionsContext.jsx'
import { useGame } from '../../context/GameContext.jsx'
import { useTimer } from '../../hooks/useTimer.js'
import CongratsPanel from '../CongratsPanel.jsx'

// Import the error audio asset
import errorMp3 from '../../assets/error.mp3'

const HEARTS = 3
const PASS_THRESHOLD = 0.75

function calcXP(base, streak, timeLeft) {
  const multiplier = streak >= 5 ? 2 : streak >= 3 ? 1.5 : 1
  const speedBonus = timeLeft > 20 ? 5 : 0
  return Math.round(base * multiplier) + speedBonus
}

function getStreakLabel(streak) {
  if (streak >= 5) return { label: '🔥 ON FIRE', cls: 'fire' }
  if (streak >= 3) return { label: `🌶️ ${streak} Streak`, cls: '' }
  if (streak >= 1) return { label: `✨ ${streak} Streak`, cls: '' }
  return null
}

export default function GameScreen() {
  const { level } = useParams()
  const navigate = useNavigate()
  const { getByLevel, loading } = useQuestions()
  const { addXP, unlockLevel, completeGame, totalXP } = useGame()

  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [hearts, setHearts] = useState(HEARTS)
  const [streak, setStreak] = useState(0)
  const [correct, setCorrect] = useState(0)
  
  // UX Improvements: Staged option (tapped) vs Selected option (locked)
  const [stagedOption, setStagedOption] = useState(null)
  const [selected, setSelected] = useState(null) 
  
  const [phase, setPhase] = useState('question')   // 'question' | 'feedback' | 'gameover' | 'complete'
  const [shaking, setShaking] = useState(false)
  const [lastXP, setLastXP] = useState(null)
  const feedbackTimer = useRef(null)

  // Audio Ref
  const errorAudio = useRef(typeof Audio !== 'undefined' ? new Audio(errorMp3) : null)

  const currentQ = questions[qIndex]
  const total = questions.length

  // Shuffle array (Fisher-Yates)
  const shuffle = (arr) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  // Play error sound helper
  const playErrorSound = useCallback(() => {
    if (errorAudio.current) {
      errorAudio.current.currentTime = 0; // reset to start
      errorAudio.current.play().catch(err => console.log('Audio play prevented by browser:', err));
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => {
    if (!loading) {
      const qs = shuffle(getByLevel(Number(level)))
      setQuestions(qs)
    }
  }, [level, loading])

  // Timer expire handler
  const handleExpire = useCallback(() => {
    if (phase !== 'question') return
    playErrorSound() // Play sound on timeout (counts as wrong)
    setStagedOption(null)
    setSelected('__timeout__')
    setPhase('feedback')
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
    setStreak(0)
    setHearts(h => h - 1)
  }, [phase, playErrorSound])

  const { timeLeft, percentLeft, isUrgent, start, stop } = useTimer(30, handleExpire)

  // Start timer when question loads
  useEffect(() => {
    if (questions.length > 0 && phase === 'question') {
      start()
    }
  }, [qIndex, questions, phase, start])

  // Step 1: Stage the answer (User clicks an option)
  const handleStage = useCallback((option) => {
    if (phase !== 'question') return
    setStagedOption(option)
  }, [phase])

  // Step 2: Lock the answer (User clicks Lock Answer button)
  const handleLock = useCallback(() => {
    if (phase !== 'question' || !stagedOption) return
    stop() // Stop timer only when locked
    setSelected(stagedOption)
    setPhase('feedback')

    const isCorrect = stagedOption === currentQ.correctAnswer
    if (isCorrect) {
      const xp = calcXP(currentQ.points, streak + 1, timeLeft)
      setLastXP(xp)
      addXP(xp)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      playErrorSound() // Trigger error audio immediately upon locking wrong answer
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setStreak(0)
      setHearts(h => h - 1)
    }
  }, [phase, stagedOption, currentQ, streak, timeLeft, addXP, stop, playErrorSound])

  // Step 3: Move to Next Question (User clicks Next)
  const handleNext = useCallback(() => {
    if (hearts <= 0) {
      setPhase('gameover')
      return
    }

    if (qIndex >= total - 1) {
      const accuracy = correct / total
      if (accuracy >= PASS_THRESHOLD) {
        unlockLevel(Number(level) + 1)
        if (Number(level) === 6) completeGame()
      }
      setPhase('complete')
      return
    }

    // Reset for next question
    setSelected(null)
    setStagedOption(null)
    setLastXP(null)
    setPhase('question')
    setQIndex(i => i + 1)
  }, [hearts, qIndex, total, correct, level, unlockLevel, completeGame])

  // Keyboard accessibility
  useEffect(() => {
    const handler = (e) => {
      const map = { '1': 0, '2': 1, '3': 2, '4': 3 }
      
      // Stage with 1-4
      if (map[e.key] !== undefined && currentQ && phase === 'question') {
        handleStage(currentQ.options[map[e.key]])
      }
      
      // Lock or Next with Enter
      if (e.key === 'Enter') {
        if (phase === 'question' && stagedOption) handleLock()
        else if (phase === 'feedback') handleNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleStage, handleLock, handleNext, currentQ, phase, stagedOption])

  const handleRestart = () => {
    const qs = shuffle(getByLevel(Number(level)))
    setQuestions(qs)
    setQIndex(0)
    setHearts(HEARTS)
    setStreak(0)
    setCorrect(0)
    setStagedOption(null)
    setSelected(null)
    setPhase('question')
    setLastXP(null)
  }

  if (loading || questions.length === 0) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-3xl animate-pulse">⚡</div>
    </div>
  )

  const streakInfo = getStreakLabel(streak)
  const accuracy = total > 0 ? Math.round((correct / Math.max(qIndex, 1)) * 100) : 0

  // Completion screen
  if (phase === 'complete') {
    const passed = (correct / total) >= PASS_THRESHOLD
    return (
      <div className="modal-overlay">
        <div className="modal-box w-full max-w-sm text-center space-y-4">
          <div className="text-4xl">{passed ? '🎉' : '😔'}</div>
          <h2 className="font-display font-bold text-xl dark:text-zinc-100 light:text-zinc-900">
            {passed ? 'Level Complete!' : 'Level Failed'}
          </h2>
          <div className="rounded-xl border p-4 space-y-2 text-left text-sm
            dark:bg-zinc-800 dark:border-zinc-700 light:bg-amber-50 light:border-amber-200">
            {[
              ['Correct', correct],
              ['Wrong', total - correct],
              ['Accuracy', `${Math.round((correct/total)*100)}%`],
              ['XP Earned', `${totalXP.toLocaleString()} total`],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="dark:text-zinc-400 light:text-zinc-500">{l}</span>
                <span className="font-display font-bold dark:text-zinc-100 light:text-zinc-900">{v}</span>
              </div>
            ))}
          </div>
          {!passed && (
            <p className="text-xs dark:text-zinc-400 light:text-zinc-500">
              Need ≥75% to unlock the next level. You got {Math.round((correct/total)*100)}%.
            </p>
          )}
          <div className="flex gap-2">
            <button onClick={handleRestart} className="btn-primary flex-1">
              Retry
            </button>
            <button onClick={() => navigate('/game')} className="btn-ghost flex-1">
              Back to Levels
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Game Over
  if (phase === 'gameover') return (
    <div className="modal-overlay">
      <div className="modal-box w-full max-w-sm text-center space-y-4">
        <div className="text-5xl">💀</div>
        <h2 className="font-display font-bold text-2xl dark:text-zinc-100 light:text-zinc-900">Game Over</h2>
        <p className="text-sm dark:text-zinc-400 light:text-zinc-500">
          You ran out of hearts on question {qIndex + 1} of {total}.
        </p>
        <div className="flex gap-2">
          <button onClick={handleRestart} className="btn-primary flex-1">Try Again</button>
          <button onClick={() => navigate('/game')} className="btn-ghost flex-1">Back to Levels</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4 animate-fade-in max-w-2xl mx-auto pb-10">

      {/* HUD — hearts, streak, XP, progress */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Hearts */}
        <div className="flex gap-1">
          {Array.from({ length: HEARTS }).map((_, i) => (
            <span key={i} className={`heart ${i >= hearts ? 'lost' : ''}`}>❤️</span>
          ))}
        </div>

        {/* Streak */}
        {streakInfo && (
          <span className={`streak-badge ${streakInfo.cls}`}>{streakInfo.label}</span>
        )}

        {/* Progress */}
        <span className="text-xs font-display font-bold dark:text-zinc-400 light:text-zinc-500">
          {qIndex + 1} / {total}
        </span>
      </div>

      {/* Timer bar */}
      <div className="w-full dark:bg-zinc-800 light:bg-amber-100 rounded-full overflow-hidden h-2">
        <div
          className={`timer-bar ${isUrgent ? 'animate-pulse' : ''}`}
          style={{
            width: `${percentLeft}%`,
            background: isUrgent
              ? 'linear-gradient(90deg, #e05555, #ff3333)'
              : 'linear-gradient(90deg, #f0c040, #e05555)'
          }}
        />
      </div>
      <div className="flex justify-between text-xs font-display">
        <span className={isUrgent ? 'text-red-400 font-bold' : 'dark:text-zinc-500 light:text-zinc-400'}>
          {timeLeft}s
        </span>
        <span className="dark:text-zinc-500 light:text-zinc-400">
          Level {level} · {accuracy}% acc
        </span>
      </div>

      {/* Question card */}
      <div className={`card p-5 sm:p-6 ${shaking ? 'shake' : ''}`}>
        <p className="text-xs font-display font-semibold text-gold mb-3 uppercase tracking-wide">
          Q{qIndex + 1}
        </p>
        <p className="font-body text-base sm:text-lg dark:text-zinc-100 light:text-zinc-900 leading-relaxed">
          {currentQ.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2">
      {currentQ.options.map((opt, i) => {
          let cls = ''
          
          if (phase === 'question') {
            // Apply a highlighted style if it's staged but not locked
            if (stagedOption === opt) {
              cls = '!border-yellow-400 !bg-yellow-400/20 !text-yellow-600 dark:!text-yellow-400 scale-[1.01]'
            }
          } else if (phase === 'feedback') {
            // UX OVERRIDE: Correct is Yellow, Wrong is Red, Unselected is Faded Grey
            if (opt === currentQ.correctAnswer) {
              cls = '!border-yellow-400 !bg-yellow-400/20 !text-yellow-600 dark:!text-yellow-400 scale-[1.01] font-bold'
            } else if (opt === selected && opt !== currentQ.correctAnswer) {
              cls = '!border-red-500 !bg-red-500/20 !text-red-600 dark:!text-red-400 font-bold'
            } else {
              cls = '!border-zinc-300 !bg-zinc-100 !text-zinc-400 dark:!border-zinc-800 dark:!bg-zinc-900 dark:!text-zinc-600 opacity-50'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleStage(opt)}
              className={`option-btn ${cls}`}
              disabled={phase !== 'question'}
            >
              <span className="font-display font-semibold text-xs mr-2 opacity-50">
                {i + 1}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Action Area: Lock Button or Next Button */}
      <div className="pt-2 flex justify-end">
        {phase === 'question' ? (
          <button
            onClick={handleLock}
            disabled={!stagedOption}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            🔒 Lock Answer
            <span className="hidden sm:inline text-xs opacity-50 font-normal ml-2">(Enter)</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {hearts <= 0 ? 'See Results' : (qIndex >= total - 1 ? 'Finish Level' : 'Next Question →')}
            <span className="hidden sm:inline text-xs opacity-50 font-normal ml-2">(Enter)</span>
          </button>
        )}
      </div>

      {/* XP earned flash */}
      {lastXP && (
        <div className="flex justify-center animate-slide-up pb-2">
          <span className="text-sm font-display font-bold text-gold
            bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-full">
            +{lastXP} XP ⚡
          </span>
        </div>
      )}

      {/* Explanation (shown after answering) */}
      {selected && (
        <div className="card p-4 text-sm font-body animate-slide-up
          dark:bg-zinc-800/50 light:bg-amber-50">
          <p className="font-display font-semibold text-xs mb-1 dark:text-zinc-400 light:text-zinc-500 uppercase tracking-wide">
            Explanation
          </p>
          <p className="dark:text-zinc-300 light:text-zinc-600 leading-relaxed">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Back button */}
      <div className="pb-4 pt-4 border-t dark:border-zinc-800 light:border-amber-200">
        <button
          onClick={() => navigate('/game')}
          className="text-xs dark:text-zinc-500 light:text-zinc-400 hover:text-gold transition-colors font-body"
        >
          ← Back to Levels
        </button>
      </div>
    </div>
  )
}