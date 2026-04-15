import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border dark:border-zinc-800 light:border-amber-200 dark:bg-zinc-900 light:bg-white animate-slide-up">
        
        {/* Left Side: Image */}
        <div className="flex-1 bg-black flex justify-center items-center overflow-hidden min-h-[300px] md:min-h-[400px] group">
          <img 
            src="/src/assets/developer.jpg" 
            alt="Developer Photo" 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500/121212/f0c040?text=Subham' }}
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
          />
        </div>

        {/* Right Side: Information */}
        <div className="flex-[1.2] p-8 md:p-12 flex flex-col justify-center text-left">
          <Link 
            to="/game" 
            className="inline-block mb-6 text-sm font-body dark:text-zinc-400 light:text-zinc-500 hover:text-gold dark:hover:text-gold transition-colors w-fit"
          >
            Back to Game
          </Link>
          
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-2 dark:text-zinc-100 light:text-zinc-900">
            Hi, I'm <span className="text-gold">SUBHAM</span>
          </h1>
          <h3 className="font-body font-medium text-lg mb-6 dark:text-zinc-400 light:text-zinc-500">
            Full Stack Developer & UI/UX Designer
          </h3>
          
          <p className="font-body text-base leading-relaxed mb-8 dark:text-zinc-300 light:text-zinc-600">
            I built the <strong>HCI Quiz Platform</strong> to solve a real problem: most practice tools for the NPTEL Human-Computer Interaction course are clunky, boring, or full of ads. I wanted a distraction-free, gamified way to study, so I took the exact HCI principles I learned in the course and implemented them here to create a seamless user experience!
            <br/><br/>
            Beyond this project, I'm a multi-disciplinary developer. I recently completed a technical internship at <strong>ISRO</strong>, and I specialize in Full Stack Web Development, building modern frontends, and crafting intuitive UI/UX designs in Figma. I also take on freelance gigs to build cool, useful tools.
          </p>

          {/* Social Links (Using SVGs so you don't need FontAwesome for these) */}
          <div className="flex gap-4 mt-auto">
            <a href="https://github.com/MSubham06" target="_blank" rel="noopener noreferrer" title="GitHub"
               className="w-12 h-12 rounded-full border-2 dark:border-zinc-700 light:border-amber-200 flex justify-center items-center dark:text-zinc-100 light:text-zinc-900 hover:bg-gold hover:border-gold hover:text-zinc-900 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-yellow-400/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            
            <a href="https://linkedin.com/in/msubham" target="_blank" rel="noopener noreferrer" title="LinkedIn"
               className="w-12 h-12 rounded-full border-2 dark:border-zinc-700 light:border-amber-200 flex justify-center items-center dark:text-zinc-100 light:text-zinc-900 hover:bg-gold hover:border-gold hover:text-zinc-900 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-yellow-400/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>

            <a href="mailto:msubham246@gmail.com" title="Email"
               className="w-12 h-12 rounded-full border-2 dark:border-zinc-700 light:border-amber-200 flex justify-center items-center dark:text-zinc-100 light:text-zinc-900 hover:bg-gold hover:border-gold hover:text-zinc-900 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-yellow-400/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  )
}