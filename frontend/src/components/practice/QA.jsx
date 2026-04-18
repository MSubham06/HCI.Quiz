import { useQuestions } from '../../context/QuestionsContext.jsx'

export default function QA() {
  const { questions, loading } = useQuestions()

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-10 h-10 border-4 border-amber-200 dark:border-zinc-800 border-t-current text-gold rounded-full animate-spin"></div>
      <p className="font-display font-semibold text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
        Loading Questions...
      </p>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto pb-10">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8 pt-4">
        <h1 className="font-display font-bold text-3xl dark:text-zinc-100 text-zinc-900">
          Q&A Reader
        </h1>
        <p className="text-sm dark:text-zinc-400 text-zinc-500 font-body">
          Quick revision mode for all {questions.length} questions.
        </p>
      </div>

      {/* List of all questions */}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="card p-5 sm:p-6 space-y-4 shadow-sm">
            
            {/* Top Bar: Q Number and Week */}
            <div className="flex justify-between items-center border-b dark:border-zinc-800 border-amber-200 pb-3">
              <span className="text-xs font-display font-semibold text-gold uppercase tracking-wide">
                Question {index + 1}
              </span>
              <span className="text-xs dark:text-zinc-500 text-zinc-400 font-body">
                Week {q.week}
              </span>
            </div>

            {/* Question Text */}
            <p className="font-body text-base sm:text-lg font-medium dark:text-zinc-100 text-zinc-900 leading-relaxed">
              {q.question}
            </p>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {q.options.map((opt, optIndex) => {
                const isCorrect = opt === q.correctAnswer;
                return (
                  <div 
                    key={optIndex} 
                    className={`px-4 py-3 rounded-xl text-sm border font-body leading-relaxed flex items-start gap-2
                      ${isCorrect 
                        ? 'border-green-500/50 bg-green-500/10 text-green-500 dark:text-green-400 font-semibold' 
                        : 'dark:border-zinc-800 border-amber-100 dark:bg-zinc-800/30 bg-amber-50/50 dark:text-zinc-400 text-zinc-500'
                      }`}
                  >
                    <span className="opacity-50 mt-0.5">{optIndex + 1}.</span>
                    <span>{opt}</span>
                  </div>
                )
              })}
            </div>

            {/* Explanation Block */}
            <div className="mt-4 pt-4 border-t dark:border-zinc-800 border-amber-200">
              <p className="text-xs font-display font-semibold text-gold mb-2 uppercase tracking-wide">
                Explanation
              </p>
              <p className="text-sm dark:text-zinc-300 text-zinc-600 font-body leading-relaxed">
                {q.explanation}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}