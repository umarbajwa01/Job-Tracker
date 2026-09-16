import { useSavedJobsQuery, useRemoveSavedJob } from '../hooks/useSavedJobs'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'

function SavedJobs() {
  const { data, isLoading, isError, error } = useSavedJobsQuery()
  const { mutate: remove, isPending: isRemoving } = useRemoveSavedJob()

  return (
    <main className="pg-page py-10 md:py-14">
      <div className="pg-shell max-w-5xl">
        <div className="mb-9">
          <span className="pg-eyebrow mb-4 bg-mint/40">Your shortlist</span>
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Saved jobs</h1>
          <p className="mt-3 max-w-xl font-medium text-stone">Everything worth a second look, gathered in one place.</p>
        </div>

        {isLoading && <div className="grid gap-5 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div>}
        {isError && <ErrorMessage message={error.message} />}
        {data && data.data.length === 0 && <EmptyState title="No saved jobs yet" message="Jobs you save while searching will show up here." />}

        {data && data.data.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {data.data.map((job, index) => (
              <article key={job.id} className="pg-sticker-card flex flex-col p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className={`grid h-11 w-11 place-items-center rounded-full border-2 border-ink font-display font-extrabold ${index % 3 === 0 ? 'bg-yellow' : index % 3 === 1 ? 'bg-pink' : 'bg-mint'}`}>★</span>
                  <button onClick={() => remove(job.id)} disabled={isRemoving} className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-extrabold hover:bg-red-100 disabled:opacity-50">Remove</button>
                </div>
                <h2 className="font-display text-xl font-extrabold">{job.title}</h2>
                <p className="mt-2 font-semibold text-stone">{job.company}</p>
                <p className="mt-1 text-sm font-medium text-stone">{job.location}</p>
                {(job.salaryMin || job.salaryMax) && <p className="mt-4 w-fit rounded-full border-2 border-ink bg-yellow/50 px-3 py-1.5 text-sm font-extrabold">{job.salaryMin && `£${job.salaryMin.toLocaleString()}`}{job.salaryMin && job.salaryMax && ' - '}{job.salaryMax && `£${job.salaryMax.toLocaleString()}`}</p>}
                <a href={job.redirectUrl} target="_blank" rel="noopener noreferrer" className="pg-button mt-6 w-fit min-h-[42px] px-4 py-2 text-sm">View job →</a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default SavedJobs
