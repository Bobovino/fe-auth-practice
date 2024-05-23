import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

//Interceptor made to revalidate tokens once the access token expires

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore.getState()
    const accessToken = authStore.accessToken
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const authStore = useAuthStore.getState()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshSuccess = await authStore.renewAccessToken()
      if (refreshSuccess) {
        originalRequest.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        return api(originalRequest)
      } else {
        authStore.logout()
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
