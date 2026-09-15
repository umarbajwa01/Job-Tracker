import JobCard from './JobCard'
import SkeletonCard from './SkeletonCard'
import EmptyState from './EmptyState'

function JobList({ jobs, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        message="Try a different search term or location."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobList