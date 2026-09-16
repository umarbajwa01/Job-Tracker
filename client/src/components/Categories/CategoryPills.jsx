import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { label: 'Design', query: 'designer', style: 'bg-pink/40' },
  { label: 'Engineering', query: 'engineer', style: 'bg-violet/20' },
  { label: 'Marketing', query: 'marketing', style: 'bg-yellow/60' },
  { label: 'Sales', query: 'sales', style: 'bg-mint/40' },
  { label: 'Customer Service', query: 'customer service', style: 'bg-pink/25' },
  { label: 'Finance', query: 'finance', style: 'bg-yellow/40' },
]

function CategoryPills() {
  const navigate = useNavigate()

  return (
    <section className="py-12 md:py-16">
      <div className="pg-shell">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="pg-eyebrow mb-3">Browse faster</span>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Pick a career lane</h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-6 text-stone">Tap a category and jump straight into matching opportunities.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <button key={category.label} onClick={() => navigate(`/search?what=${encodeURIComponent(category.query)}`)} className={`pg-button-secondary ${category.style}`}>
              {category.label} <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryPills
