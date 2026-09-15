import { useJobSearch } from '../hooks/useJobSearch'
import JobList from './JobList'

function FeaturedJobs() {
  // Shows a general, broad search on page load so the homepage
  // has real content before the user searches anything themselves.
  const { data, isLoading, isError } = useJobSearch({ what: 'developer' })

  if (isError) return null // fail quietly on the homepage — search page already has proper error handling

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-2xl font-semibold text-ink mb-6">Featured jobs</h2>
      <JobList jobs={data?.data?.slice(0, 6) || []} isLoading={isLoading} />
    </section>
  )
}

export default FeaturedJobs
