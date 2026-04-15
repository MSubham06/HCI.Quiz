import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuestions } from '../../context/QuestionsContext.jsx'
import { useGame } from '../../context/GameContext.jsx'
import { useTimer } from '../../hooks/useTimer.js'
import CongratsPanel from '../CongratsPanel.jsx'

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
  const [selected, setSelected] = useState(null)   // chosen option text
  const [phase, setPhase] = useState('question')   // 'question' | 'feedback' | 'gameover' | 'complete'
  const [shaking, setShaking] = useState(false)
  const [lastXP, setLastXP] = useState(null)
  const feedbackTimer = useRef(null)

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

  // FIX 1: Safely bypass the strict ESLint warnings to prevent infinite loops
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => {
    if (!loading) {
      const qs = shuffle(getByLevel(Number(level)))
      setQuestions(qs)
    }
  }, [level, loading])

  const nextQuestion = useCallback(() => {
    setSelected(null)
    setPhase('question')
    setLastXP(null)
    setQIndex(i => i + 1)
  }, [])

  // FIX 2: Added nextQuestion to dependency array
  const handleExpire = useCallback(() => {
    if (phase !== 'question') return
    setSelected('__timeout__')
    setPhase('feedback')
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
    setStreak(0)
    setHearts(h => {
      const next = h - 1
      if (next <= 0) {
        setTimeout(() => setPhase('gameover'), 1200)
      } else {
        feedbackTimer.current = setTimeout(nextQuestion, 2200)
      }
      return next
    })
  }, [phase, nextQuestion])

  const { timeLeft, percentLeft, isUrgent, start, stop } = useTimer(30, handleExpire)

  // FIX 3: Added 'start' to dependency array
  useEffect(() => {
    if (questions.length > 0 && phase === 'question') {
      start()
    }
    return () => clearTimeout(feedbackTimer.current)
  }, [qIndex, questions, phase, start])

  const handleSelect = useCallback((option) => {
    if (phase !== 'question' || selected) return
    stop()
    setSelected(option)
    setPhase('feedback')

    const isCorrect = option === currentQ.correctAnswer
    if (isCorrect) {
      const xp = calcXP(currentQ.points, streak + 1, timeLeft)
      setLastXP(xp)
      addXP(xp)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)

      // Next question or complete
      const isLast = qIndex >= total - 1
      if (isLast) {
        feedbackTimer.current = setTimeout(() => {
          const finalCorrect = correct + 1
          const accuracy = finalCorrect / total
          if (accuracy >= PASS_THRESHOLD) {
            unlockLevel(Number(level) + 1)
            if (Number(level) === 6) completeGame()
          }
          setPhase('complete')
        }, 1800)
      } else {
        feedbackTimer.current = setTimeout(nextQuestion, 1800)
      }
    } else {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setStreak(0)
      setHearts(h => {
        const next = h - 1
        if (next <= 0) {
          setTimeout(() => setPhase('gameover'), 1500)
        } else {
          const isLast = qIndex >= total - 1
          if (isLast) {
            feedbackTimer.current = setTimeout(() => setPhase('complete'), 1800)
          } else {
            feedbackTimer.current = setTimeout(nextQuestion, 1800)
          }
        }
        return next
      })
    }
  }, [phase, selected, currentQ, streak, timeLeft, qIndex, total, correct, addXP, unlockLevel, completeGame, level, stop, nextQuestion])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const map = { '1': 0, '2': 1, '3': 2, '4': 3 }
      if (map[e.key] !== undefined && currentQ) {
        handleSelect(currentQ.options[map[e.key]])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSelect, currentQ])

  const handleRestart = () => {
    clearTimeout(feedbackTimer.current)
    const qs = shuffle(getByLevel(Number(level)))
    setQuestions(qs)
    setQIndex(0)
    setHearts(HEARTS)
    setStreak(0)
    setCorrect(0)
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
              ['✅ Correct', correct],
              ['❌ Wrong', total - correct],
              ['🎯 Accuracy', `${Math.round((correct/total)*100)}%`],
              ['⚡ XP Earned', `${totalXP.toLocaleString()} total`],
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
              🔁 Retry
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
    <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">

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
          if (selected) {
            if (opt === currentQ.correctAnswer) cls = 'correct'
            else if (opt === selected && opt !== currentQ.correctAnswer) cls = 'wrong'
            else cls = 'disabled'
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`option-btn ${cls}`}
              disabled={!!selected}
            >
              <span className="font-display font-semibold text-xs mr-2 dark:text-zinc-500 light:text-zinc-400">
                {i + 1}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* XP earned flash */}
      {lastXP && (
        <div className="flex justify-center animate-slide-up">
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
      <div className="pb-4">
        <button
          onClick={() => navigate('/game')}
          className="text-xs dark:text-zinc-500 light:text-zinc-400 hover:text-gold transition-colors font-body"
        >
          Back to Levels
        </button>
      </div>
    </div>
  )
}