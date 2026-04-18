import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faChevronDown, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

export default function Navbar({ theme, toggleTheme }) {
  const location = useLocation()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const handleReset = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Helper to determine active mode text
  const getCurrentMode = () => {
    if (location.pathname.includes('/game')) return 'Game'
    if (location.pathname.includes('/practice')) return 'Practice'
    if (location.pathname.includes('/qa')) return 'Q&A'
    return 'Mode'
  }

  return (
    <>
      <header className="w-full border-b border-amber-200 dark:border-zinc-800 p-4 flex justify-between items-center bg-transparent">
        <div className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100">
          HCI <span className="text-gold">Quiz</span>
        </div>
        
        <div className="flex items-center justify-end gap-0">
          
          {/* Mode Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-sm font-semibold transition-colors px-3 py-2 rounded-lg text-zinc-900 dark:text-zinc-100 hover:text-gold dark:hover:text-gold outline-none focus:outline-none"
            >
              {getCurrentMode()} <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-48 rounded-xl border border-amber-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden z-50 animate-fade-in">
                <Link to="/game" onClick={() => setIsDropdownOpen(false)} className={`block px-4 py-3 text-sm font-body transition-colors ${location.pathname.includes('/game') ? 'bg-zinc-100 dark:bg-zinc-800/50 text-gold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-gold'}`}>
                  Game Mode
                </Link>
                <Link to="/practice" onClick={() => setIsDropdownOpen(false)} className={`block px-4 py-3 text-sm font-body transition-colors ${location.pathname === '/practice' ? 'bg-zinc-100 dark:bg-zinc-800/50 text-gold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-gold'}`}>
                  Practice Mode
                </Link>
                <Link to="/qa" onClick={() => setIsDropdownOpen(false)} className={`block px-4 py-3 text-sm font-body transition-colors ${location.pathname === '/qa' ? 'bg-zinc-100 dark:bg-zinc-800/50 text-gold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-gold'}`}>
                  Q&A Reader
                </Link>
              </div>
            )}
          </div>

          {/* Profile / About Link */}
          <Link 
            to="/about"
            title="About Developer"
            className={`w-10 h-10 rounded-full transition-colors flex items-center justify-center text-lg outline-none focus:outline-none ${location.pathname === '/about' ? 'text-gold bg-zinc-200 dark:bg-zinc-800/50' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/50 hover:text-gold'}`}
          >
            <FontAwesomeIcon icon={faUserTie} />
          </Link>

          {/* Reset Data Button */}
          <button 
            onClick={() => setShowResetConfirm(true)}
            title="Reset All Data"
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-zinc-500 dark:text-zinc-400 hover:bg-red-100 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-colors outline-none focus:outline-none"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full text-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/50 hover:text-gold transition-colors outline-none focus:outline-none">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </button>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="modal-box w-full max-w-sm text-center space-y-4">
            <div className="text-5xl mb-2 text-red-500 dark:text-red-400">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
            <h2 className="font-display font-bold text-xl text-red-500 dark:text-red-400">
              Delete All Progress?
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-body leading-relaxed">
              This will permanently delete all your XP, unlocked levels, streaks, and practice history. You will start completely from scratch. 
              <br/><br/>
              <strong>This action cannot be undone.</strong>
            </p>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setShowResetConfirm(false)} 
                className="btn-ghost flex-1 outline-none focus:outline-none"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset} 
                className="flex-1 px-5 py-3 rounded-xl font-display font-semibold text-sm bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-150 outline-none focus:outline-none"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}