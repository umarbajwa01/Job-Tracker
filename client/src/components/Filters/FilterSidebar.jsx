import { useState } from 'react'

function FilterSidebar({ onApply, initialSalaryMin, initialSalaryMax }) {
  const [salaryMin, setSalaryMin] = useState(initialSalaryMin || '')
  const [salaryMax, setSalaryMax] = useState(initialSalaryMax || '')

  const handleApply = () => {
    onApply({ salaryMin: salaryMin || undefined, salaryMax: salaryMax || undefined })
  }

  return (
   <aside className="w-full md:w-64 md:shrink-0 bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
      <h3 className="font-semibold text-gray-900 mb-4">Salary Range</h3>

      <label className="block text-sm text-gray-600 mb-1">Minimum (£)</label>
      <input
        type="number"
        value={salaryMin}
        onChange={(e) => setSalaryMin(e.target.value)}
        placeholder="e.g. 30000"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 outline-none focus:border-gold"
      />

      <label className="block text-sm text-gray-600 mb-1">Maximum (£)</label>
      <input
        type="number"
        value={salaryMax}
        onChange={(e) => setSalaryMax(e.target.value)}
        placeholder="e.g. 80000"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 outline-none focus:border-gold"
      />

      <button
        onClick={handleApply}
        className="w-full px-4 py-2 bg-ink text-white rounded-lg hover:bg-forest-light"
      >
        Apply Filters
      </button>
    </aside>
  )
}

export default FilterSidebar
