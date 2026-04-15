import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer className="w-full border-t dark:border-zinc-800 light:border-amber-200 py-6 mt-auto bg-transparent">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center space-y-2 text-center">
        
        <p className="text-sm font-display font-semibold dark:text-zinc-300 light:text-zinc-700 flex items-center justify-center gap-1">
          Made with 
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1 animate-pulse" /> 
          by Subham
        </p>

        <p className="text-xs font-body dark:text-zinc-500 light:text-zinc-400">
          This platform is created strictly for educational purposes.
        </p>
        
      </div>
    </footer>
  )
}