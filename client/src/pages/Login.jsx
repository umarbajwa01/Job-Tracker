import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await loginUser({ email, password })
      login(response.data.user, response.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pg-auth-grid">
      <section className="pg-auth-art">
        <div className="shape shape-circle -left-10 -top-10" />
        <div className="shape shape-square bottom-14 right-12" />
        <div className="shape shape-pill right-[-45px] top-24" />
        <div className="relative z-10 max-w-xl">
          <span className="pg-eyebrow mb-6 bg-white">Welcome back</span>
          <h1 className="pg-display text-5xl md:text-7xl">Your next move is waiting.</h1>
          <p className="mt-6 max-w-lg text-base font-semibold leading-7 text-ink/75 md:text-lg">
            Log in to keep saved jobs together and continue your search without losing momentum.
          </p>
          <div className="mt-8 inline-flex rotate-[-2deg] items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4 shadow-[6px_6px_0_#1E293B]">
            <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-mint text-xl">✓</span>
            <div><p className="font-display font-extrabold">Stay organized</p><p className="text-sm font-medium text-stone">Saved jobs are one click away.</p></div>
          </div>
        </div>
      </section>

      <section className="pg-auth-panel">
        <div className="pg-auth-form">
          <span className="pg-eyebrow mb-4 bg-pink/30">Member login</span>
          <h2 className="font-display text-4xl font-extrabold">Log in</h2>
          <p className="mt-2 text-sm font-medium text-stone">Enter your details to continue to JobTracker.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && <div role="alert" className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}

            <div>
              <label htmlFor="login-email" className="pg-label">Email address</label>
              <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="pg-input" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="login-password" className="pg-label">Password</label>
              <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="pg-input" placeholder="Enter your password" />
            </div>

            <button type="submit" disabled={isSubmitting} className="pg-button w-full">
              {isSubmitting ? 'Logging in...' : 'Log in'} <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="mt-7 text-center text-sm font-medium text-stone">
            Don&apos;t have an account? <Link to="/register" className="font-extrabold text-violet underline decoration-2 underline-offset-4">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
