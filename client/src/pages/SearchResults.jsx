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

  const { data, isLoading, isError, error } = useJobSearch({
    what,
    where,
    salaryMin,
    salaryMax,
  })

  const handleApplyFilters = ({ salaryMin, salaryMax }) => {
    const newParams = new URLSearchParams(searchParams)
    if (salaryMin) newParams.set('salaryMin', salaryMin)
    else newParams.delete('salaryMin')
    if (salaryMax) newParams.set('salaryMax', salaryMax)
    else newParams.delete('salaryMax')
    setSearchParams(newParams)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
        {what ? `Results for "${what}"` : 'Search for jobs'}
        {where && ` in ${where}`}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          onApply={handleApplyFilters}
          initialSalaryMin={salaryMin}
          initialSalaryMax={salaryMax}
        />

        <div className="flex-1">
          {isError && <ErrorMessage message={error.message} />}
          {!isError && <JobList jobs={data?.data || []} isLoading={isLoading} />}
        </div>
      </div>
    </div>
  )
}

export default SearchResults