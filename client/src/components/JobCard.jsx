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

  return (
    <article className="pg-sticker-card relative flex h-full flex-col p-6 pt-8">
      <span className="absolute -top-5 left-5 grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-mint font-display font-extrabold shadow-[2px_2px_0_#1E293B]" aria-hidden="true">↗</span>
      <h3 className="font-display text-xl font-extrabold leading-tight">{job.title}</h3>
      <p className="mt-2 font-semibold text-stone">{job.company}</p>
      <p className="mt-1 text-sm font-medium text-stone">{job.location}</p>
      <p className="mt-4 inline-flex w-fit rounded-full border-2 border-ink bg-yellow/55 px-3 py-1.5 text-sm font-extrabold">{formatSalary()}</p>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <a href={job.redirectUrl} target="_blank" rel="noopener noreferrer" className="pg-button min-h-[42px] px-4 py-2 text-sm">
          View job <span aria-hidden="true">→</span>
        </a>
        {user && (
          <button onClick={() => save(job)} disabled={isPending || isSuccess} className="pg-button-secondary min-h-[42px] px-4 py-2 text-sm">
            {isSuccess ? 'Saved ✓' : isPending ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      {isError && <p className="mt-3 text-xs font-semibold text-red-600">{error.response?.data?.message || 'Could not save job'}</p>}
    </article>
  )
}

export default JobCard
