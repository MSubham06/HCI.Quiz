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
      <header className="w-full border-b dark:border-zinc-800 light:border-amber-200 p-4 flex justify-between items-center bg-transparent">
        <div className="font-display font-bold text-xl dark:text-zinc-100 light:text-zinc-900">
          HCI <span className="text-gold">Quiz</span>
        </div>
        
        <div className="flex items-center justify-end gap-0">
          
          {/* Mode Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-sm font-semibold transition-colors px-3 py-2 rounded-lg dark:text-zinc-100 light:text-zinc-900 hover:text-gold dark:hover:text-gold"
            >
              {getCurrentMode()} <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-48 rounded-xl border dark:border-zinc-700 light:border-amber-200 dark:bg-zinc-900 light:bg-white shadow-2xl overflow-hidden z-50 animate-fade-in">
                <Link to="/game" onClick={() => setIsDropdownOpen(false)} className={`block px-4 py-3 text-sm font-body transition-colors ${location.pathname.includes('/game') ? 'bg-zinc-800/50 text-gold' : 'dark:text-zinc-300 light:text-zinc-700 hover:bg-zinc-800/50 hover:text-gold'}`}>
                  Game Mode
                </Link>
                <Link to="/practice" onClick={() => setIsDropdownOpen(false)} className={`block px-4 py-3 text-sm font-body transition-colors ${location.pathname === '/practice' ? 'bg-zinc-800/50 text-gold' : 'dark:text-zinc-300 light:text-zinc-700 hover:bg-zinc-800/50 hover:text-gold'}`}>
                  Practice Mode
                </Link>
                <Link to="/qa" onClick={() => setIsDropdownOpen(false)} className={`block px-4 py-3 text-sm font-body transition-colors ${location.pathname === '/qa' ? 'bg-zinc-800/50 text-gold' : 'dark:text-zinc-300 light:text-zinc-700 hover:bg-zinc-800/50 hover:text-gold'}`}>
                  Q&A Reader
                </Link>
              </div>
            )}
          </div>

          {/* Profile / About Link */}
          <Link 
            to="/about"
            title="About Developer"
            className={`w-10 h-10 rounded-full transition-colors flex items-center justify-center text-lg ${location.pathname === '/about' ? 'text-gold bg-zinc-800/50' : 'dark:text-zinc-400 light:text-zinc-500 hover:bg-zinc-800/50 hover:text-gold'}`}
          >
            <FontAwesomeIcon icon={faUserTie} />
          </Link>

          {/* Reset Data Button */}
          <button 
            onClick={() => setShowResetConfirm(true)}
            title="Reset All Data"
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg dark:text-zinc-400 light:text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full text-lg hover:bg-zinc-800/50 dark:text-zinc-400 light:text-zinc-500 hover:text-gold transition-colors">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </button>
        </div>
      </header>

      {/* Reset Confirmation Modal - FIXED FOR MOBILE */}
      {showResetConfirm && (
        <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="modal-box w-full max-w-sm text-center space-y-4">
            <div className="text-5xl mb-2 text-red-500 dark:text-red-400">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
            <h2 className="font-display font-bold text-xl text-red-500 dark:text-red-400">
              Delete All Progress?
            </h2>
            <p className="text-sm dark:text-zinc-400 light:text-zinc-500 font-body leading-relaxed">
              This will permanently delete all your XP, unlocked levels, streaks, and practice history. You will start completely from scratch. 
              <br/><br/>
              <strong>This action cannot be undone.</strong>
            </p>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setShowResetConfirm(false)} 
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset} 
                className="flex-1 px-5 py-3 rounded-xl font-display font-semibold text-sm bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-150"
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