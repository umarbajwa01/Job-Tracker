import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [name, setName] = useState('')
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
      const response = await registerUser({ name, email, password })
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
      <section className="pg-auth-art !bg-pink">
        <div className="shape shape-circle -left-12 bottom-10 !bg-yellow" />
        <div className="shape shape-square right-10 top-12 !bg-mint" />
        <div className="shape shape-pill right-[-48px] bottom-20 !bg-violet" />
        <div className="relative z-10 max-w-xl">
          <span className="pg-eyebrow mb-6 bg-white">Start fresh</span>
          <h1 className="pg-display text-5xl md:text-7xl">Build your shortlist, your way.</h1>
          <p className="mt-6 max-w-lg text-base font-semibold leading-7 text-ink/75 md:text-lg">Create an account to save promising roles and keep your job hunt tidy from day one.</p>
          <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-ink bg-white p-4 shadow-[5px_5px_0_#1E293B]"><p className="font-display text-xl font-extrabold">Save jobs</p><p className="mt-1 text-sm font-medium text-stone">Keep favorites together.</p></div>
            <div className="rounded-2xl border-2 border-ink bg-yellow p-4 shadow-[5px_5px_0_#1E293B]"><p className="font-display text-xl font-extrabold">Search faster</p><p className="mt-1 text-sm font-medium text-ink/70">Return without starting over.</p></div>
          </div>
        </div>
      </section>

      <section className="pg-auth-panel">
        <div className="pg-auth-form">
          <span className="pg-eyebrow mb-4 bg-mint/40">Create account</span>
          <h2 className="font-display text-4xl font-extrabold">Sign up</h2>
          <p className="mt-2 text-sm font-medium text-stone">Three quick fields and your job board is ready.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && <div role="alert" className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}

            <div><label htmlFor="register-name" className="pg-label">Your name</label><input id="register-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="pg-input" placeholder="Your name" /></div>
            <div><label htmlFor="register-email" className="pg-label">Email address</label><input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="pg-input" placeholder="you@example.com" /></div>
            <div><label htmlFor="register-password" className="pg-label">Password</label><input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" className="pg-input" placeholder="Minimum 6 characters" /></div>

            <button type="submit" disabled={isSubmitting} className="pg-button w-full">{isSubmitting ? 'Creating account...' : 'Create account'} <span aria-hidden="true">→</span></button>
          </form>

          <p className="mt-7 text-center text-sm font-medium text-stone">Already have an account? <Link to="/login" className="font-extrabold text-violet underline decoration-2 underline-offset-4">Log in</Link></p>
        </div>
      </section>
    </main>
  )
}

export default Register
