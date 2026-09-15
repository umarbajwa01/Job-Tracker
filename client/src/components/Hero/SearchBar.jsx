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
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-2 flex flex-col md:flex-row gap-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Job title or keyword"
        className="flex-1 px-4 py-3 rounded-lg outline-none text-gray-900"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location (optional)"
        className="flex-1 px-4 py-3 rounded-lg outline-none text-gray-900 md:border-l border-gray-200"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-ink text-white rounded-lg hover:bg-forest-light"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
