import { useAuth } from '../context/AuthContext'
import { useSaveJob } from '../hooks/useSavedJobs'

function JobCard({ job }) {
  const { user } = useAuth()
  const { mutate: save, isPending, isSuccess, isError, error } = useSaveJob()

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return 'Salary not specified'
    if (job.salaryMin && job.salaryMax) {
      return `£${job.salaryMin.toLocaleString()} - £${job.salaryMax.toLocaleString()}`
    }
    return `£${(job.salaryMin || job.salaryMax).toLocaleString()}`
  }

  const handleSave = () => {
    save(job)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-lg transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
      <p className="text-gray-600 mt-1">{job.company}</p>
      <p className="text-gray-500 text-sm mt-1">{job.location}</p>
      <p className="text-gold-dark font-medium mt-3">{formatSalary()}</p>

      <div className="flex items-center gap-4 mt-4">
        <a
          href={job.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gold hover:text-gold-dark"
        >
          View job →
        </a>

        {user && (
          <button
            onClick={handleSave}
            disabled={isPending || isSuccess}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            {isSuccess ? 'Saved ✓' : isPending ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      {isError && (
        <p className="text-xs text-red-600 mt-2">
          {error.response?.data?.message || 'Could not save job'}
        </p>
      )}
    </div>
  )
}

export default JobCard
