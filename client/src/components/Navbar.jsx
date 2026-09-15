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
    <nav className="bg-cream border-b border-sand">
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <Link to="/" className="group inline-flex items-center gap-2.5 text-gray-950" aria-label="Job Finder home">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-ink font-logo text-lg font-bold leading-none text-white shadow-sm transition-transform duration-200 group-hover:-rotate-3">
            J
          </span>
          <span className="font-logo text-[1.55rem] font-bold leading-none tracking-[-0.04em]">
            Job<span className="text-gold">Finder</span>
          </span>
        </Link>

        {/* Desktop links — hidden below md breakpoint */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/saved-jobs" className="text-gray-600 hover:text-gray-900">Saved Jobs</Link>
          {user ? (
            <>
              <span className="text-gray-600 text-sm">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Log In</Link>
              <Link to="/register" className="px-4 py-2 bg-ink text-white rounded-lg hover:bg-forest-light">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger button — only visible below md breakpoint */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-gray-200">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-600">Home</Link>
          <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="text-gray-600">Saved Jobs</Link>
          {user ? (
            <>
              <span className="text-gray-600 text-sm">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-left">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-600">Log In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2 bg-ink text-white rounded-lg text-center hover:bg-forest-light">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
