import axios from 'axios'
import type { AuthResponse } from '@/types'
import { API_BASE_URL, REFRESH_ENDPOINT } from '@/constants/apiConstants'

const refreshApi = `${API_BASE_URL}${REFRESH_ENDPOINT}`

const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const { data } = await axios.get<AuthResponse>(refreshApi, {
          withCredentials: true
        })
        if (!data?.token) {
          localStorage.removeItem('token')
        } else {
          localStorage.setItem('token', data.token)
        }
        return $api.request(originalRequest)
      } catch (e) {
        console.log('NOT AUTHORISED')
      }
    }
    throw error
  }
)

export default $api
