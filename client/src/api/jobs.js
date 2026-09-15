import api from './axiosInstance'

export const searchJobs = async ({ what, where, page, salaryMin, salaryMax }) => {
  const response = await api.get('/jobs/search', {
    params: { what, where, page, salaryMin, salaryMax },
  })
  return response.data
}