import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'

function getMessage(accuracy) {
  if (accuracy >= 90) return { emoji: '🏆', msg: "Outstanding! You're fully exam-ready. Go get that top score!" }
  if (accuracy >= 75) return { emoji: '🌟', msg: "Great effort! You've got a strong grip. A quick revision and you're set!" }
  if (accuracy >= 50) return { emoji: '⭐', msg: "Good job completing the full set! Focus on your weak areas and you'll nail it!" }
  return { emoji: '💪', msg: "Well done for finishing! Every attempt makes you stronger. Give it another round!" }
}

export default function CongratsPanel({ correct, total, mode, onPlayAgain }) {
  const navigate = useNavigate()
  const { totalXP } = useGame()
  const wrong = total - correct
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  const { emoji, msg } = getMessage(accuracy)

  return (
    <div className="modal-overlay">
      <div className="modal-box w-full max-w-md text-center space-y-5">

        {/* Header */}
        <div>
          <div className="text-5xl mb-2">{emoji}</div>
          <h2 className="font-display font-bold text-2xl dark:text-zinc-100 light:text-zinc-900">
            You Did It!
          </h2>
          <p className="text-sm dark:text-zinc-400 light:text-zinc-500 mt-1">
            {mode === 'game'
              ? 'All 6 levels completed!'
              : 'All 120 questions attempted!'}
          </p>
        </div>

        {/* Stats grid */}
        <div className="rounded-xl border p-4 space-y-2 text-left
          dark:bg-zinc-800 dark:border-zinc-700
          light:bg-amber-50 light:border-amber-200">
          {[
            ['📊 Score', `${correct} / ${total}`],
            ['🎯 Accuracy', `${accuracy}%`],
            ['⚡ Total XP', `${totalXP.toLocaleString()} XP`],
            ['✅ Correct', correct],
            ['❌ Wrong', wrong],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between items-center text-sm">
              <span className="dark:text-zinc-400 light:text-zinc-500">{label}</span>
              <span className="font-display font-bold dark:text-zinc-100 light:text-zinc-900">{val}</span>
            </div>
          ))}
        </div>

        {/* Message */}
        <p className="text-sm font-body dark:text-zinc-300 light:text-zinc-600 italic">
          {msg}
        </p>

        <p className="font-display font-bold text-gold text-base">
          All the very best for your HCI exam! 🚀
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button onClick={onPlayAgain} className="btn-primary flex-1">
            🔁 {mode === 'game' ? 'Play Again' : 'Retry'}
          </button>
          {mode === 'game' ? (
            <button onClick={() => navigate('/practice')} className="btn-ghost flex-1">
              📖 Practice
            </button>
          ) : (
            <button onClick={() => navigate('/game')} className="btn-ghost flex-1">
              🎮 Game Mode
            </button>
          )}
        </div>
      </div>
    </div>
  )
}