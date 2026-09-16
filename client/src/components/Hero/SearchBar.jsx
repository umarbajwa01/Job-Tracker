import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    const params = new URLSearchParams({ what: query.trim() })
    if (location.trim()) params.append('where', location.trim())
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="pg-card flex max-w-3xl flex-col gap-3 p-3 md:flex-row" aria-label="Job search">
      <label className="sr-only" htmlFor="hero-job-query">Job title or keyword</label>
      <input id="hero-job-query" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Job title or keyword" className="pg-input flex-1" />
      <label className="sr-only" htmlFor="hero-job-location">Location</label>
      <input id="hero-job-location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (optional)" className="pg-input flex-1" />
      <button type="submit" className="pg-button whitespace-nowrap">Search jobs <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink">→</span></button>
    </form>
  )
}

export default SearchBar
