import api from './axiosInstance'

export const registerUser = async ({ email, password, name }) => {
  const response = await api.post('/auth/register', { email, password, name })
  return response.data
}

export const loginUser = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}