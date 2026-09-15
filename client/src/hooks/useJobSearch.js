import { useQuery } from '@tanstack/react-query'
import { searchJobs } from '../api/jobs'

export const useJobSearch = ({ what, where, page = 1, salaryMin, salaryMax }) => {
  return useQuery({
    queryKey: ['jobs', what, where, page, salaryMin, salaryMax],
    queryFn: () => searchJobs({ what, where, page, salaryMin, salaryMax }),
    enabled: !!what,
  })
}