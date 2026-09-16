import { useState } from 'react'

function FilterSidebar({ onApply, initialSalaryMin, initialSalaryMax }) {
  const [salaryMin, setSalaryMin] = useState(initialSalaryMin || '')
  const [salaryMax, setSalaryMax] = useState(initialSalaryMax || '')

  const handleApply = () => {
    onApply({ salaryMin: salaryMin || undefined, salaryMax: salaryMax || undefined })
  }

  return (
    <aside className="pg-card h-fit w-full p-5 md:w-72 md:shrink-0">
      <div className="mb-5 flex items-center gap-3">
        <span className="pg-icon-bubble">£</span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-stone">Filter</p>
          <h3 className="font-display text-xl font-extrabold">Salary range</h3>
        </div>
      </div>

      <label htmlFor="salary-min" className="pg-label">Minimum (£)</label>
      <input id="salary-min" type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} placeholder="e.g. 30000" className="pg-input mb-5" />

      <label htmlFor="salary-max" className="pg-label">Maximum (£)</label>
      <input id="salary-max" type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} placeholder="e.g. 80000" className="pg-input mb-5" />

      <button onClick={handleApply} className="pg-button w-full">Apply filters <span aria-hidden="true">→</span></button>
    </aside>
  )
}

export default FilterSidebar
