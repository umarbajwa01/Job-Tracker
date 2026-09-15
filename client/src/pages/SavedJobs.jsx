import { useSavedJobsQuery, useRemoveSavedJob } from '../hooks/useSavedJobs'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'

function SavedJobs() {
  const { data, isLoading, isError, error } = useSavedJobsQuery()
  const { mutate: remove, isPending: isRemoving } = useRemoveSavedJob()

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Saved Jobs</h1>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && <ErrorMessage message={error.message} />}

      {data && data.data.length === 0 && (
        <EmptyState
          title="No saved jobs yet"
          message="Jobs you save while searching will show up here."
        />
      )}

      {data && data.data.length > 0 && (
        <div className="space-y-4">
          {data.data.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-start justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.company}</p>
                <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                {(job.salaryMin || job.salaryMax) && (
                  <p className="text-gold-dark font-medium mt-2">
                    {job.salaryMin && `£${job.salaryMin.toLocaleString()}`}
                    {job.salaryMin && job.salaryMax && ' - '}
                    {job.salaryMax && `£${job.salaryMax.toLocaleString()}`}
                  </p>
                )}

                <a
                  href={job.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm font-medium text-gold hover:text-gold-dark"
                >
                  View job →
                </a>
              </div>

              <button
                onClick={() => remove(job.id)}
                disabled={isRemoving}
                className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedJobs
