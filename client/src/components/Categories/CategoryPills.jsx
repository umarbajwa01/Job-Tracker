import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { label: 'Design', query: 'designer' },
  { label: 'Engineering', query: 'engineer' },
  { label: 'Marketing', query: 'marketing' },
  { label: 'Sales', query: 'sales' },
  { label: 'Customer Service', query: 'customer service' },
  { label: 'Finance', query: 'finance' },
]

function CategoryPills() {
  const navigate = useNavigate()

  const handleClick = (query) => {
    navigate(`/search?what=${encodeURIComponent(query)}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 flex flex-wrap justify-center gap-3">
      {CATEGORIES.map((category) => (
        <button
          key={category.label}
          onClick={() => handleClick(category.query)}
          className="px-5 py-2 bg-sand text-ink rounded-full text-sm font-medium hover:bg-forest hover:text-white transition-colors"
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryPills