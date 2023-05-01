import axios from 'axios'
import { API_BASE_URL } from '@/constants/apiConstants'

const defaultConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const defaultAPIInstance = axios.create(defaultConfig)
