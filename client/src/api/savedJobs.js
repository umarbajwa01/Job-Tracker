import api from './axiosInstance'

export const getSavedJobs = async () => {
  const response = await api.get('/saved-jobs')
  return response.data
}

export const saveJob = async (job) => {
  const response = await api.post('/saved-jobs', {
    externalId: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    redirectUrl: job.redirectUrl,
  })
  return response.data
}

export const removeSavedJob = async (id) => {
  const response = await api.delete(`/saved-jobs/${id}`)
  return response.data
}