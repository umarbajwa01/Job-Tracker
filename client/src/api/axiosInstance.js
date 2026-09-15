import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Runs before every single request made with this axios instance.
// If a token is saved, attach it to the Authorization header automatically —
// so we never have to remember to add it manually in every API call file.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api