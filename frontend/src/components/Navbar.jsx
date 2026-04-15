import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ theme, toggleTheme }) {
  const location = useLocation()
  
  return (
    <header className="w-full border-b dark:border-zinc-800 light:border-amber-200 p-4 flex justify-between items-center bg-transparent">
      <div className="font-display font-bold text-xl dark:text-zinc-100 light:text-zinc-900">
        HCI <span className="text-gold">Quiz</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          to="/game" 
          className={`text-sm font-semibold transition-colors ${location.pathname.includes('/game') ? 'text-gold' : 'dark:text-zinc-400 light:text-zinc-500 hover:text-gold'}`}
        >
          Game
        </Link>
        <Link 
          to="/practice" 
          className={`text-sm font-semibold transition-colors ${location.pathname === '/practice' ? 'text-gold' : 'dark:text-zinc-400 light:text-zinc-500 hover:text-gold'}`}
        >
          Practice
        </Link>
        
        <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-zinc-800/50 transition-colors">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}