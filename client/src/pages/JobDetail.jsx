import { useParams } from 'react-router-dom'

function JobDetail() {
  const { id } = useParams()
  return <div className="p-8">Job detail page for job id: {id} — built in Phase 8</div>
}

export default JobDetail