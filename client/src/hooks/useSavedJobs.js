import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSavedJobs, saveJob, removeSavedJob } from '../api/savedJobs'
import { useAuth } from '../context/AuthContext'

// Fetches the logged-in user's saved jobs.
export const useSavedJobsQuery = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['savedJobs'],
    queryFn: getSavedJobs,
    enabled: !!user, // don't even try this request if nobody's logged in
  })
}

// Handles saving a job, and automatically refreshes the saved-jobs list after.
export const useSaveJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveJob,
    onSuccess: () => {
      // Tells TanStack Query "the saved jobs list is now stale, refetch it"
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] })
    },
  })
}

// Handles removing a saved job, same auto-refresh behavior.
export const useRemoveSavedJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeSavedJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] })
    },
  })
}