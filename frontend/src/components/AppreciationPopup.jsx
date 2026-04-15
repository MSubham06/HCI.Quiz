const LINKEDIN_URL = 'https://www.linkedin.com/in/msubham'

export default function AppreciationPopup({ onThankYou, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box relative w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
            rounded-lg text-lg transition-all duration-150
            dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100
            light:text-zinc-400 light:hover:bg-amber-100 light:hover:text-zinc-900"
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center space-y-4 pt-2">
          <div className="text-4xl">🙏</div>

          <div>
            <h2 className="font-display font-bold text-xl mb-1 dark:text-zinc-100 light:text-zinc-900">
              Hey, glad you're here!
            </h2>
            <p className="text-sm dark:text-zinc-400 light:text-zinc-500 leading-relaxed">
              This platform was built with love to help you crack your HCI exam
              without the boring grind. It's completely free.
            </p>
          </div>

          <p className="text-sm dark:text-zinc-300 light:text-zinc-600">
            If it helped you, a small appreciation goes a long way for the developer
          </p>

          {/* Thank You button */}
          <button
            onClick={onThankYou}
            className="btn-primary w-full"
          >
            Thank You, I Appreciate It!
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px dark:bg-zinc-700 light:bg-amber-200" />
            <span className="text-xs dark:text-zinc-500 light:text-zinc-400">connect</span>
            <div className="flex-1 h-px dark:bg-zinc-700 light:bg-amber-200" />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <p className="text-xs dark:text-zinc-400 light:text-zinc-500">
              Follow the developer on LinkedIn for more free tools like this
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}