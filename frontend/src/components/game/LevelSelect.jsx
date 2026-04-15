import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext.jsx'
import { useQuestions } from '../../context/QuestionsContext.jsx'

const LEVELS = [
  { level: 1, weeks: 'Week 1–2', title: 'HCI Foundations', icon: '🧠' },
  { level: 2, weeks: 'Week 3–4', title: 'Design Thinking', icon: '🎨' },
  { level: 3, weeks: 'Week 5–6', title: 'Cognition & Data', icon: '📊' },
  { level: 4, weeks: 'Week 7–8', title: 'Prototyping & Eval', icon: '🔬' },
  { level: 5, weeks: 'Week 9–10', title: 'IoT & AI in HCI', icon: '🤖' },
  { level: 6, weeks: 'Week 11–12', title: 'Privacy & Future', icon: '🔒' },
]

export default function LevelSelect() {
  const navigate = useNavigate()
  const { highestLevel, totalXP } = useGame()
  const { loading, error } = useQuestions()

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-2">
        <div className="text-3xl animate-pulse">🎮</div>
        <p className="text-sm dark:text-zinc-400 light:text-zinc-500 font-body">Loading questions...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-2">
        <div className="text-3xl">⚠️</div>
        <p className="text-sm text-red-400 font-body">{error}</p>
        <p className="text-xs dark:text-zinc-500 light:text-zinc-400">
          Make sure questions.json is in the /public folder and you're using a local server
        </p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1 pt-2">
        <h1 className="font-display font-bold text-2xl sm:text-3xl dark:text-zinc-100 light:text-zinc-900">
          Choose Your Level
        </h1>
        <p className="text-sm dark:text-zinc-400 light:text-zinc-500 font-body">
          Complete 12 weeks of HCI across 6 boss levels
        </p>
      </div>

      {/* XP Banner */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full
          dark:bg-yellow-400/10 light:bg-yellow-100
          border dark:border-yellow-400/20 light:border-yellow-300">
          <span className="text-sm font-display font-bold text-gold">⚡ {totalXP.toLocaleString()} Total XP</span>
        </div>
      </div>

      {/* Level cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LEVELS.map(({ level, weeks, title, icon }) => {
          const unlocked = level <= highestLevel
          const completed = level < highestLevel

          return (
            <button
              key={level}
              disabled={!unlocked}
              onClick={() => unlocked && navigate(`/game/${level}`)}
              className={`card p-4 text-left transition-all duration-200 group
                ${unlocked
                  ? 'cursor-pointer hover:scale-[1.02] hover:border-yellow-400/50 active:scale-[0.98]'
                  : 'cursor-not-allowed opacity-40'
                }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{unlocked ? icon : '🔒'}</span>
                {completed && (
                  <span className="text-xs font-display font-bold text-green-400
                    bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                    ✓ Done
                  </span>
                )}
                {!unlocked && (
                  <span className="text-xs dark:text-zinc-600 light:text-zinc-400 font-body">
                    Locked
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs dark:text-zinc-500 light:text-zinc-400 font-body mb-0.5">
                  Level {level} · {weeks}
                </p>
                <h3 className="font-display font-bold text-base dark:text-zinc-100 light:text-zinc-900 group-hover:text-gold transition-colors">
                  {title}
                </h3>
                <p className="text-xs dark:text-zinc-500 light:text-zinc-400 font-body mt-1">
                  20 questions · 75% to unlock next
                </p>
              </div>

              {/* Unlock requirement */}
              {!unlocked && level === highestLevel + 1 && (
                <p className="text-xs text-yellow-400/60 mt-2 font-body">
                  Complete Level {level - 1} with ≥75% to unlock
                </p>
              )}
            </button>
          )
        })}
      </div>

      {/* Rules reminder */}
      <div className="card p-4 text-xs dark:text-zinc-400 light:text-zinc-500 font-body space-y-1">
        <p className="font-display font-semibold dark:text-zinc-300 light:text-zinc-600 text-sm mb-2">
          📋 Game Rules
        </p>
        <p>⏱️ 30 seconds per question — answer fast for Speed Bonus XP</p>
        <p>❤️ 3 hearts per level — run out and it's Game Over</p>
        <p>🔥 Build streaks for XP multipliers (1x → 1.5x → 2x)</p>
        <p>🔒 Score ≥75% accuracy to unlock the next level</p>
      </div>
    </div>
  )
}