import axios from 'axios'
import { API_BASE_URL } from '@/constants/apiConstants'

const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api
