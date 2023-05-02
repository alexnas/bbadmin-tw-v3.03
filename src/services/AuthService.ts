import $api from '@/api'
import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '@/types'
import {
  CHECK_USER_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT
} from '@/constants/apiConstants'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(LOGIN_ENDPOINT, { email, password })
  }

  static async register(
    email: string,
    name: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(REGISTER_ENDPOINT, { email, name, password })
  }

  static async logout(): Promise<void> {
    return $api.post(LOGOUT_ENDPOINT)
  }

  static async checkIfUserExist(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>(`${CHECK_USER_ENDPOINT}?email=${email}`)
  }
}
