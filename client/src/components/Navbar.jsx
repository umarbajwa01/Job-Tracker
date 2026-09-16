import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-ink bg-cream/95 backdrop-blur">
      <div className="pg-shell flex min-h-[72px] items-center justify-between gap-5">
        <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Job Tracker home">
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-violet font-display text-xl font-extrabold text-white shadow-[3px_3px_0_#1E293B] transition-transform duration-200 group-hover:-rotate-6">
            J
          </span>
          <span className="font-display text-[1.45rem] font-extrabold tracking-[-0.04em]">
            Job<span className="text-violet">Tracker</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/" className="rounded-full px-4 py-2 font-bold hover:bg-yellow">Home</Link>
          <Link to="/saved-jobs" className="rounded-full px-4 py-2 font-bold hover:bg-pink/30">Saved Jobs</Link>
          {user ? (
            <>
              <span className="mx-2 text-sm font-semibold text-stone">Hi, {user.name}</span>
              <button onClick={handleLogout} className="pg-button-secondary min-h-[42px] px-4 py-2 text-sm">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 font-bold hover:bg-muted">Log In</Link>
              <Link to="/register" className="pg-button min-h-[42px] px-5 py-2 text-sm">Sign Up <span aria-hidden="true">→</span></Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-white font-bold shadow-[2px_2px_0_#1E293B] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t-2 border-ink bg-white px-5 py-5 md:hidden">
          <div className="pg-shell flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="font-bold">Home</Link>
            <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="font-bold">Saved Jobs</Link>
            {user ? (
              <>
                <span className="text-sm text-stone">Hi, {user.name}</span>
                <button onClick={handleLogout} className="pg-button-secondary w-full">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="font-bold">Log In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="pg-button w-full">Sign Up →</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
