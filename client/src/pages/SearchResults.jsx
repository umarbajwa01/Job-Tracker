import { useSearchParams } from 'react-router-dom'
import { useJobSearch } from '../hooks/useJobSearch'
import JobList from '../components/JobList'
import FilterSidebar from '../components/Filters/FilterSidebar'
import ErrorMessage from '../components/ErrorMessage'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const what = searchParams.get('what')
  const where = searchParams.get('where')
  const salaryMin = searchParams.get('salaryMin')
  const salaryMax = searchParams.get('salaryMax')

  const { data, isLoading, isError, error } = useJobSearch({ what, where, salaryMin, salaryMax })

  const handleApplyFilters = ({ salaryMin, salaryMax }) => {
    const newParams = new URLSearchParams(searchParams)
    if (salaryMin) newParams.set('salaryMin', salaryMin)
    else newParams.delete('salaryMin')
    if (salaryMax) newParams.set('salaryMax', salaryMax)
    else newParams.delete('salaryMax')
    setSearchParams(newParams)
  }

  return (
    <main className="pg-page py-10 md:py-14">
      <div className="pg-shell">
        <div className="mb-9 max-w-3xl">
          <span className="pg-eyebrow mb-4 bg-pink/30">Search results</span>
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">
            {what ? <>Jobs for <span className="text-violet">“{what}”</span></> : 'Search for jobs'}
          </h1>
          {where && <p className="mt-3 font-semibold text-stone">Location: {where}</p>}
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <FilterSidebar onApply={handleApplyFilters} initialSalaryMin={salaryMin} initialSalaryMax={salaryMax} />
          <div className="min-w-0 flex-1">
            {isError && <ErrorMessage message={error.message} />}
            {!isError && <JobList jobs={data?.data || []} isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchResults
